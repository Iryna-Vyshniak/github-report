import { GithubUser, LocalGithubUser } from "./user";

export const extractLocalUser = (user: GithubUser): LocalGithubUser => ({
    login: user.login,
    avatar: user.avatar_url,
    name: user.name,
    bio: user.bio,
    blog: user.blog,
    company: user.company,
    created: user.created_at,
    followers: user.followers,
    following: user.following,
    location: user.location,
    public_gists: user.public_gists,
    public_repos: user.public_repos,
    twitter: user.twitter_username,
});