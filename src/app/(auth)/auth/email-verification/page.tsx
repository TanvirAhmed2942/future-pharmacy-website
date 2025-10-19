import EmailVerification from "@/components/auth/emailverification/emailVerification";
import React from "react";

function page() {
  return (
    <div className="w-1/2 min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <EmailVerification />
    </div>
  );
}

export default page;
