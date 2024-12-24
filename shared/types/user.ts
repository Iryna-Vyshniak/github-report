export type LocalGithubUser = {
    login: string,
    avatar: string,
    name: string,
    company: string,
    blog: string,
    location: string | null
    bio: string,
    twitter: string,
    public_gists: number
    public_repos: number,
    followers: number,
    following: number,
    created: string,
};

export type GithubUser = {
    login: string,
    id: number,
    avatar_url: string,
    name: string,
    company: string,
    blog: string,
    location: string | null
    bio: string,
    twitter_username: string,
    public_gists: number
    public_repos: number,
    followers: number,
    following: number,
    created_at: string,
};

export type GithubError = {
    message: string,
    documentation_url: string,
};