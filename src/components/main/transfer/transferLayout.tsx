"use client";
import RefillTransferSchedule from "@/components/common/commonpage/RefillTransferSchedule";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
function TransferLayout() {
  const [isShowPhoneNumberOpen, setIsShowPhoneNumberOpen] = useState(false);
  const tRefillTransferSchedule = useTranslations(
    "refillTransferSchedule.refillOptionsTransfer"
  );
  const tRefillTransferScheduleSteps = useTranslations(
    "refillTransferScheduleSteps.stepsTransfer"
  );
  const tRefillTransferSchedulePageTitleTransfer = useTranslations(
    "refillTransferSchedule"
  );
  const refillOptions = [
    {
      icon: "globe" as const,
      title: tRefillTransferSchedule("0.title"),
      description: tRefillTransferSchedule("0.description"),
      buttonText: tRefillTransferSchedule("0.buttonText"),
      onlineHref: "/transfer-prescription/online",
    },
    {
      icon: "phone" as const,
      title: tRefillTransferSchedule("1.title"),
      description: tRefillTransferSchedule("1.description"),
      buttonText: tRefillTransferSchedule("1.buttonText"),
      onClick: () => setIsShowPhoneNumberOpen(true),
    },
  ];
  const stepsTransfer = [
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
    <div className="container mx-auto bg-white  ">
      <RefillTransferSchedule
        pageTitle={tRefillTransferSchedulePageTitleTransfer(
          "pageTitleTransfer"
        )}
        refillOptions={refillOptions}
        stepsTransfer={stepsTransfer}
        isShowPhoneNumberOpen={isShowPhoneNumberOpen}
        setIsShowPhoneNumberOpen={setIsShowPhoneNumberOpen}
      />
    </div>
  );
}

export default TransferLayout;
