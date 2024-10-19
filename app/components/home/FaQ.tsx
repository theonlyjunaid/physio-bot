"use client";

import { useEffect, useRef } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const accordionData = [
  {
    id: "item-1",
    title: "What is DrPhysio?",
    content:
      "DrPhysio is an AI-driven platform dedicated to assisting users in improving their physical health through personalized physiotherapy guidance. We provide tailored recommendations and resources to help users navigate their health journey effectively.",
  },
  {
    id: "item-2",
    title: "Who is DrPhysio for?",
    content:
      "DrPhysio is for individuals seeking physiotherapy guidance and support. Our platform is designed to connect users with relevant resources and streamline the process of achieving their health goals.",
  },
  {
    id: "item-3",
    title: "Is there a cost to use DrPhysio?",
    content:
      "DrPhysio is completely free to use. As of now, we only offer a free plan to provide accessible physiotherapy resources and support for everyone.",
  },
];

const FAQs = () => {
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
    <section
      id={"faqs"}
      ref={divRef}
      className="offset-y-0 offset-x-8 mx-auto my-16 max-w-3xl drop-shadow-xl w-full px-4 md:w-[70vw]"
    >
      <div className="flex flex-col items-center gap-5 pt-10 p-4 text-center">
        <h3 className="max-w-screen-md text-2xl font-semibold tracking-tight sm:text-3xl md:mt-4 md:text-4xl lg:text-5xl font-custom">
          Frequently Asked Questions
        </h3>
        <p className="text-base text-gray-700 dark:text-white/85 md:text-lg max-w-[90%] mx-auto font-custom">
          Here are some of the most frequently asked questions about DrPhysio.
        </p>
        <Accordion
          type="single"
          collapsible
          className="w-full select-none rounded-2xl border border-gray-200 p-4"
        >
          {accordionData.map((accordionItem) => {
            return (
              <AccordionItem key={accordionItem.id} value={accordionItem.id}>
                <AccordionTrigger className="text-left">
                  {accordionItem.title}
                </AccordionTrigger>
                <AccordionContent className="text-base text-left">
                  {accordionItem.content}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQs;
