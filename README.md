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
