import RefillTransferSchedule from "@/components/common/commonpage/RefillTransferSchedule";
import React from "react";

function ScheduleLayout() {
  const refillOptions = [
    {
      icon: "globe" as const,
      title: "Schedule Online",
      description:
        "Lorem ipsum dolor sit amet consectetur. Tempor quisque velit mi senectus mauris orci auctor.",
      buttonText: "Schedule Online",
      onlineHref: "/schedule-now/online",
    },
    {
      icon: "phone" as const,
      title: "Schedule by phone",
      description:
        "Lorem ipsum dolor sit amet consectetur. Tempor quisque velit mi senectus mauris orci auctor.",
      buttonText: "Call Now",
    },
  ];
  return (
    <div className="container mx-auto bg-white ">
      <RefillTransferSchedule
        pageTitle="Schedule Essential Healthcare Services"
        refillOptions={refillOptions}
      />
    </div>
  );
}

export default ScheduleLayout;
