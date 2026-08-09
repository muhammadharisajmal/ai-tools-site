import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ProductivityPageContent from "./ProductivityPageContent";
import WorkspaceTopbar from "@/components/tools/WorkspaceTopbar";

export default async function ProductivityWorkspacePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <WorkspaceTopbar toolName="Productivity Assistant" />
      <ProductivityPageContent />
    </div>
  );
}