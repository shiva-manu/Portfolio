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
        // Artificial delay to demonstrate skeleton if needed
        // await new Promise(resolve => setTimeout(resolve, 2000));

        const res = await fetch("https://api.github.com/users/shiva-manu/repos?sort=updated&per_page=6", {
            next: { revalidate: 60 }, // Revalidate every minute
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
