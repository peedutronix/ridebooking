import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import BookingForm from "../../components/BookingForm"

export default async function BookingPage() {
  const session = await getServerSession(authOptions);

  // If the user is NOT logged in, redirect them to sign in.
  // After signing in, they'll be sent back to this booking page.
  if (!session || !session.user) {
    redirect("/api/auth/signin?callbackUrl=/booking");
  }

  // If the user IS logged in, show them the BookingForm.
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <BookingForm user={session.user} />
    </main>
  );
}