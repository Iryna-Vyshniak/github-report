import { GithubUser, LocalGithubUser } from "./user";

export const extractLocalUser = (user: GithubUser): LocalGithubUser => ({
    id: user.id,
    login: user.login,
    avatar: user.avatar_url,
    name: user.name || "No Name",
    company: user.company || "Not Specified",
    blog: user.blog || "Not Specified",
    location: user.location || "Not Available",
    bio: user.bio || "No Bio Available",
    twitter: user.twitter_username || "No Twitter",
    public_gists: user.public_gists,
    public_repos: user.public_repos,
    followers: user.followers,
    following: user.following,
    created_at: user.created_at,
    updated_at: user.updated_at,
});
