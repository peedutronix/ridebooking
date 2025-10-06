import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../lib/mongodb";
import bcrypt from 'bcryptjs';

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        const client = await clientPromise;
        const db = client.db("ridebooking");
        const user = await db.collection("users").findOne({ email: credentials.email });

        if (!user || !user.password) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(credentials.password, user.password);
        if (!passwordsMatch) {
          return null;
        }
        
        // Return the user object if everything is valid
        return { id: user._id.toString(), name: user.name, email: user.email };
      }
    })
  ],
  
  // === THIS IS THE NEW, CRITICAL PART ===
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  // === END OF NEW PART ===
  
  secret: process.env.AUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };