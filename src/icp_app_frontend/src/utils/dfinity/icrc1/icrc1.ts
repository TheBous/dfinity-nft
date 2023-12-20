import { Agent, Identity } from "@dfinity/agent";
import { IcrcLedgerCanister } from "@dfinity/ledger-icrc";
import { Principal } from "@dfinity/principal";
import { createAgentWrapper } from "../agent";

interface Icrc1Canister {
    identity: Identity;
    canisterId: Principal;
    host: string;
}

export const icrc1Canister = async ({
    identity,
    canisterId,
    host,
}: Icrc1Canister): Promise<{
    canister: IcrcLedgerCanister;
    agent: Agent;
}> => {
    const agent = await createAgentWrapper({
        identity,
        host,
    });

    const canister = IcrcLedgerCanister.create({
        agent,
        canisterId,
    });

    return {
        canister,
        agent,
    };
};
