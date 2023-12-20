import React, { useEffect } from "react";
// import { AuthClient } from "@dfinity/auth-client";
// import { Actor, HttpAgent } from "@dfinity/agent";
// import { idlFactory as idlFactoryThebous } from "../.2./../declarations/thebous/index";
import dfinity from "../../assets/images/dfinity.jpg";
import { useAuth } from "../hooks/auth/useAuth";
// import { decodeIcrcAccount } from "@dfinity/ledger-icrc";
// import { Principal } from "@dfinity/principal";

const App = () => {
    const { identity, IISync, IISignin, IILogout } = useAuth();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { IISync(); }, []);

    // authClient.login({
    //     identityProvider: identityProviderUrl,
    //     maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
    //     onSuccess: async () => {
    //         const identity = authClient.getIdentity();
    //         const principal = identity.getPrincipal().toString();

    //         const decoded = decodeIcrcAccount(principal);
    //         console.warn(decoded.subaccount, decoded.owner);

    //         const agent = new HttpAgent({ identity });
    //         if (identityProviderUrl) await agent.fetchRootKey();

    //         // LOGIN TO UR CANISTER
    //         const actor = Actor.createActor(idlFactoryThebous, {
    //             agent,
    //             canisterId: process.env.CANISTER_ID_THEBOUS,
    //         });

    //         const balance = await actor.icrc1_balance_of({ owner: "sbduh-sgaas-dtvyq-wp7wi-dtood-inxjk-mlwu2-kzqel-lpubj-xwnlt-wae", subaccount: decoded.subaccount ?? null });
    //         console.warn('balance', balance);
    //     },
    // });

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img loading="lazy" src={dfinity} alt="dfinity" /></figure>
                <div className="card-body">
                    <h2 className="card-title">
                        dfinity NFT!
                        <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Join the best dfinity NFT community!</p>
                    <div className="card-actions justify-end">
                        {!identity && <button onClick={IISignin} className="btn btn-primary">Login</button>}
                        {!!identity && <button onClick={IILogout} className="btn btn-secondary">Logout</button>}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default App;