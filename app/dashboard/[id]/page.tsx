import { SiteFooter } from "@/app/components/home/Footer";
import { NavBar } from "@/app/components/home/Navbar";
import { getStartupConvo, getUserData } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import styles from "./page.module.css"; // use simple styles for demonstration purposes
import Chat from "../../components/chat/chat";
import { StartupDetail } from "@/lib/types/types";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await getUserData();
  if (!user) return redirect("/signup");
  if (!user.is_onboarded) return redirect("/onboarding");
  const convos = (await getStartupConvo(params.id)) as StartupDetail;
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
    <div className="min-h-screen">
      <NavBar />
      <main className={styles.main}>
        <div className={styles.container}>
          <Chat threadId={convos.threadId} />
        </div>
      </main>
    </div>
  );
}
