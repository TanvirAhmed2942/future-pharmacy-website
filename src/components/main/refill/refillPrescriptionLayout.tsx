import RefillTransferSchedule from "@/components/common/commonpage/RefillTransferSchedule";
import React from "react";
function RefillPrescriptionLayout() {
  const refillOptions = [
    {
      icon: "laptop" as const,
      title: "Refill Online",
      description:
        "Lorem ipsum dolor sit amet consectetur. Tempor quisque velit mi senectus mauris orci auctor.",
      buttonText: "Refill Now",
    },
    {
      icon: "phone" as const,
      title: "Refill by phone",
      description:
        "Lorem ipsum dolor sit amet consectetur. Tempor quisque velit mi senectus mauris orci auctor.",
      buttonText: "Call Now",
    },
  ];
  return (
    <div className="container mx-auto bg-white py-16 ">
      <RefillTransferSchedule
        pageTitle="Refill Your Prescription"
        refillOptions={refillOptions}
      />
    </div>
  );
}

export default RefillPrescriptionLayout;
