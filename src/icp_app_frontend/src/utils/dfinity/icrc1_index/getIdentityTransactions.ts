import { Identity } from '@dfinity/agent'
import { IcrcTxId } from '@dfinity/ledger-icrc'
import mapCanisterId from '../mapCanisterId'
import { createIcrc1IndexCanister } from './icrc_index'
import { GetTransactions } from '@dfinity/ledger-icrc/dist/candid/icrc_index'
import getSubAccountFromIdentity from '../icrc1/methods/getSubAccountFromIdentity'

interface getIcrc1IndexTransactions {
	identity: Identity
	data: {
		ledgerCanisterId: string
		maxResults: bigint
		start?: IcrcTxId
	}
}

const getIcrc1IndexTransactions = async ({
	identity,
	data: { ledgerCanisterId, maxResults = BigInt(0), start },
}: getIcrc1IndexTransactions): Promise<GetTransactions> => {
	const { canister: { getTransactions } = {} } = await createIcrc1IndexCanister({
		identity,
		canisterId: mapCanisterId(ledgerCanisterId),
	})

	const { account } = await getSubAccountFromIdentity(identity);
	const transactions = await getTransactions({ max_results: maxResults, start, account })

	return transactions
}

export default getIcrc1IndexTransactions
