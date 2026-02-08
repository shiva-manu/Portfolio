import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCanvas from "@/components/3d/HeroCanvas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
}

async function getRepos(): Promise<Repo[]> {
  try {
    const res = await fetch("https://api.github.com/users/shiva-manu/repos?sort=updated&per_page=6", {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!res.ok) {
      console.error("Failed to fetch repos", res.statusText);
      return [];
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching repos", error);
    return [];
  }
}

export default async function Home() {
  const repos = await getRepos();

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroCanvas />
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-6 drop-shadow-md">
            Hi, I'm Mani
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Full Stack Developer specialized in building exceptional digital experiences.
            Focused on performance, aesthetics, and user interaction.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="rounded-full px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg text-white font-medium">
              View Work
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 border-2 border-primary/20 hover:border-primary/50 text-foreground font-medium backdrop-blur-sm">
              Contact Me
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">About Me</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              I'm passionate about creating beautiful and functional web applications.
              With expertise in modern frontend frameworks and backend technologies,
              I bring ideas to life with clean code and intuitive design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300 border-primary/10">
              <CardHeader>
                <CardTitle>Frontend</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js"].map((tech) => (
                  <Badge key={tech} variant="secondary">{tech}</Badge>
                ))}
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300 border-primary/10">
              <CardHeader>
                <CardTitle>Backend</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {["Node.js", "Express", "PostgreSQL", "MongoDB", "GraphQL"].map((tech) => (
                  <Badge key={tech} variant="secondary">{tech}</Badge>
                ))}
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300 border-primary/10">
              <CardHeader>
                <CardTitle>Tools</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {["Git", "Docker", "AWS", "Figma", "VS Code"].map((tech) => (
                  <Badge key={tech} variant="secondary">{tech}</Badge>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Featured Projects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A selection of projects that showcase my skills and passion for development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repos.length > 0 ? (
              repos.map((repo) => (
                <Card key={repo.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-muted flex flex-col h-full">
                  <div className="h-32 bg-muted/50 relative overflow-hidden flex-shrink-0">
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 text-2xl font-bold group-hover:scale-105 transition-transform duration-500 uppercase px-4 text-center">
                      {repo.name}
                    </div>
                  </div>
                  <CardHeader className="flex-grow">
                    <CardTitle className="truncate" title={repo.name}>{repo.name}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {repo.description || "No description available for this project."}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {repo.language && <Badge variant="outline">{repo.language}</Badge>}
                      <Badge variant="secondary">⭐ {repo.stargazers_count}</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <Button asChild variant="ghost" className="w-full hover:bg-primary/5 group-hover:text-primary transition-colors">
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        View Project &rarr;
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center text-muted-foreground">
                No projects found or failed to load. Check back later!
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Get In Touch</h2>
            <p className="text-muted-foreground">
              Have a project in mind or want to collaborate? I'd love to hear from you.
            </p>
          </div>

          <Card className="p-6 shadow-lg border-primary/10">
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name</label>
                <Input placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                <Input type="email" placeholder="hello@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Message</label>
                <Textarea placeholder="Share your thoughts..." className="min-h-[120px]" />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-md">
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
