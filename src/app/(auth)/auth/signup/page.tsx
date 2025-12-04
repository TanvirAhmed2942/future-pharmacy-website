import Signup from "@/components/auth/signup/signup";
import React from "react";

function page() {
  return (
    <div className="w-full min-h-screen bg-transparent lg:bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <Signup />
    </div>
  );
}

export default page;
