import { Repo, getRepos } from "@/lib/github";
import { TiltCard, TiltCardContent } from "@/components/3d/TiltCard";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function ProjectCard({ repo }: { repo: Repo }) {
    return (
        <TiltCard className="h-full">
            <Card className="overflow-hidden group transition-all duration-300 border-muted flex flex-col h-full bg-card/80 backdrop-blur-sm hover:border-primary/50">
                <TiltCardContent className="transform-style-3d">
                    <div className="h-32 bg-muted/50 relative overflow-hidden flex-shrink-0 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 text-2xl font-bold uppercase px-4 text-center [transform:translateZ(20px)]">
                            {repo.name}
                        </div>
                    </div>
                </TiltCardContent>
                <CardHeader className="flex-grow">
                    <CardTitle className="truncate text-xl" title={repo.name}>{repo.name}</CardTitle>
                    <CardDescription className="line-clamp-3">
                        {repo.description || "No description available for this project."}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {repo.language && <Badge variant="outline" className="border-primary/30">{repo.language}</Badge>}
                        <Badge variant="secondary" className="bg-primary/10">⭐ {repo.stargazers_count}</Badge>
                    </div>
                </CardContent>
                <CardFooter className="mt-auto flex gap-2">
                    <Button asChild variant="ghost" className="flex-1 hover:bg-primary/20 group-hover:text-primary transition-colors text-xs px-2">
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            Repo &rarr;
                        </a>
                    </Button>
                    {repo.homepage && (
                        <Button asChild variant="outline" className="flex-1 border-primary/20 hover:bg-primary/10 text-xs px-2">
                            <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                                Live Demo ↗
                            </a>
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </TiltCard>
    );
}

export function ProjectsSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-[380px] rounded-xl overflow-hidden border border-muted bg-card/40 flex flex-col">
                    <Skeleton className="h-32 w-full rounded-none opacity-40" />
                    <div className="p-6 flex-grow space-y-4">
                        <Skeleton className="h-7 w-3/4 opacity-60" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full opacity-40" />
                            <Skeleton className="h-4 w-5/6 opacity-40" />
                        </div>
                        <div className="flex gap-2 pt-2">
                            <Skeleton className="h-5 w-16 opacity-40 rounded-full" />
                            <Skeleton className="h-5 w-16 opacity-40 rounded-full" />
                        </div>
                    </div>
                    <div className="p-6 pt-0 flex gap-4">
                        <Skeleton className="h-9 flex-1 opacity-20" />
                        <Skeleton className="h-9 flex-1 opacity-20" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default async function ProjectList() {
    const repos = await getRepos();

    if (repos.length === 0) {
        return (
            <div className="col-span-full text-center text-muted-foreground py-20">
                No projects found or failed to load. Check back later!
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repos.map((repo) => (
                <ProjectCard key={repo.id} repo={repo} />
            ))}
        </div>
    );
}
