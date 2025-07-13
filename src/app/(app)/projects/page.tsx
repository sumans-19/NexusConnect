import { getProjects } from "@/lib/db";
import { ProjectsClient } from "./client";

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <div className="space-y-6">
      <ProjectsClient projects={projects} />
    </div>
  );
}
