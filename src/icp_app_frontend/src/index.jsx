import './app.css';

import React from "react";
import { createRoot } from "react-dom/client";
import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../declarations/icp_app_backend/index";
import dfinity from "../assets/images/dfinity.jpg";

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
        console.warn(principal);

        const agent = new HttpAgent({ identity });
        if (identityProviderUrl) await agent.fetchRootKey();

        console.warn(process.env.CANISTER_ID_ICP_APP_BACKEND);
        // LOGIN TO UR CANISTER
        const actor = Actor.createActor(idlFactory, {
          agent,
          canisterId: process.env.CANISTER_ID_ICP_APP_BACKEND,
        });

        const principalInApp = await actor.whoami();
        console.warn(principalInApp);
      },
    });
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure><img src={dfinity} alt="dfinity" /></figure>
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

const container = document.getElementById('app');
const root = createRoot(container); // React 18
root.render(<App />);