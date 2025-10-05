// Inside src/components/BookingForm.tsx

// ...
// We need to accept the user's session as a prop
export default function BookingForm({ user }) { 
  // ... all your useState hooks are the same

  const handleSubmit = async (event: FormEvent) => {
    // ...
    const bookingData = {
      // ... all the other form data
      userEmail: user.email, // <-- ADD THIS LINE
      submittedAt: new Date().toISOString(),
    };
    // ... rest of the function is the same
  };

  return (
    // The entire JSX for the form is the same
  )
}