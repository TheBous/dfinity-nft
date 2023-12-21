import { Identity } from "@dfinity/agent";
import { decodeIcrcAccount } from "@dfinity/ledger-icrc";
import { createIcrcCanister } from "../icrc1";
import mapCanisterId from "../../mapCanisterId";

interface GetIcrc1Balance {
    identity: Identity;
    data: {
        ledgerCanisterId: string;
        certified?: boolean;
    };
}

const getIcrc1Balance = async ({
    identity,
    data: { ledgerCanisterId, certified = false, },

}: GetIcrc1Balance): Promise<bigint> => {
    const principal = identity.getPrincipal().toText();
    const { canister: { balance: getBalance } = {} } = await createIcrcCanister({
        identity, canisterId: mapCanisterId(ledgerCanisterId)
    });

    const account = decodeIcrcAccount(principal);
    const balance = await getBalance({ certified, ...account });

    return balance;
}



export default getIcrc1Balance;