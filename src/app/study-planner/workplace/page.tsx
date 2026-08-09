import { auth } from "@/auth";
import { redirect } from "next/navigation";
import StudyPlannerPageContent from "./StudyPlannerPageContent";
import WorkspaceTopbar from "@/components/tools/WorkspaceTopbar";

export default async function StudyPlannerWorkspacePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <WorkspaceTopbar toolName="AI Smart Study Planner" />
      <StudyPlannerPageContent />
    </div>
  );
}