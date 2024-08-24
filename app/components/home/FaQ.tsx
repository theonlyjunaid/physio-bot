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
    title: "What is BridgeIN?",
    content:
      "BridgeIN is a platform dedicated to assisting startups in finding and securing funding opportunities. We provide tailored recommendations and resources to help startups navigate the funding landscape effectively.",
  },
  {
    id: "item-2",
    title: "Who is BridgeIN for?",
    content:
      "BridgeIN is for startups seeking funding and investors looking for new opportunities. Our platform is designed to connect startups with relevant funding sources and streamline the process of securing financial support.",
  },
  {
    id: "item-3",
    title: "Is there a cost to use BridgeIN?",
    content:
      "BridgeIN is completely free to use. We aim to provide accessible funding resources and support for startups without any cost. However, you may need to integrate with certain third-party services for enhanced features.",
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
      className="offset-y-0 offset-x-8 mx-auto my-16 max-w-3xl drop-shadow-xl opacity-0"
    >
      <div className="flex flex-col items-center gap-5 pt-10 p-4 text-center">
        <h3 className="max-w-screen-md text-2xl font-semibold tracking-tight sm:text-3xl md:mt-4 md:text-4xl lg:text-5xl font-custom">
          Frequently Asked Questions
        </h3>
        <p className="text-base text-gray-700 dark:text-white/85 md:text-lg max-w-[90%] mx-auto font-custom">
          Here are some of the most frequently asked questions about BridgeIN.
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
