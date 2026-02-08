import Link from "next/link";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCanvas from "@/components/3d/HeroCanvas";
import SkillsCloud from "@/components/3d/SkillsCloud";
import ProjectList, { ProjectsSkeleton } from "@/components/ProjectList";
import { TiltCard } from "@/components/3d/TiltCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroCanvas />
        <div className="absolute inset-0 z-0">
          <SkillsCloud />
        </div>
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-violet-500 mb-6 drop-shadow-md">
            Hi, I&apos;m Shiva Mani
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Full Stack Developer specialized in building exceptional digital experiences.
            Focused on performance, aesthetics, and user interaction.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90 shadow-lg text-primary-foreground font-medium" asChild>
              <Link href="#projects">View Work</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 border-2 border-primary/20 hover:border-primary/50 text-foreground font-medium backdrop-blur-sm" asChild>
              <Link href="#contact">Contact Me</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-muted/30 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4 drop-shadow-sm">About Me</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto backdrop-blur-sm bg-background/30 p-4 rounded-lg">
              I&apos;m passionate about creating beautiful and functional web applications.
              With expertise in modern frontend frameworks and backend technologies,
              I bring ideas to life with clean code and intuitive design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 backdrop-blur-sm">
            <TiltCard>
              <Card className="hover:shadow-lg transition-shadow duration-300 border-primary/20 bg-card/60 h-full">
                <CardHeader>
                  <CardTitle className="text-xl">Frontend</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-primary/10 hover:bg-primary/20 transform hover:scale-105 transition-transform">{tech}</Badge>
                  ))}
                </CardContent>
              </Card>
            </TiltCard>
            <TiltCard>
              <Card className="hover:shadow-lg transition-shadow duration-300 border-primary/20 bg-card/60 h-full">
                <CardHeader>
                  <CardTitle className="text-xl">Backend</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {["Node.js", "Express", "PostgreSQL", "MongoDB", "GraphQL"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-primary/10 hover:bg-primary/20 transform hover:scale-105 transition-transform">{tech}</Badge>
                  ))}
                </CardContent>
              </Card>
            </TiltCard>
            <TiltCard>
              <Card className="hover:shadow-lg transition-shadow duration-300 border-primary/20 bg-card/60 h-full">
                <CardHeader>
                  <CardTitle className="text-xl">Tools</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {["Git", "Docker", "AWS", "Figma", "VS Code"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-primary/10 hover:bg-primary/20 transform hover:scale-105 transition-transform">{tech}</Badge>
                  ))}
                </CardContent>
              </Card>
            </TiltCard>
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

          <Suspense fallback={<ProjectsSkeleton />}>
            <ProjectList />
          </Suspense>
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
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-md">
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

