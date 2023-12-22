import { Agent, Identity } from '@dfinity/agent'
import { IcrcIndexCanister } from '@dfinity/ledger-icrc'
import { Principal } from '@dfinity/principal'
import { createAgentWrapper } from '../agent'
import isTestnet from '../utils/isTestnet'

interface Icrc1IndexCanister {
	identity: Identity
	canisterId: Principal
	host?: string
}

export const createIcrc1IndexCanister = async ({
	identity,
	canisterId,
	host,
}: Icrc1IndexCanister): Promise<{
	canister: IcrcIndexCanister
	agent: Agent
}> => {
	const agent = await createAgentWrapper({
		identity,
		host,
	})

	if (isTestnet()) await agent.fetchRootKey()

	const canister = IcrcIndexCanister.create({
		agent,
		canisterId,
	})

	return {
		canister,
		agent,
	}
}
