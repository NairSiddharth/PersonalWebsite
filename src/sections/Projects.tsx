// src/sections/Projects.tsx
import projects from "@/data/projects.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  status: string;
  tags: string[];
}

function getStatusBadge(status: string) {
  switch (status) {
    case "Active":
      return <Badge className="bg-brand-emerald text-white">{status}</Badge>;
    case "In Progress":
      return <Badge className="bg-brand-cyan text-white">{status}</Badge>;
    case "Archived":
      return <Badge className="bg-brand-red text-white">{status}</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

export default function Projects() {
  const repos: Repo[] = projects;

  return (
    <section className="py-12 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Featured Projects</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {repos.map((repo) => (
          <Card key={repo.id} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{repo.name}</span>
                {getStatusBadge(repo.status)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {repo.description || "No description provided."}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {repo.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button asChild variant="outline" size="sm">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  View Repo <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
