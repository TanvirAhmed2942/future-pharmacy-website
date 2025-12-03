"use client";
import RefillTransferSchedule from "@/components/common/commonpage/RefillTransferSchedule";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
function ScheduleLayout() {
  const [isShowPhoneNumberOpen, setIsShowPhoneNumberOpen] = useState(false);
  const tRefillTransferSchedule = useTranslations(
    "refillTransferSchedule.refillOptionsSchedule"
  );
  const tRefillTransferScheduleSteps = useTranslations(
    "refillTransferScheduleSteps.stepsSchedule"
  );
  const tRefillTransferSchedulePageTitleSchedule = useTranslations(
    "refillTransferSchedule"
  );
  const refillOptions = [
    {
      icon: "globe" as const,
      title: tRefillTransferSchedule("0.title"),
      description: tRefillTransferSchedule("0.description"),
      buttonText: tRefillTransferSchedule("0.buttonText"),
      onlineHref: "/schedule-now/online",
    },
    {
      icon: "phone" as const,
      title: tRefillTransferSchedule("1.title"),
      description: tRefillTransferSchedule("1.description"),
      buttonText: tRefillTransferSchedule("1.buttonText"),
      onClick: () => setIsShowPhoneNumberOpen(true),
    },
  ];
  const stepsSchedule = [
    {
      title: tRefillTransferScheduleSteps("0.title"),
      description: tRefillTransferScheduleSteps("0.description"),
    },
    {
      title: tRefillTransferScheduleSteps("1.title"),
      description: tRefillTransferScheduleSteps("1.description"),
    },
    {
      title: tRefillTransferScheduleSteps("2.title"),
      description: tRefillTransferScheduleSteps("2.description"),
    },
  ];
  return (
    <div className="container mx-auto bg-white ">
      <RefillTransferSchedule
        pageTitle={tRefillTransferSchedulePageTitleSchedule(
          "pageTitleSchedule"
        )}
        refillOptions={refillOptions}
        stepsSchedule={stepsSchedule}
        isShowPhoneNumberOpen={isShowPhoneNumberOpen}
        setIsShowPhoneNumberOpen={setIsShowPhoneNumberOpen}
      />
    </div>
  );
}

export default ScheduleLayout;
