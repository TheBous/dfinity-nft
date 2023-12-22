# Commands

deploy:ic

Description: Deploys the specified canister to the Internet Computer network.
Command: dfx deploy --network=ic
generate

Description: Generates necessary files for the specified canister.
Command: dfx generate $canister
canister:status

Description: Displays the status of all canisters.
Command: dfx canister status --all
canister:stop:all

Description: Stops all running canisters.
Command: dfx canister stop --all
canister:delete:all

Description: Deletes all canisters.
Command: dfx canister delete --all
canister:deploy

Description: Deploys all canisters.
Command: dfx deploy
start:ic

Description: Starts the Internet Computer development environment in the background with cleanup.
Command: dfx start --background --clean
prepare

Description: Installs Husky, a tool for Git hooking.
Command: husky install
deploy:prod

Description: Creates, builds, and installs the canister on the Internet Computer network.
Command: dfx canister --network ic create $canister && dfx build --network ic $canister && dfx canister --network ic install $canister
deploy:prod:with:cycles

Description: Creates the canister on the Internet Computer network with a specified number of cycles.
Command: dfx canister --network ic create $canister --with-cycles 1000000000000
update:install:frontend

Description: Builds and reinstalls the canister on the Internet Computer network with a reinstallation mode.
Command: dfx build --network ic $canister && dfx canister --network ic install $canister --mode reinstall
deploy:icrc1

Description: Executes an external script for deploying the canister on the ICRC1 network.
Command: PRINCIPAL=$(dfx identity get-principal) bash ./scripts/deploy_icrc1.sh
deploy:icrc1:index

Description: Executes an external script for deploying the index on the ICRC1 network.
Command: bash ./scripts/deploy_icrc1_index.sh
mint:to:owner

Description: Executes an external script for creating new tokens.
Command: bash ./scripts/mint.sh
view:account:id

Description: Displays the account ID in the Internet Computer development environment.
Command: dfx ledger account-id


## Obtain cycles
Purchase ICP on an exchange.
Discover your account ID on DFINITY Canister SDK (dfx) using the command: dfx ledger account-id.
Transfer ICP to your account ID from the exchange.
Confirm the transfer by checking the balance with the command: dfx ledger --network ic balance.
Find your principal identifier using the command: dfx identity get-principal.
Convert ICP to cycles using the following command, replacing <your-principal-identifier> and <icp-tokens> with your principal identifier and ICP value: dfx ledger --network ic create-canister <your-principal-identifier> --amount <icp-tokens>.
Take note of the returned canister ID and use it in the next command to create a wallet canister.
Deploy a wallet canister using the command: dfx identity --network ic deploy-wallet <canister-identifier>.
Discover your wallet using the following command: dfx identity --network ic get-wallet.
Verify the success of the conversion by checking the wallet balance with the command: dfx wallet --network ic balance.
Step-by-Step Guide
1. Purchase ICP on an Exchange
Acquire ICP tokens through a supported exchange platform.

2. Discover Your Account ID
Use the following command to find your account ID:

```bash
dfx ledger account-id
```
3. Transfer ICP to Your Account
Transfer ICP from the exchange to your account using the account ID obtained in the previous step.

4. Confirm Transfer
Verify the successful transfer by checking the balance:

```bash
dfx ledger --network ic balance
```
5. Find Your Principal Identifier
Discover your principal identifier using the following command:

```bash
dfx identity get-principal
```
6. Convert ICP to Cycles
Execute the conversion command, replacing <your-principal-identifier> and <icp-tokens>:

```bash
dfx ledger --network ic create-canister <your-principal-identifier> --amount <icp-tokens>
```
7. Record Canister ID
Take note of the returned canister ID.

8. Deploy Wallet Canister
Deploy a wallet canister using the canister ID obtained in the previous step:

```bash
dfx identity --network ic deploy-wallet <canister-identifier>
```
9. Discover Your Wallet
Find your wallet using the following command:

```bash
dfx identity --network ic get-wallet
```
10. Verify Conversion
Ensure the conversion was successful by checking the wallet balance:

```bash
dfx wallet --network ic balance
```
Conclusion