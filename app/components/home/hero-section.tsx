import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
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
          We Solve Funding, <br />
          <span className="text-gradient_indigo-purple font-extrabold">
            You Solve the World{" "}
          </span>
        </h1>
        <div
          className="animate-fade-up "
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          <p className="text-base text-gray-700 dark:text-white/85 md:text-lg max-w-[80%] mx-auto font-custom">
            Streamlining your path to funding, so you can focus on solving the
            world{"’"}s biggest challenges.
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

        <div className="my-16 select-none">
          <div className="relative mx-auto ">
            <Image
              src="/laptop.svg"
              width={1240}
              height={800}
              alt="demo"
              priority
            />
            <div className="wistia_responsive_padding wistia_responsive_wrapper w-[67%] absolute top-[9%] left-[16.5%] z-10">
              <div
                className="wistia_responsive_wrapper"
                style={{
                  height: "100%",
                  width: "100%",
                }}
              >
                {/* <iframe
                  src="https://fast.wistia.net/embed/iframe/cbylydecn5?seo=true&videoFoam=true&playbackRate=1.25"
                  title="Final recording Video"
                  allow="fullscreen"
                  className="wistia_embed"
                  name="wistia_embed"
                  width="100%"
                  height="100%"
                /> */}
                <Image
                  alt=""
                  src="/dashboard.webp"
                  title="Final recording Video"
                  loading="eager"
                  className="w-full h-full"
                  width={1000}
                  height={1000}
                />
              </div>
            </div>
          </div>
          <div className="relative min-h-16">
            <div
              className={cn(
                "absolute -top-6 z-50 h-10 w-full [mask:linear-gradient(90deg,transparent,black_20%,black_80%,transparent)] before:absolute before:inset-0 before:top-5 before:h-[1px] before:bg-gradient-to-r before:from-[#AE48FF] before:via-[#6C47FF] before:via-[25%] before:to-[#18CCFC] before:opacity-50 before:blur-[2px] after:absolute after:inset-0 after:left-1/2 after:top-5 after:h-[1px] after:w-3/4 after:-translate-x-1/2 after:bg-gradient-to-r after:from-[#AE48FF] after:via-[#6C47FF] after:via-[25%] after:to-[#18CCFC] after:[mask:linear-gradient(90deg,transparent,black,black,transparent)]"
              )}
            />
            <div
              className={cn(
                "absolute inset-0 isolate -z-10 overflow-hidden before:absolute before:inset-0 dark:before:opacity-10"
              )}
            >
              <div
                className={cn(
                  "absolute left-1/2 top-0 h-12 w-3/4 -translate-x-1/2 -translate-y-3/4 rounded-[50%] bg-gradient-to-r from-[#AE48FF] via-[#6C47FF] via-[25%] to-[#18CCFC] opacity-70 blur-xl"
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <Script
        src="https://fast.wistia.net/assets/external/E-v1.js"
        async
      ></Script>
    </section>
  );
};

export default HeroSection;
