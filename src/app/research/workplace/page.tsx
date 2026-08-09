import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ResearchPageContent from "./ResearchPageContent";
import WorkspaceTopbar from "@/components/tools/WorkspaceTopbar";

export default async function ResearchWorkspacePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <WorkspaceTopbar toolName="AI Research Assistant" />
      <ResearchPageContent />
    </div>
  );
}