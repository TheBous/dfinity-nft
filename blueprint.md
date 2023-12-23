# Commands

> deploy:ic

Description: Deploys the specified canister to the Internet Computer network.

Command:

```bash

dfx  deploy  --network=ic

```

> generate

Description: Generates necessary files for the specified canister.

Command:

```bash

dfx  generate $canister

```

> canister:status

Description: Displays the status of all canisters.

Command:

```bash

dfx  canister  status  --all

```

> canister:stop:all

Description: Stops all running canisters.

Command:

```bash

dfx  canister  stop  --all

```

> canister:delete:all

Description: Deletes all canisters.

Command:

```bash

dfx  canister  delete  --all

```

> canister:deploy

Description: Deploys all canisters.

Command:

    dfx deploy

> start:ic

Description: Starts the Internet Computer development environment in the background with cleanup.

Command:

```bash

dfx  start  --background  --clean

```

> prepare

Description: Installs Husky, a tool for Git hooking.

Command:

```bash

husky  install

```

> deploy:prod

Description: Creates, builds, and installs the canister on the Internet Computer network.

Command:

```bash

dfx  canister  --network  ic  create $canister && dfx  build  --network  ic $canister && dfx  canister  --network  ic  install $canister

```

> deploy:prod:with:cycles

Description: Creates the canister on the Internet Computer network with a specified number of cycles.

Command:

```bash

dfx  canister  --network  ic  create $canister --with-cycles  1000000000000

```

> update:install:frontend

Description: Builds and reinstalls the canister on the Internet Computer network with a reinstallation mode.

Command:

```bash

dfx  build  --network  ic $canister && dfx  canister  --network  ic  install $canister --mode  reinstall

```

> deploy:icrc1

Description: Executes an external script for deploying the canister on the ICRC1 network.

Command:

```bash

PRINCIPAL=$(dfx identity get-principal)  bash  ./scripts/deploy_icrc1.sh

```

> deploy:icrc1:index

Description: Executes an external script for deploying the index on the ICRC1 network.

Command:

```bash

bash  ./scripts/deploy_icrc1_index.sh

```

> mint:to:owner

Description: Executes an external script for creating new tokens.

Command:

```bash

bash  ./scripts/mint.sh

```

> view:account:id

Description: Displays the account ID in the Internet Computer development environment.

Command:

```bash

dfx  ledger  account-id

```

## Obtain cycles

Step-by-Step Guide

1. Purchase ICP on an Exchange

Acquire ICP tokens through a supported exchange platform.

2. Discover Your Account ID

Use the following command to find your account ID:

```bash

dfx  ledger  account-id

```

3. Transfer ICP to Your Account

Transfer ICP from the exchange to your account using the account ID obtained in the previous step.

4. Confirm Transfer

Verify the successful transfer by checking the balance:

```bash

dfx  ledger  --network  ic  balance

```

5. Find Your Principal Identifier

Discover your principal identifier using the following command:

```bash

dfx  identity  get-principal

```

6. Convert ICP to Cycles

Execute the conversion command, replacing <your-principal-identifier> and <icp-tokens>:

```bash

dfx  ledger  --network  ic  create-canister <your-principal-identifier> --amount <icp-tokens>

```

7. Record Canister ID

Take note of the returned canister ID.

8. Deploy Wallet Canister

Deploy a wallet canister using the canister ID obtained in the previous step:

```bash

dfx  identity  --network  ic  deploy-wallet <canister-identifier>

```

9. Discover Your Wallet

Find your wallet using the following command:

```bash

dfx  identity  --network  ic  get-wallet

```

10. Verify Conversion

Ensure the conversion was successful by checking the wallet balance:

```bash

dfx  wallet  --network  ic  balance

```

## Deploy

1.  Set Principal for ICRC1 Canister Deployment:
2.  Run the following command to export the principal for the ICRC1 canister deployment:

        export PRINCIPAL=$(dfx identity get-principal)

3.  This ensures that the subsequent script knows which principal to use.
4.  Execute the script deploy_icrc1.sh located in the "scripts" folder.
5.  You have now deployed the ICRC1 canister.
6.  Deploy ICRC1_Index Canister for Transaction List:
7.  Obtain the canister ID of the recently deployed ICRC1 canister.
8.  Navigate to the script deploy_icrc1_index.sh and replace the canister ID with the obtained value
9.  Run the script.
10. Successful Deployment of ICRC1_Index Canister:
11. You have now deployed the ICRC1_Index canister for managing the transaction list.
12. Deploy the Frontend:
13. Execute the command below to deploy the frontend:


    dfx deploy --network="ic"

Congratulations! You have successfully deployed the ICRC1 canister, its corresponding transaction list canister (ICRC1_Index), and the frontend on the Internet Computer network.
