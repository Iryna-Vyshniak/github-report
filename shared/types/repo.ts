export type GitHubRepo = {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    description: string | null;
    fork: boolean;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    stargazers_count: number;
    watchers_count: number;
    forks_count: number;
    language: string | null;
    topics: string[];
    visibility: string;
    default_branch: string;
}

export type GitHubAggregateStats = {
    totalRepos: number
    totalStars: number
    totalForks: number
    mostActiveDay: string
    totalCommits: number
    topLanguages: string
}

export type GitHubCommit = {
    sha: string;
    author?: { login: string };
}
