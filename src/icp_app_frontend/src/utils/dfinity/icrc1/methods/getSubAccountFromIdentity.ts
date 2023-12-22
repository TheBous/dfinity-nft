import { Identity } from "@dfinity/agent";
import { encodeIcrcAccount } from "@dfinity/ledger-icrc";

const getSubAccountFromIdentity = async (identity: Identity) => {
    const subaccount = new Uint8Array(32).fill(0);
    const account = {
        owner: identity.getPrincipal(),
        subaccount: subaccount,
    };
    const subaccountString = encodeIcrcAccount(account);
    return {
        account,
        subaccountString,
    };
}

export default getSubAccountFromIdentity

