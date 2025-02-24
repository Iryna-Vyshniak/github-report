export type LocalGithubUser = {
    id: number;
    login: string;
    avatar: string;
    name: string;
    company: string;
    blog: string;
    location: string | null;
    bio: string;
    twitter: string;
    public_gists: number;
    public_repos: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
};


export type GithubUser = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    user_view_type: string;
    site_admin: boolean;
    name: string;
    company: string | null;
    blog: string;
    location: string | null;
    email: string | null;
    hireable: boolean | null;
    bio: string;
    twitter_username: string | null;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
};


export type GithubError = {
    message: string,
    documentation_url: string,
}

