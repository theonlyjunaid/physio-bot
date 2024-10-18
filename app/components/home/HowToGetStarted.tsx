"use client";

import { useEffect, useRef } from "react";

import Image from "next/image";

import { Icons } from "../icons";

const content = [
  {
    id: 1,
    title: "Submit Basic Startup Information",
    icon: Icons.MousePointer2,
    points: [
      "Your startup's Name",
      "Your startup's Description",
      "Your startup's Sector",
    ],
    pointExample: [],
    content:
      "Provide detailed information to get accurate funding suggestions tailored to your startup.",
    align: "left",
    image: "info.webp",
  },
  {
    id: 2,
    title: "Stage and Funding Requirements",
    icon: Icons.database,
    points: [
      "Current stage of your startup",
      "Purpose of the funds",
      "Country where your startup is based",
    ],
    align: "right",
    content:
      "Understanding your startup’s stage and funding needs will help in finding the most relevant grants and opportunities.",
    image: "funds.webp",
  },
  {
    id: 3,
    title: "Ready to Find Grants!",
    icon: Icons.bot,
    points: ["Review and select the most suitable grants for your startup"],
    align: "left",
    content:
      "You’re all set! Explore the available grants and find the perfect match for your startup’s needs.",
    image: "grants.webp",
  },
];

export const HowToGetStarted = () => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
            divRef.current?.classList.remove("opacity-0");
            divRef.current?.classList.add("animate-fade-x");
            observer.unobserve(divRef.current!);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (divRef.current) observer.observe(divRef.current);
  }, []);

  return (
    <div
      id={"get-started"}
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 opacity-0"
      ref={divRef}
    >
      <div className="text-center font-custom">
        <p className="text-xs md:text-sm font-bold uppercase tracking-wider md:tracking-widest text-gray-700 dark:text-slate-50">
          a complete{" "}
          <span className="text-gradient_indigo-purple">
            Grant/Funds Search{" "}
          </span>
          Solution
        </p>
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-slate-100 sm:text-4xl lg:text-5xl">
          Get Started in 3 Easy Steps
        </h2>
        <p className="text-md text-gray-700 dark:text-white/85 md:text-lg mx-auto font-custom mt-4 max-w-2xl font-normal lg:leading-8">
          BridgeIN helps you streamline your path to funding, helping you focus
          on solving the world's biggest challenges.
        </p>
      </div>
      <div className="mx-auto mt-12 max-w-6xl space-y-12 sm:mt-16 sm:space-y-20 lg:mt-20 lg:space-y-24 xl:space-y-32">
        {content.map((item) => {
          return (
            <div
              key={item.id}
              className="grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-2 lg:items-center xl:gap-x-16"
            >
              <div className={item.id % 2 == 0 ? "md:order-2" : ""}>
                <Image
                  src={`/${item.image}`}
                  width={1024}
                  height={680}
                  alt="get-started-image"
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                  className="h-full w-full rounded-2xl border border-gray-200 object-cover shadow-xl select-none"
                />
              </div>
              <div
                className={`md:self-center ${item.id % 2 == 0 ? "md:order-1" : ""
                  } `}
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-400  dark:bg-black">
                  <item.icon />
                </div>
                <h3 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white/95 sm:text-3xl">
                  {item.title}
                </h3>
                <h4 className="mt-2 text-base font-normal text-gray-700 dark:text-white/80 lg:text-lg">
                  {item.content}
                </h4>
                <ul className="mt-6 space-y-2 text-base font-normal text-gray-700 dark:text-white/85 lg:text-lg">
                  {item.points.map((point, i) => {
                    return (
                      <li key={i} className="flex flex-col">
                        <div className="flex items-center gap-3">
                          <Icons.asterisk />
                          <h5>{point}</h5>
                        </div>

                        {item.pointExample ? (
                          <p className="text-xs text-zinc-500 dark:text-white/60 pl-8">
                            {item.pointExample[i]}
                          </p>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
