"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Marquee from "react-fast-marquee";

function Partners() {
  const tPartners = useTranslations("home.partners");
  const pharmacies = [
    {
      id: "1",
      logo: "/home/partner_logo/partner_1.png",
      name: "Coming Soon",
    },
    {
      id: "2",
      logo: "/home/partner_logo/partner_1.png",
      name: "Coming Soon",
    },
    {
      id: "3",
      logo: "/home/partner_logo/partner_1.png",
      name: "Coming Soon",
    },
    {
      id: "4",
      logo: "/home/partner_logo/partner_1.png",
      name: "Coming Soon",
    },
    {
      id: "5",
      logo: "/home/partner_logo/partner_1.png",
      name: "Coming Soon",
    },
    {
      id: "6",
      logo: "/home/partner_logo/partner_1.png",
      name: "Coming Soon",
    },
    {
      id: "7",
      logo: "/home/partner_logo/partner_1.png",
      name: "Coming Soon",
    },
    {
      id: "8",
      logo: "/home/partner_logo/partner_1.png",
      name: "Coming Soon",
    },
    {
      id: "9",
      logo: "/home/partner_logo/partner_1.png",
      name: "Coming Soon",
    },
  ];

  // Duplicate pharmacies for seamless infinite scroll
  const duplicatedPharmacies = [...pharmacies, ...pharmacies];

  return (
    <section className="py-8 md:py-12 lg:py-8 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-base italic text-gray-400 mb-2 text-left">
          {tPartners("headline")}
        </h2>

        {/* Horizontal Scrolling Marquee */}
        <div className="relative overflow-hidden [&_*]:[scrollbar-width:none] [&_*]:[-ms-overflow-style:none]">
          <style
            dangerouslySetInnerHTML={{
              __html: `
              .marquee-wrapper * {
                scrollbar-width: none;
                -ms-overflow-style: none;
              }
              .marquee-wrapper *::-webkit-scrollbar {
                display: none;
              }
            `,
            }}
          />
          <div className="marquee-wrapper">
            <Marquee
              speed={20}
              gradient={true}
              gradientColor="rgba(248, 251, 253, 1)" // bg-gray-50
              gradientWidth={90}
              pauseOnHover={true}
              // className="py-4"
            >
              {duplicatedPharmacies.map((pharmacy, index) => {
                return (
                  <div
                    key={`${pharmacy.id}-${index}`}
                    className="flex flex-col items-center justify-center mx-8 group  py-4"
                  >
                    {/* Logo Container */}
                    <div className="flex items-center justify-center h-24 md:h-28 lg:h-28 w-32 md:w-40 lg:w-48 px-4">
                      <Image
                        src={pharmacy.logo}
                        alt={pharmacy.name}
                        width={160}
                        height={120}
                        className="object-contain h-full w-auto max-w-[160px] filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        loading="lazy"
                      />
                    </div>

                    {/* Pharmacy Name */}
                    <div className="text-center mt-3 max-w-[160px]">
                      <p className="text-sm md:text-base font-medium text-gray-500 group-hover:text-[#8d4585] transition-colors duration-300 line-clamp-2">
                        {pharmacy.name}
                      </p>
                    </div>
                  </div>
                );
              })}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Partners;

//From Api Data

// "use client";
// import Image from "next/image";
// import { useGetPartnerPharmaciesLogoQuery } from "../../../store/Apis/mapApi/pharmapApi";
// import { imgUrl } from "@/lib/img_url";

// interface Pharmacy {
//   _id: string;
//   logo: string;
//   name: string;
// }

// function Partners() {
//   const { data } = useGetPartnerPharmaciesLogoQuery({});

//   // Get pharmacies from API response
//   const pharmacies: Pharmacy[] = data?.data || [];

//   // If no pharmacies, don't render the section
//   if (pharmacies.length === 0) {
//     return null;
//   }

//   return (
//     <section className="py-8 md:py-12 lg:py-16 bg-gray-50">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Optional: Add a title/heading */}
//         {/* <div className="text-center mb-8 md:mb-12">
//           <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
//             Our Partner Pharmacies
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Trusted by leading pharmacies across the region
//           </p>
//         </div> */}

//         {/* Partners Grid - Responsive layout */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 md:gap-8 justify-items-center">
//           {pharmacies.map((pharmacy) => {
//             // Use imgUrl function - it handles both full URLs and relative paths
//             const logoUrl = imgUrl(pharmacy?.logo) || "/testimonials/user.png";

//             return (
//               <div
//                 key={pharmacy._id}
//                 className="flex flex-col items-center justify-center space-y-3 group hover:scale-105 transition-transform duration-300"
//               >
//                 {/* Logo Container */}
//                 <div className="flex items-center justify-center h-20 md:h-24 lg:h-28 w-full">
//                   <Image
//                     src={logoUrl}
//                     alt={`${pharmacy.name} Logo`}
//                     width={120}
//                     height={80}
//                     className="object-contain h-full w-auto max-w-[120px] filter grayscale group-hover:grayscale-0 transition-all duration-300"
//                     loading="lazy"
//                     unoptimized={
//                       logoUrl.startsWith("http://") ||
//                       logoUrl.startsWith("https://")
//                     }
//                   />
//                 </div>

//                 {/* Pharmacy Name */}
//                 <div className="text-center">
//                   <p className="text-sm md:text-base font-medium text-peter  transition-colors duration-300 line-clamp-2">
//                     {pharmacy.name}
//                   </p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Partners;
