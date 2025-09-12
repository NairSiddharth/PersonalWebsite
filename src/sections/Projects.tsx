"use client";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import projects from "@/data/projects.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Play, Calendar, Star } from "lucide-react";

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  status: string;
  tags: string[];
  featured?: boolean;
  live_url?: string;
  image?: string;
  year?: string;
  detailed_description?: string;
}

function getStatusConfig(status: string) {
  switch (status) {
    case "Active":
      return { 
        variant: "default" as const, 
        color: "bg-green-500 text-white",
        icon: "🟢"
      };
    case "In Progress":
      return { 
        variant: "secondary" as const, 
        color: "bg-blue-500 text-white",
        icon: "🔄"
      };
    case "Archived":
      return { 
        variant: "outline" as const, 
        color: "bg-gray-500 text-white",
        icon: "📁"
      };
    default:
      return { 
        variant: "outline" as const, 
        color: "bg-gray-400 text-white",
        icon: "❓"
      };
  }
}

export default function Projects() {
  const [filter, setFilter] = useState<string>("all");
  const [mounted, setMounted] = useState(false);
  
  const repos: Repo[] = projects;
  
  // Get unique technologies for filtering
  const allTechnologies = Array.from(
    new Set(repos.flatMap(repo => repo.tags))
  ).sort();

  // Filter projects based on selected filter
  const filteredRepos = filter === "all" 
    ? repos 
    : repos.filter(repo => repo.tags.includes(filter));

  // Separate featured and regular projects
  const featuredProjects = filteredRepos.filter(repo => repo.featured);
  const regularProjects = filteredRepos.filter(repo => !repo.featured);

  useEffect(() => {
    setMounted(true);
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      anchorPlacement: "center-bottom",
    });
  }, []);

  const ProjectCard = ({ repo, featured = false }: { repo: Repo, featured?: boolean }) => {
    const statusConfig = getStatusConfig(repo.status);
    
    return (
      <Card 
        className={`flex flex-col justify-between hover:shadow-lg transition-all duration-300 group ${
          featured ? 'ring-2 ring-primary/20 shadow-lg' : ''
        }`}
        data-aos="fade-up"
        data-aos-delay={featured ? "0" : "100"}
      >
        {/* Project Image/Preview */}
        <div className="relative overflow-hidden rounded-t-lg">
          {repo.image ? (
            <div className="aspect-video bg-muted relative">
              <img 
                src={repo.image} 
                alt={`${repo.name} preview`}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 p-4"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ) : (
            <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
              <Github className="w-12 h-12 text-muted-foreground/50" />
            </div>
          )}
          
          {/* Featured badge */}
          {featured && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-primary text-primary-foreground">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            </div>
          )}
          
          {/* Status badge */}
          <div className="absolute top-3 right-3">
            <Badge variant={statusConfig.variant} className={statusConfig.color}>
              <span className="mr-1">{statusConfig.icon}</span>
              {repo.status}
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span className={featured ? "text-lg" : "text-base"}>{repo.name}</span>
            {repo.year && (
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="w-3 h-3 mr-1" />
                {repo.year}
              </div>
            )}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col">
          <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
            {repo.detailed_description || repo.description || "No description provided."}
          </p>
          
          {/* Technology tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {repo.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => setFilter(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
          
          {/* Action buttons */}
          <div className="flex gap-2 mt-auto">
            {repo.live_url && (
              <Button asChild variant="default" size="sm" className="flex-1">
                <a
                  href={repo.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Play className="w-3 h-3" />
                  Live Demo
                </a>
              </Button>
            )}
            <Button 
              asChild 
              variant={repo.live_url ? "outline" : "default"} 
              size="sm" 
              className={repo.live_url ? "flex-none" : "flex-1"}
            >
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="w-3 h-3" />
                {repo.live_url ? "" : "View Code"}
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (!mounted) return null;

  return (
    <section id="projects" className="py-12 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A showcase of my technical projects, ranging from full-stack applications to data science experiments.
        </p>
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-8" data-aos="fade-up" data-aos-delay="100">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          All Projects
        </Button>
        {allTechnologies.slice(0, 6).map((tech) => (
          <Button
            key={tech}
            variant={filter === tech ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(tech)}
          >
            {tech}
          </Button>
        ))}
      </div>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6 text-center" data-aos="fade-up">
            ⭐ Highlighted Work
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {featuredProjects.map((repo) => (
              <ProjectCard key={repo.id} repo={repo} featured={true} />
            ))}
          </div>
        </div>
      )}

      {/* Regular Projects */}
      {regularProjects.length > 0 && (
        <div>
          {featuredProjects.length > 0 && (
            <h3 className="text-xl font-semibold mb-6 text-center" data-aos="fade-up">
              Other Projects
            </h3>
          )}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regularProjects.map((repo) => (
              <ProjectCard key={repo.id} repo={repo} />
            ))}
          </div>
        </div>
      )}

      {/* No projects found */}
      {filteredRepos.length === 0 && (
        <div className="text-center py-12" data-aos="fade-up">
          <p className="text-muted-foreground">
            No projects found for "{filter}". Try a different filter.
          </p>
        </div>
      )}
    </section>
  );
}