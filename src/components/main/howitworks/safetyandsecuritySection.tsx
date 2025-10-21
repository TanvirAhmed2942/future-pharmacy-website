import React from "react";
import { ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

function SafetyAndSecuritySection() {
  return (
    <section className="bg-white py-16 md:py-16 px-4 md:px-8 font-inter">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Safety & Security Assurance
        </h2>

        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col items-center text-center space-y-6">
              {/* Icon */}
              <div className="bg-purple-100 rounded-full p-4">
                <ShieldCheck className="w-8 h-8 text-purple-600" />
              </div>

              {/* Description */}
              <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl">
                Lorem ipsum dolor sit amet consectetur. Massa nibh faucibus ac
                adipiscing diam cursus adipiscing aliquam posuere. Interdum
                tincidunt varius nec dictum in. Aenean eu blandit varius
                facilisi mauris gravida nisi risus quam. Orci viverra euismod
                ornare tellus turpis amet...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default SafetyAndSecuritySection;
