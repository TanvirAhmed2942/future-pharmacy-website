"use client";
import RefillTransferSchedule from "@/components/common/commonpage/RefillTransferSchedule";
import React, { useState } from "react";

function ScheduleLayout() {
  const [isShowPhoneNumberOpen, setIsShowPhoneNumberOpen] = useState(false);
  const refillOptions = [
    {
      icon: "globe" as const,
      title: "Schedule Online",
      description:
        "Use our secure form to book your pharmacy appointment fast, safe, and convenient.",
      buttonText: "Schedule Online",
      onlineHref: "/schedule-now/online",
    },
    {
      icon: "phone" as const,
      title: "Schedule by phone",
      description:
        "Call our trusted team to schedule your appointment  by phone",
      buttonText: "Call Now",
      onClick: () => setIsShowPhoneNumberOpen(true),
    },
  ];
  const stepsSchedule = [
    {
      title: "Complete Schedule Form",
      description:
        "Fill out our secure online schedule form with your prescription details",
    },
    {
      title: "We contact your pharmacy",
      description:
        "Our team will contact your pharmacy to schedule your healthcare services",
    },
    {
      title: "Healthcare Services Scheduled",
      description:
        "We'll notify you when your healthcare services are scheduled",
    },
  ];
  return (
    <div className="container mx-auto bg-white ">
      <RefillTransferSchedule
        pageTitle="Schedule Essential Healthcare Services"
        refillOptions={refillOptions}
        stepsSchedule={stepsSchedule}
        isShowPhoneNumberOpen={isShowPhoneNumberOpen}
        setIsShowPhoneNumberOpen={setIsShowPhoneNumberOpen}
      />
    </div>
  );
}

export default ScheduleLayout;
