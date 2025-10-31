import RefillTransferSchedule from "@/components/common/commonpage/RefillTransferSchedule";
import React from "react";

function TransferLayout() {
  const refillOptions = [
    {
      icon: "globe" as const,
      title: "Transfer Online",
      description:
        "Lorem ipsum dolor sit amet consectetur. Tempor quisque velit mi senectus mauris orci auctor.",
      buttonText: "Transfer Online",
      onlineHref: "/transfer-prescription/online",
    },
    {
      icon: "phone" as const,
      title: "Transfer by phone",
      description:
        "Lorem ipsum dolor sit amet consectetur. Tempor quisque velit mi senectus mauris orci auctor.",
      buttonText: "Call Now",
    },
  ];
  return (
    <div className="container mx-auto bg-white  ">
      <RefillTransferSchedule
        pageTitle="Transfer Your Prescription"
        refillOptions={refillOptions}
      />
    </div>
  );
}

export default TransferLayout;
