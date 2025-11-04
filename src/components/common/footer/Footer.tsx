import React from "react";
import { Facebook, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import useIcon from "@/hooks/useIcon";
import { IoLogoTiktok } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa6";
import { TbBrandYoutube } from "react-icons/tb";
function Footer() {
  return (
    <footer className="bg-[#1c121b] text-white rounded-tl-3xl rounded-tr-3xl ">
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Image
              src="/nav/dashboard_logo.png"
              alt="logo"
              width={200}
              height={200}
              className="w-48 h-fit object-cover mb-4"
            />
            <p className="text-sm text-gray-300 leading-relaxed">
              Connecting communities to their local pharmacies for fast,
              reliable access to prescriptions
            </p>
          </div>

          {/* Home Section */}
          <div>
            <Link href="/">
              <h3 className="font-semibold text-base mb-4">Home</h3>
            </Link>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about-us"
                  className="text-sm text-gray-300 hover:text-white transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-sm text-gray-300 hover:text-white transition"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/independent-pharmacies"
                  className="text-sm text-gray-300 hover:text-white transition"
                >
                  For Independent Pharmacies
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-gray-300 hover:text-white transition"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Need Help Section */}
          <div>
            <h3 className="font-semibold text-base mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="text-sm text-gray-300">
                Call Us:{" "}
                <Link
                  href="tel:8889101808"
                  className="hover:text-white transition"
                >
                  (888) 910-1808
                </Link>
              </li>
              <li className="text-sm text-gray-300">
                Email Us:{" "}
                <Link
                  href="mailto:help@optimus.com"
                  className="hover:text-white transition"
                >
                  help@optimus.com
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="font-semibold text-base mb-4">Social Media</h3>
            <div className="flex gap-4 flex-wrap max-w-42">
              <Link
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition"
                aria-label="Facebook"
              >
                <IoLogoTiktok className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition"
                aria-label="Facebook"
              >
                <FaInstagram className="w-5 h-5" />
              </Link>

              <Link
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition"
                aria-label="Facebook"
              >
                <TbBrandYoutube className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </Link>
            </div>
          </div>
          {/* Hipaa Section */}
          <div>
            <h3 className="font-semibold text-base mb-4">HIPAA Certified</h3>
            <div className="flex gap-4">{useIcon({ name: "hipaa" })}</div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © 2025 Optimus Health Solutions. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/policies/hipaa-policy"
              className="text-sm text-gray-400 hover:text-white underline transition"
            >
              HIPAA policy
            </Link>
            <Link
              href="/policies/privacy-policy"
              className="text-sm text-gray-400 hover:text-white underline transition"
            >
              Privacy policy
            </Link>
            <Link
              href="/policies/terms-of-service"
              className="text-sm text-gray-400 hover:text-white underline transition"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
