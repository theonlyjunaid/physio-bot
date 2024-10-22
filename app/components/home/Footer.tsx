import * as React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn("bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800", className)}>
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">DrPhysio</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Move Better, Live Better</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400" href="/about">About</Link></li>
              <li><Link className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400" href="/faq">FAQ</Link></li>
              <li><Link className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400" href="/contacts">Contact</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Legal</h4>
            <ul className="space-y-2">
              <li><Link className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400" href="/terms-and-condition">Terms of Service</Link></li>
              <li><Link className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400" href="/privacy-policy">Privacy Policy</Link></li>
            </ul>
          </div>

        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 DrPhysio. All rights reserved.</p>
        </div>
      </div>
      <div className="text-center my-2" >
        <a href="https://www.freepik.com/free-vector/graident-ai-robot-vectorart_125887871.htm#fromView=search&page=1&position=51&uuid=bbf44878-0a14-4eee-b343-2f90c64ffe2a">Image by juicy_fish on Freepik</a>

      </div>
    </footer>
  );
}
