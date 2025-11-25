"use client";
import RefillTransferSchedule from "@/components/common/commonpage/RefillTransferSchedule";
import React, { useState } from "react";

function TransferLayout() {
  const [isShowPhoneNumberOpen, setIsShowPhoneNumberOpen] = useState(false);
  const refillOptions = [
    {
      icon: "globe" as const,
      title: "Transfer Online",
      description:
        "Use our secure form to transfer your prescriptions quickly, securely and conveniently",
      buttonText: "Transfer Online",
      onlineHref: "/transfer-prescription/online",
    },
    {
      icon: "phone" as const,
      title: "Transfer by phone",
      description:
        "Call our trusted team to complete the Transfer Form by phone",
      buttonText: "Call Now",
      onClick: () => setIsShowPhoneNumberOpen(true),
    },
  ];
  const stepsTransfer = [
    {
      title: "Complete Transfer Form",
      description:
        "Fill out our secure online transfer form with your prescription details",
    },
    {
      title: "We contact your pharmacy",
      description:
        "Our team will contact your pharmacy to transfer your prescriptions",
    },
    {
      title: "Prescription Transferred",
      description: "We'll notify you when your prescriptions are transferred",
    },
  ];
  return (
    <div className="container mx-auto bg-white  ">
      <RefillTransferSchedule
        pageTitle="Transfer Your Prescription"
        refillOptions={refillOptions}
        stepsTransfer={stepsTransfer}
        isShowPhoneNumberOpen={isShowPhoneNumberOpen}
        setIsShowPhoneNumberOpen={setIsShowPhoneNumberOpen}
      />
    </div>
  );
}

export default TransferLayout;
