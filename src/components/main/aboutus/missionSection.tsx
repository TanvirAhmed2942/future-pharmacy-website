import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useIcon from "@/hooks/useIcon";

function MissionSection() {
  return (
    <div className="my-16 ">
      <h2 className="heading-text  text-center my-16">Our Mission & Vision</h2>
      <div className="flex items-center justify-center gap-10 mx-20 my-16">
        {/* Mission Card */}
        <Card className="w-8/12 mx-auto">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-12 w-12 p-2 items-center justify-center rounded-full bg-[#f3ecf3]">
              {useIcon({ name: "target" })}
            </div>
          </CardHeader>
          <CardContent className="text-center">
            <h3 className="text-lg font-semibold text-gray-900">Our Mission</h3>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Lorem ipsum dolor sit amet consectetur. Massa nibh faucibus ac
              adipiscing diam cursus adipiscing aliquam posuere. Interdum
              tincidunt varius nec dictum in. Aenean eu blandit varius facilisi
              mauris gravida nisi risus quam. Orci viverra euismod ornare tellus
              turpis amet...
            </p>
          </CardContent>
        </Card>

        {/* Vision Card */}
        <Card className="w-8/12 mx-auto">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-12 w-12 p-2 items-center justify-center rounded-full bg-[#f3ecf3]">
              {useIcon({ name: "eye" })}
            </div>
          </CardHeader>
          <CardContent className="text-center">
            <h3 className="text-lg font-semibold text-gray-900">Our Vision</h3>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Lorem ipsum dolor sit amet consectetur. Massa nibh faucibus ac
              adipiscing diam cursus adipiscing aliquam posuere. Interdum
              tincidunt varius nec dictum in. Aenean eu blandit varius facilisi
              mauris gravida nisi risus quam. Orci viverra euismod ornare tellus
              turpis amet...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default MissionSection;
