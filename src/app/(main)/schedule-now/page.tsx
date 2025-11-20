import React from "react";
import ScheduleLayout from "@/components/main/schedule/scheduleLayout";
import Image from "next/image";
function page() {
  return (
    <div className=" bg-white relative">
      <div className="absolute inset-0 w-full h-full ">
        <Image
          src="/watermark.webp"
          alt="Watermark"
          fill
          className="object-contain absolute inset-0 w-full h-full scale-50  opacity-50"
        />
      </div>
      <ScheduleLayout />
    </div>
  );
}

export default page;
