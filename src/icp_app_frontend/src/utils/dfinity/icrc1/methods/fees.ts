import { Identity } from "@dfinity/agent";
import { createIcrcCanister } from "../icrc1";
import logWithTimestamp from "../../../date/logWithTimestamp";
import mapCanisterId from "../../mapCanisterId";
import isTestnet from "../../utils/isTestnet";

export const transactionFee = async ({
    identity,
    canisterId,
    certified = false,
}: {
    identity: Identity;
    canisterId: string;
    certified?: boolean;
}): Promise<bigint> => {
    logWithTimestamp(`Getting transaction fee call...`);
    const {
        agent, canister: { transactionFee },
    } = await createIcrcCanister({ identity, canisterId: mapCanisterId(canisterId) });

    if (isTestnet()) await agent.fetchRootKey()
    const fee = await transactionFee({ certified });
    logWithTimestamp(`Getting transaction fee complete.`);
    return fee;
};