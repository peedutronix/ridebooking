import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../lib/mongodb"

const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" as const },
  providers: [
    // === NEW CODE STARTS HERE ===
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // This is where we will add logic to check the user in our database.
        // For now, let's create a dummy user to test the form.
        if (credentials?.email === "test@test.com" && credentials?.password === "test") {
          // If the credentials are correct, return the user object.
          return { id: "1", name: "Test User", email: "test@test.com" }
        } else {
          // If credentials are not correct, return null.
          return null
        }
      }
    })
    // === NEW CODE ENDS HERE ===
  ],
  secret: process.env.AUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }