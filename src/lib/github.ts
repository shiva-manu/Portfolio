export interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    language: string;
    updated_at: string;
    homepage?: string | null;
}

export async function getRepos(): Promise<Repo[]> {
    try {
        // Delay to show skeletons
        await new Promise(resolve => setTimeout(resolve, 1500));

        const res = await fetch("https://api.github.com/users/shiva-manu/repos?sort=updated&per_page=6", {
            next: { revalidate: 60 },
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
