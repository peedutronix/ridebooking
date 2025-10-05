import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../lib/mongodb"

// Add "export" here
export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" as const },
  providers: [
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (credentials?.email === "test@test.com" && credentials?.password === "test") {
          return { id: "1", name: "Test User", email: "test@test.com" }
        } else {
          return null
        }
      }
    })
  ],
  secret: process.env.AUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }