"use client";
import RefillTransferSchedule from "@/components/common/commonpage/RefillTransferSchedule";
import React, { useState } from "react";
function RefillPrescriptionLayout() {
  const [isShowPhoneNumberOpen, setIsShowPhoneNumberOpen] = useState(false);
  const refillOptions = [
    {
      icon: "globe" as const,
      title: "Refill Online",
      description:
        "Use our secure form to refill your prescriptions quickly, securely and conveniently",
      buttonText: "Refill Now",
      onlineHref: "/refill-prescription/online",
    },
    {
      icon: "phone" as const,
      title: "Refill by phone",
      description: "Call our trusted team to complete the Refill Form by phone",
      buttonText: "Call Now",
      onClick: () => setIsShowPhoneNumberOpen(true),
    },
  ];
  return (
    <div className="container mx-auto bg-transparent  ">
      <RefillTransferSchedule
        pageTitle="Refill Your Prescription"
        refillOptions={refillOptions}
        isShowPhoneNumberOpen={isShowPhoneNumberOpen}
        setIsShowPhoneNumberOpen={setIsShowPhoneNumberOpen}
      />
    </div>
  );
}

export default RefillPrescriptionLayout;
