import Image from "next/image";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { cn } from "@/lib/utils";

const HeroSection = () => {
  return (
    <section className="flex  justify-center">
      <div className="flex max-w-[64rem] flex-col items-center gap-5  text-center">
        <h1
          className="animate-fade-up text-balance font-custom text-4xl font-extrabold tracking-tight  sm:text-5xl md:mt-12 md:text-6xl lg:text-7xl"
          style={{
            animationDelay: "0.25s",
            animationFillMode: "forwards",
          }}
        >
          When You Move Better <br />
          <span className="text-gradient_indigo-purple font-extrabold">
            You Live Better
          </span>
        </h1>
        <div
          className="animate-fade-up "
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          <p className="text-base text-gray-700 dark:text-white/85 md:text-lg max-w-[80%] mx-auto font-custom">
            We help you to move better and live better with our personalized
            physio guide
          </p>
        </div>

        <Link
          href="/dashboard"
          className="cursor-pointer mx-auto bg-black dark:bg-white border-transparent flex shadow-md box-border select-none hover:opacity-80 items-center gap-2 border px-4 py-2 rounded-[14px] w-fit text-md md:text-lg hover:scale-110 active:scale-90 transition-transform ease-in-out duration-200"
        >
          <span className="body-medium font-medium text-white dark:text-black">
            Start for free
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="17"
            fill="none"
            className="[&amp;>*]:fill-white"
          >
            <path
              fill="#fff"
              d="M9.471 13.305 14.276 8.5 9.471 3.695l-.942.943 3.195 3.195H2v1.334h9.724l-3.195 3.195.942.943Z"
            ></path>
          </svg>
        </Link>


      </div>

    </section>
  );
};

export default HeroSection;
