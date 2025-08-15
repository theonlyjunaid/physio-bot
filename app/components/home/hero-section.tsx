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

    <section className="w-full min-h-[92dvh] bg-gradient-to-br from-orange-50 via-blue-50 to-green-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-r from-orange-400/20 to-pink-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-72 h-72 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

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

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
          <div className="flex flex-col items-center md:items-start space-y-6 text-center md:text-left pt-10 md:pt-0 md:w-1/2">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-orange-500 text-lg">🇮🇳</span>
              <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Happy Independence Day!</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-gradient-to-r from-orange-500 via-blue-600 to-green-600 bg-clip-text text-transparent">
              Move Better, Live Better
            </h1>
            <p className="max-w-[700px] text-gray-600 md:text-xl dark:text-gray-300 leading-relaxed">
              DrPhysio is your AI-powered physiotherapy assistant, helping you improve your movement and enhance your quality of life with personalized care.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-8">
              <Link href="/signup">
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700 text-white border-none shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/#features">
                <Button size="lg" variant="outline" className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-200">
                  Learn More
                </Button>
              </Link>
            </div>
            
            {/* Stats Row */}
            <div className="flex items-center space-x-8 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">1000+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">24/7</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">AI Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">Free</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Always</div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative">
              <Image src="/drphysio.webp" alt="DrPhysio Hero Image" width={1000} height={1000} className="w-full h-auto drop-shadow-2xl"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="features" className="w-full py-16 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4 text-gray-900 dark:text-white">Why Choose DrPhysio?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Experience the future of physiotherapy with our AI-powered platform designed to help you move better and live healthier.</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
              <CardHeader>
                <feature.icon className="w-12 h-12 mb-4 text-blue-600 group-hover:text-orange-500 transition-colors duration-300" />
                <CardTitle className="text-xl font-semibold group-hover:text-blue-600 transition-colors duration-300">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">{feature.content}</p>
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
