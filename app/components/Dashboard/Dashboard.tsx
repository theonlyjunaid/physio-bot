"use client";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MessageSquare, Plus, Calendar, User, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { getAllAssisment } from "@/lib/server/appwrite";
import { Iuser, AssismentResponse } from "@/lib/types/types";
import Assignment from "./Assisment";
import { useState, useEffect } from "react";

const ITEMS_PER_PAGE = 60;

const Dashboard = ({ user }: { user: Iuser }) => {
  const [assisments, setAssisments] = useState<AssismentResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAssisments = async () => {
      const fetchedAssisments = await getAllAssisment();
      setAssisments(fetchedAssisments || []);
      setIsLoading(false);
    };

    fetchAssisments();
  }, []);

  const totalPages = Math.ceil((assisments?.length || 0) / ITEMS_PER_PAGE);
  const paginatedAssisments = assisments?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <main className="mx-auto max-w-7xl p-4 md:p-10 min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">My Treatments</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
              <Plus className="h-5 w-5 mr-2" />
              Click for Treatment
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-md md:max-w-2xl">
            <Assignment user={user} />
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
        </div>
      ) : assisments && assisments.length > 0 ? (
        <>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedAssisments.map((assisment: AssismentResponse) => (
              <ConversationCard key={assisment.$id} assisment={assisment} />
            ))}
          </ul>
          <div className="mt-8  justify-center hidden items-center space-x-4">
            <Button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <span className="text-gray-700 font-semibold">{currentPage} of {totalPages}</span>
            <Button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </>
      ) : (
        <EmptyState user={user} />
      )}
    </main>
  );
};

const ConversationCard = ({ assisment }: { assisment: AssismentResponse }) => (
  <li className="col-span-1 bg-white rounded-lg border border-gray-200 shadow-md transition duration-300 ease-in-out transform hover:shadow-lg hover:-translate-y-1">
    <Link href={`/dashboard/${assisment.$id}`} className="block p-6">
      <div className="flex items-center space-x-4">
        <div className="flex-1 min-w-0">
          <p className="text-xl font-bold text-blue-600 truncate">{assisment.name}</p>
          <p className="text-sm text-gray-600 mt-1">Age: {assisment.age}, Gender: {assisment.gender}</p>
          <p className="text-sm text-gray-600">Pain Location: {assisment.locationOfPain}</p>
          <div className="flex items-center mt-2">
            <Calendar className="h-4 w-4 text-blue-400 mr-1" />
            <p className="text-sm text-gray-500 truncate">
              {format(new Date(assisment.$updatedAt), "PPP")}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 border-t pt-4">
        <p className="text-sm text-gray-700 line-clamp-2">{assisment.customerProblem}</p>
      </div>
    </Link>
  </li>
);

const EmptyState = ({ user }: { user: Iuser }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] bg-white rounded-lg shadow-lg p-8">
    <MessageSquare className="w-20 h-20 text-blue-500" />
    <h2 className="mt-6 text-3xl font-bold text-gray-900">No conversations yet</h2>
    <p className="mt-2 text-gray-600 text-center max-w-md">
      Start a new conversation to begin your journey towards better health management.
    </p>
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
          <Plus className="h-5 w-5 mr-2" />
          Start New Conversation
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-md md:max-w-2xl">
        <Assignment user={user} />
      </DialogContent>
    </Dialog>
  </div>
);

export default Dashboard;
