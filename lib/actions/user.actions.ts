import { extractLocalUser } from "@/shared/types/exract-local-user";
import { GithubError, GithubUser } from "@/shared/types/user";
import { isGithubUser } from "@/shared/utils/typeguards";

export const fetchUser = async (username: string) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL! + username;
    const res = await fetch(url);

    if (!res.ok) throw new Error('User not found');

    const user = (await res.json()) as GithubUser | GithubError;

    if (isGithubUser(user)) {
        return extractLocalUser(user);
    } else {
        console.error('User not found or invalid response', user);
        throw new Error('User not found or invalid response');
    }
};