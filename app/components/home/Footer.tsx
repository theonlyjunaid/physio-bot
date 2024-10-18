import * as React from "react";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import Link from "next/link";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(" py-8", className)}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-custom font-bold text-gradient_indigo-purple flex items-center">
              Built by DrPhysio Team with Love <Heart className="ml-2 h-5 w-5 text-red-500" />
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <nav className="mb-4 md:mb-0 md:mr-8">
              <ul className="flex space-x-6">
                <li><Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link></li>
                <li><Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
                <li><Link href="/privacy" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
              </ul>
            </nav>
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} DrPhysio. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
