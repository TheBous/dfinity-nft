import { Agent, Identity } from '@dfinity/agent'
import { IcrcLedgerCanister } from '@dfinity/ledger-icrc'
import { Principal } from '@dfinity/principal'
import { createAgentWrapper } from '../agent'
import isTestnet from '../utils/isTestnet'

interface Icrc1Canister {
	identity: Identity
	canisterId: Principal
	host?: string
}

export const createIcrcCanister = async ({
	identity,
	canisterId,
	host,
}: Icrc1Canister): Promise<{
	canister: IcrcLedgerCanister
	agent: Agent
}> => {
	const agent = await createAgentWrapper({
		identity,
		host,
	});

	if (isTestnet()) await agent.fetchRootKey();

	const canister = IcrcLedgerCanister.create({
		agent,
		canisterId,
	})

	return {
		canister,
		agent,
	}
}
