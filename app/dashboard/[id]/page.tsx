import { SiteFooter } from "@/app/components/home/Footer";
import { NavBar } from "@/app/components/home/Navbar";
import { getAssismentConvo, getUserData } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import Chat from "../../components/chat/chat";
import { Assisment } from "@/lib/types/types";
import AssessmentInfo from "@/app/components/chat/AssismentInfo";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await getUserData();
  if (!user) return redirect("/signup");
  if (!user.is_onboarded) return redirect("/onboarding");
  const convos = (await getAssismentConvo(params.id)) as Assisment;
  console.log(convos);
  if (!convos) return <div>No conversation found.</div>;
  // useEffect(() => {
  //   const createThread = async () => {
  //     const res = await fetch(`/api/assistants/threads`, {
  //       method: "POST",
  //     });
  //     const data = await res.json();
  //     setThreadId(data.threadId);
  //   };
  //   createThread();
  // }, []);

  return (
    <div className="">
      {/* <NavBar className="bg-white" /> */}
      <main className="flex flex-col md:flex-row  justify-center items-center ">
        <div className="md:mr-auto w-full  md:w-[45%]  md:h-[90dvh] md:px-7  ">
          <AssessmentInfo assessment={convos} />
        </div>
        <div className=" md:ml-auto w-full  md:w-[55%] h-[80dvh] md:h-[100dvh] md:border-l ">
          <Chat threadId={convos.threadId} assisment={convos} user={user} />
        </div>
      </main>
    </div>
  );
}
