import * as React from "react";
import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory as idlFactoryThebous } from "../../../declarations/thebous/index";
import dfinity from "../../assets/images/dfinity.jpg";

const App = () => {
    const login = async () => {
        const authClient = await AuthClient.create();
        const isLocalDevelopment = process.env.DFX_NETWORK === "local"
        const identityProviderUrl = !isLocalDevelopment
            ? "https://identity.ic0.app/#authorize"
            : `http://localhost:4943?canisterId=${process.env.CANISTER_ID_INTERNET_IDENTITY}#authorize`;

        authClient.login({
            identityProvider: identityProviderUrl,
            maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
            onSuccess: async () => {
                const identity = await authClient.getIdentity();
                const principal = identity.getPrincipal().toString();

                const agent = new HttpAgent({ identity });
                if (identityProviderUrl) await agent.fetchRootKey();

                // LOGIN TO UR CANISTER
                const actor = Actor.createActor(idlFactoryThebous, {
                    agent,
                    canisterId: process.env.CANISTER_ID_THEBOUS,
                });

                console.warn(actor, identity, identity.getPrincipal());

                const balance = await actor.icrc1_balance_of({ owner: principal });
                console.warn('balance', balance);

                // const principalInApp = await actor.whoami();
            },
        });
    };

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
                        <button onClick={login} className="btn btn-primary">Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default App;