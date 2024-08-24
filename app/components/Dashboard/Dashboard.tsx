import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Ghost, Loader2, MessageSquare, Plus, Trash } from "lucide-react";
import StartupForm from "./FormForConvo";
import { getAllStartupConvos } from "@/lib/server/appwrite";
import { Iuser } from "@/lib/types/types";
import Assignment from "./Assisment";

const Dashboard = async ({ user }: { user: Iuser }) => {
  const startupConvos = await getAllStartupConvos();

  return (
    <main className="mx-auto max-w-7xl md:p-10 min-h-screen">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-5xl text-gray-900">My CONVO</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-5 w-5 mr-1" />
              Add New Convo
            </Button>
          </DialogTrigger>
          <DialogContent className="w-screen md:min-w-[600px]">
            <Assignment user={user} />
          </DialogContent>
        </Dialog>
      </div>
      {(user.conversations?.length as number) > 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
          {user.conversations.map((startupConvo, index) => (
            <li
              key={index}
              className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg"
            >
              <Link
                href={`/dashboard/${startupConvo.$id}`}
                className="flex flex-col gap-2"
              >
                <div className="py-6 px-6 flex w-full items-center justify-between space-x-6">
                  <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                  <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                      <h3 className="truncate text-lg font-medium text-zinc-900">
                        {startupConvo.name}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-between px-6 py-4 space-x-2">
                      {format(new Date(startupConvo.$updatedAt), "dd MMM yyyy")}
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <div className="flex flex-col items-center justify-center h-[80vh]">
            <MessageSquare className="w-16 h-16 text-4xl text-gray-500" />
            <h1 className="mt-4 text-xl text-gray-900">No Convo found</h1>
          </div>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
