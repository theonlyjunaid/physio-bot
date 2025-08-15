import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Brain, MessageCircle } from "lucide-react";

const features = [
  { icon: Brain, title: "AI-Powered Insights", content: "Our advanced AI analyzes your movement patterns and provides personalized recommendations." },
  { icon: MessageCircle, title: "24/7 Support", content: "Get instant answers to your questions and concerns, anytime, anywhere." },
  { icon: Activity, title: "Personalized Programs", content: "Receive tailored exercise programs designed to address your specific needs and goals." },
];

const steps = [
  { title: "Sign Up", content: "Create your account and tell us about your movement goals and any concerns." },
  { title: "Chat with DrPhysio", content: "Interact with our AI chatbot to get personalized advice and exercise recommendations." },
  { title: "Improve Your Movement", content: "Follow your personalized program and track your progress over time." },
];

const HeroSection: React.FC = () => (
  <>
    {/* Indian Flag Banner for Independence Day */}
    <div className="w-full h-3 bg-gradient-to-r from-orange-500 via-white to-green-600 flex">
      <div className="flex-1 bg-orange-500"></div>
      <div className="flex-1 bg-white flex items-center justify-center">
        <div className="w-2 h-2 bg-blue-800 rounded-full"></div>
      </div>
      <div className="flex-1 bg-green-600"></div>
    </div>

    <section className="w-full min-h-[92dvh] bg-gradient-to-r from-orange-50 via-white to-green-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Indian Flag Elements in Background */}
      <div className="absolute top-10 right-10 opacity-10">
        <div className="w-32 h-20 border border-gray-300">
          <div className="h-1/3 bg-orange-500"></div>
          <div className="h-1/3 bg-white flex items-center justify-center">
            <div className="w-4 h-4 border border-blue-800 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-blue-800 rounded-full"></div>
            </div>
          </div>
          <div className="h-1/3 bg-green-600"></div>
        </div>
      </div>

      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
          <div className="flex flex-col items-center md:items-start space-y-4 text-center md:text-left pt-10 md:pt-0 md:w-1/2">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-orange-500 text-lg">🇮🇳</span>
              <span className="text-sm text-gray-600 dark:text-gray-300">Happy Independence Day!</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-gradient-to-r from-orange-500 via-blue-600 to-green-600 bg-clip-text text-transparent">
              Move Better, Live Better
            </h1>
            <p className="max-w-[700px] text-gray-600 md:text-xl dark:text-gray-300">
              DrPhysio is your AI-powered physiotherapy assistant, helping you improve your movement and enhance your quality of life.
            </p>
            <div className="flex space-x-4 mt-8">
              <Link href="/signup"><Button size="lg" className="bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700 text-white border-none">Get Started</Button></Link>
              <Link href="/#features"><Button size="lg" variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">Learn More</Button></Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <Image src="/drphysio.webp" alt="DrPhysio Hero Image" width={1000} height={1000} className="w-full h-auto"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>

    <section id="features" className="w-full py-16 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12 text-gray-900 dark:text-white">Why Choose DrPhysio?</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <feature.icon className="w-12 h-12 mb-4 text-blue-600" />
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">{feature.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    <section id="how-it-works" className="w-full py-16 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12 text-gray-900 dark:text-white">How It Works</h2>
        <div className="grid gap-8 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-green-600 text-white text-2xl font-bold mb-4">{index + 1}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{step.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section id="cta" className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-r from-orange-500 via-blue-600 to-green-600 dark:from-orange-700 dark:via-blue-800 dark:to-green-700">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">Start Your Journey to Better Movement</h2>
          <p className="mx-auto max-w-[600px] text-white/90 md:text-lg">
            Join thousands of users who have improved their quality of life with DrPhysio. Sign up today and take the first step towards moving better and living better.
          </p>
          <Button size="lg" className="mt-8 bg-white text-orange-600 hover:bg-orange-50">Get Started Now</Button>
        </div>
      </div>
    </section>
  </>
);

export default HeroSection;
