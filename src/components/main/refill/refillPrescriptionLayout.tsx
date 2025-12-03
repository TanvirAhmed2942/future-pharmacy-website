"use client";
import RefillTransferSchedule from "@/components/common/commonpage/RefillTransferSchedule";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
function RefillPrescriptionLayout() {
  const [isShowPhoneNumberOpen, setIsShowPhoneNumberOpen] = useState(false);
  const tRefillTransferSchedule = useTranslations("refillTransferSchedule");
  const refillOptions = [
    {
      icon: "globe" as const,
      title: tRefillTransferSchedule("refillOptions.0.title"),
      description: tRefillTransferSchedule("refillOptions.0.description"),
      buttonText: tRefillTransferSchedule("refillOptions.0.buttonText"),
      onlineHref: "/refill-prescription/online",
    },
    {
      icon: "phone" as const,
      title: tRefillTransferSchedule("refillOptions.1.title"),
      description: tRefillTransferSchedule("refillOptions.1.description"),
      buttonText: tRefillTransferSchedule("refillOptions.1.buttonText"),
      onClick: () => setIsShowPhoneNumberOpen(true),
    },
  ];
  return (
    <div className="container mx-auto bg-transparent  ">
      <RefillTransferSchedule
        pageTitle={tRefillTransferSchedule("pageTitleRefill")}
        refillOptions={refillOptions}
        isShowPhoneNumberOpen={isShowPhoneNumberOpen}
        setIsShowPhoneNumberOpen={setIsShowPhoneNumberOpen}
      />
    </div>
  );
}

export default RefillPrescriptionLayout;
