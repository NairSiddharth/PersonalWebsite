import profile from "@/data/profile.json";
import { Badge } from "@/components/ui/badge";

export default function About() {
  return (
    <section className="py-12 px-6 max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-4">{profile.name}</h1>

      {/* Status Badge */}
      <Badge variant="secondary" className="mb-6">
        🌟 {profile.status}
      </Badge>

      <p className="text-muted-foreground mb-8">
        {profile.summary}
        </p>
    </section>
  );
}
