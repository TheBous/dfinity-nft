import { AuthClient } from "@dfinity/auth-client";
import useAuthStore from "../../zustand/auth";
import createAuthClient from "../../utils/auth/createAuthClient";
import getIdentityProviderUrl from "../../utils/auth/getIdentityProvider";
import { AUTH_SESSION_DURATION } from "../../constants/auth/ttl";
import logWithTimestamp from "../../utils/date/logWithTimestamp";

let authClient: AuthClient | undefined | null;

export const useAuth = () => {
    const { identity, setIdentity } = useAuthStore();
    const internetIdentityLogin = async () => {
        authClient = authClient ?? (await createAuthClient());

        await authClient?.login({
            identityProvider: getIdentityProviderUrl(),
            maxTimeToLive: AUTH_SESSION_DURATION,
            onSuccess: () => {
                const identity = authClient?.getIdentity();
                setIdentity(identity);
            },
            onError: (e) => console.error(e),
        });
    };

    const internetIdentityLogout = async () => {
        logWithTimestamp(authClient);
        const client: AuthClient = authClient ?? (await createAuthClient());
        await client.logout();

        authClient = null;

        setIdentity(null);
    };

    const internetIdentitySync = async () => {
        authClient = authClient ?? (await createAuthClient());
        const isAuthenticated = await authClient.isAuthenticated();
        setIdentity(isAuthenticated ? authClient.getIdentity() : null);
    }

    return {
        identity,
        internetIdentitySync,
        internetIdentityLogin,
        internetIdentityLogout
    }
};