"use client";
import Image from "next/image";
import { useGetPartnerPharmaciesLogoQuery } from "../../../store/Apis/mapApi/pharmapApi";
import { imgUrl } from "@/lib/img_url";

interface Pharmacy {
  _id: string;
  logo: string;
  name: string;
}

function Partners() {
  const { data } = useGetPartnerPharmaciesLogoQuery({});

  // Get pharmacies from API response
  const pharmacies: Pharmacy[] = data?.data || [];

  // If no pharmacies, don't render the section
  if (pharmacies.length === 0) {
    return null;
  }

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Optional: Add a title/heading */}
        {/* <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
            Our Partner Pharmacies
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Trusted by leading pharmacies across the region
          </p>
        </div> */}

        {/* Partners Grid - Responsive layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 md:gap-8 justify-items-center">
          {pharmacies.map((pharmacy) => {
            // Use imgUrl function - it handles both full URLs and relative paths
            const logoUrl = imgUrl(pharmacy?.logo) || "/testimonials/user.png";

            return (
              <div
                key={pharmacy._id}
                className="flex flex-col items-center justify-center space-y-3 group hover:scale-105 transition-transform duration-300"
              >
                {/* Logo Container */}
                <div className="flex items-center justify-center h-20 md:h-24 lg:h-28 w-full">
                  <Image
                    src={logoUrl}
                    alt={`${pharmacy.name} Logo`}
                    width={120}
                    height={80}
                    className="object-contain h-full w-auto max-w-[120px] filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                    unoptimized={
                      logoUrl.startsWith("http://") ||
                      logoUrl.startsWith("https://")
                    }
                  />
                </div>

                {/* Pharmacy Name */}
                <div className="text-center">
                  <p className="text-sm md:text-base font-medium text-peter  transition-colors duration-300 line-clamp-2">
                    {pharmacy.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Partners;
