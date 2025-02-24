import { calculateRepoStats, getMostActiveDay, getTopLanguages, handleError } from "@/shared/helpers";
import { extractLocalUser } from "@/shared/types/exract-local-user";
import { GitHubRepo } from "@/shared/types/repo";
import { GithubError, GithubUser } from "@/shared/types/user";
import { isGithubUser } from "@/shared/utils/typeguards";

export const headers = {
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json',
};

export const fetchUser = async (username: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
        throw new Error("Environment variable NEXT_PUBLIC_BASE_URL is not set");
    }

    const url = `${baseUrl}${username}`;
    const res = await fetch(url, { headers });

    if (!res.ok) {
        return handleError('User not found');
    }
    const user = (await res.json()) as GithubUser | GithubError;

    if (isGithubUser(user)) {
        return extractLocalUser(user);
    } else {
        return handleError('User not found or invalid response');
    }
};

export const fetchRepos = async (username: string): Promise<GitHubRepo[]> => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
        throw new Error("Environment variable NEXT_PUBLIC_BASE_URL is not set");
    }

    const url = `${baseUrl}${username}/repos?sort=pushed`;

    try {
        const res = await fetch(url, { headers });

        if (!res.ok) {
            throw new Error(`Failed to fetch repositories for ${username}`);
        }

        return (await res.json()) as GitHubRepo[];
    } catch (error) {
        console.error(`Error fetching repos for ${username}:`, error);
        throw error;
    }
};



export const getGitHubStats = async (username: string) => {
    try {
        const userData = await fetchUser(username);

        if (!userData) {
            console.warn(`User "${username}" not found.`);
            return null; // Якщо користувача немає, повертаємо `null`
        }

        const totalRepos = userData.public_repos;
        const reposData = await fetchRepos(username);
        const totalCommits = await getTotalCommitsThisYear(username);

        const { totalStars, totalForks } = calculateRepoStats(reposData);
        const mostActiveDay = getMostActiveDay(reposData);
        const topLanguages = getTopLanguages(reposData);

        return {
            userData,
            stats: {
                totalRepos,
                totalStars,
                totalForks,
                mostActiveDay,
                topLanguages,
                totalCommits,
            },
        };
    } catch (error) {
        console.error("Unexpected error fetching GitHub stats:", error);
        return null;
    }
};


export const getTotalCommitsThisYear = async (username: string): Promise<number> => {
    const currentYear = new Date().getFullYear();
    const startDate = `${currentYear}-01-01T00:00:00Z`; // Початок року

    const baseUrl = process.env.NEXT_PUBLIC_COMMITS_URL;
    if (!baseUrl) {
        throw new Error("Environment variable NEXT_PUBLIC_COMMITS_URL is not set");
    }

    const commitsUrl = `${baseUrl}${username}+committer-date:>=${startDate}`;

    try {
        console.log("Fetching commits from:", commitsUrl);
        const response = await fetch(commitsUrl, { headers }
        );

        if (!response.ok) {
            console.warn(`GitHub API error: ${response.status} ${response.statusText}`);
            return 0;
        }

        const data = await response.json();
        return data.total_count || 0; // GitHub повертає загальну кількість знайдених комітів
    } catch (error) {
        console.error("Error fetching total commits:", error);
        return 0;
    }
};


