"use client";
import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  FiThumbsUp,
  FiMessageCircle,
  FiBookmark,
  FiShare2,
} from "react-icons/fi";

// import { GrCirclePlay } from "react-icons/gr";
function BlogDetailsLayout() {
  const params = useParams();
  const blogId = params.id as string;
  console.log(`Fetching blog with id: ${blogId}`);
  const blogData = {
    title: "Best Practices: Nick Bottaro, DO, MPH",
    subtitle:
      "The Florida based ophthalmologist on improving the patient experience and the importance of eye health.",
    image: "/blog/blog.jpg",
    content: [
      {
        type: "paragraph",
        text: "Dr. Nick Bottaro is an ophthalmologist who specializes in cataract and LASIK surgery. He's passionate with his patients and using his knowledge and expertise to better their lives. In addition to his training and residency in ophthalmology and his doctorate in osteopathic medicine, he also holds a master's degree in healthcare administration and business administration from Duke University and a master's degree in public health from Georgetown University.",
      },
      {
        type: "paragraph",
        text: "Read on to learn how Dr. Bottaro got his start in medicine, how he approaches patient care, and how prioritizing eye health can help patients to take better care of their overall physical health.",
      },
      {
        type: "question",
        title:
          "How did you get started in medicine and what inspired you to choose your specialty?",
        answer:
          "I've always wanted to be in medicine. It started with my grandmother, the matriarch of our family, who had a serious heart attack when I was in the first grade. The surgeon who helped her recover completely changed all of our lives. I remember thinking what an impact a person in medicine can have on the lives of so many people, and I fell in love with the field soon after that. During my training, I wanted to find a specialty that would enable me to have an impact on people's lives. When I found ophthalmology, I realized that I could help to cure peoples' blindness through cataract and LASIK surgeries. While doing this work, I saw how grateful the patients were and how I was able to help transform their lives for the better. Since then, I knew that ophthalmology was the right specialty for me.",
      },
      {
        type: "question",
        title:
          "Can you tell us about your approach to improving the patient experience?",
        answer:
          "I approach my patients with a servant's heart. Ultimately, I use our sessions to help patients in their time of need. In my experience, creating a positive experience for the patient means ensuring that I have an empathetic and skilled manner that enables me to build trusting relationships with them and treat the whole person. Managing an eye condition can be very stressful and scary for the patient, especially when surgery is required. Which is why I do what I can to make sure that they feel that I'm treating them exactly how I would treat a family member. I want them to feel that all of their questions have been answered, that they're never rushed, and that they've been properly educated on their condition. In addition to being an expert in my field and in the top 1% of surgeons in the country, this is one of the most important parts of my job.",
      },
      {
        type: "question",
        title:
          "Tell us more about your approach to health literacy and health education.",
        answer:
          "In addition to being a surgeon and clinician, I'm also a professor and teach a master's program. I love education, and I particularly enjoy using analogies to help convey more complicated and complex conditions, especially with my patients. I use my expertise as a physician and as a professor to translate knowledge in a way that my patients can easily understand and that makes them feel comfortable with what I'm saying and doing.",
      },
      {
        type: "question",
        title:
          "In addition to being a doctorate of osteopathic medicine, you also have master's degrees in public health, healthcare administration, and business administration. How does your education and expertise influence how you run your practice?",
        answer:
          "It's true that there are a lot of letters at the end of my name, but the reason I pursued these additional degrees is because I realized that when I'm able to better understand the processes that guide our health care system, I'm also able to better understand the complexities of many factors that affect my patients every day. Understanding these complexities on a very deep level also helps me to educate my patients and establish a good rapport with them. Pursuing a master's degree in business administration has helped guide me on how to run a successful business in this unique health care environment where the government is constantly changing reimbursements. And my degree in public health has helped me to understand what people need and how to treat different demographics according to their needs. In general, my educational experience has been crafted with the goal of making sure that I'm very prepared and able to provide the absolute best care for my patients.",
      },
      {
        type: "question",
        title:
          "What do you wish patients knew about your health and eye care in general?",
        answer:
          "How do you de-stress? Spending time with my kids helps me to de-stress after a tough day. I love coming home, throwing them in the pool, and getting to be a kid myself while spending time with them.",
      },
    ],
    date: "Oct 21, 2022",
    author: "Modern Pharmacy Staff",
    readTime: "6 min read",
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <article className="max-w-4xl mx-auto">
        {/* Blog Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
          {blogData.title}
        </h1>

        {/* Blog Meta Header - Logo, Subscribe, Date, Read Time */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200">
          {/* Left - Logo with tagline */}
          <div className="flex items-start gap-4 flex-1">
            <div className="w-12 h-12 rounded-full bg-peter bg-opacity-10 flex items-center justify-center flex-shrink-0">
              <span className="text-peter font-bold text-lg">O</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm">
                Optimus Health Solutions
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Your fast and reliable gateway to local pharmacies.
              </p>
            </div>
          </div>

          {/* Middle - Subscribe Button */}
          <div className="w-full flex items-center justify-between gap-4 md:w-auto">
            <Button
              variant="outline"
              className=" text-gray-700 hover:bg-gray-50 px-6 py-2 text-sm font-medium border-1 border-[#8f4487]"
            >
              Subscribe
            </Button>

            {/* Right - Read Time and Date */}
            <div className="text-right text-sm">
              <p className="text-gray-600">{blogData.readTime}</p>
              <p className="text-gray-500 text-xs mt-1">{blogData.date}</p>
            </div>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-6 mb-8">
          <button className="text-gray-600 hover:text-peter flex items-center gap-2 transition-colors cursor-pointer">
            <FiThumbsUp className="w-5 h-5" />
            <span className="text-base">4</span>
          </button>
          <button className="text-gray-600 hover:text-peter transition-colors cursor-pointer">
            <FiMessageCircle className="w-5 h-5" />
          </button>
          <button className="text-gray-600 hover:text-peter transition-colors ml-auto cursor-pointer">
            <FiBookmark className="w-5 h-5" />
          </button>
          {/* <button className="text-gray-600 hover:text-peter transition-colors cursor-pointer">
            <GrCirclePlay size={20} className="w-5 h-5" />
          </button> */}
          <button className="text-gray-600 hover:text-peter transition-colors cursor-pointer">
            <FiShare2 className="w-5 h-5" />
          </button>
        </div>

        {/* Blog Subtitle */}
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          {blogData.subtitle}
        </p>

        {/* Featured Image */}
        <div className="relative w-full aspect-video mb-10 rounded-lg overflow-hidden">
          <Image
            src={blogData.image}
            alt={blogData.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none">
          {blogData.content.map((section, index) => {
            if (section.type === "paragraph") {
              return (
                <p key={index} className="mb-6 text-gray-800 leading-relaxed">
                  {section.text}
                </p>
              );
            } else if (section.type === "question") {
              return (
                <div key={index} className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                    {section.title}
                  </h3>
                  <p className="text-gray-800 leading-relaxed">
                    {section.answer}
                  </p>
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* Blog Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between text-gray-600 text-sm">
            <span>By: {blogData.author}</span>
            <span>{blogData.date}</span>
          </div>
        </div>
      </article>
    </div>
  );
}

export default BlogDetailsLayout;
