import ForgotPassword from "@/components/auth/forgorpassword/forgotPassword";
import React from "react";

function page() {
  return (
    <div className="w-full  bg-transparent lg:bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <ForgotPassword />
    </div>
  );
}

export default page;
