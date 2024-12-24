import { GithubError, GithubUser } from "../types/user";

export const isGithubUser = (user: GithubUser | GithubError): user is GithubUser => {
    return (
        typeof user === 'object' &&
        user !== null &&
        'id' in user &&
        typeof user.id === 'number'
    );
};

