import { useEffect, useCallback } from "react";
import { PostMessage } from "../../types/workers/post-messages";
import { useAuth } from "../auth/useAuth";

const authWorker = new Worker(new URL('../../workers/balance/auth.worker', import.meta.url))

export interface AuthWorker {
    syncAuthIdle: (principal: string) => void;
}

const useAuthWorker = (): AuthWorker => {
    const { internetIdentityLogout } = useAuth();

    const logout = useCallback(async () => {
        await internetIdentityLogout();
        window.location.reload();
    }, [internetIdentityLogout]);

    useEffect(() => {
        authWorker.onmessage = async ({
            data,
        }: MessageEvent<PostMessage<null>>) => {
            // const { msg, data: value } = data;
            const { msg } = data;
            // console.warn(value);
            switch (msg) {
                case "nnsSignOut":
                    await logout();
                    return;
            }
        };
    }, [logout]);


    return {
        syncAuthIdle: (principal: string) => {
            if (!principal) {
                authWorker.postMessage({ msg: "nnsStopIdleTimer" });
                return;
            }

            authWorker.postMessage({
                msg: "nnsStartIdleTimer",
            });
        },
    };
};

export default useAuthWorker;