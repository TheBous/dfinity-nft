import { Identity } from '@dfinity/agent'
import { IcrcTxId, decodeIcrcAccount } from '@dfinity/ledger-icrc'
import mapCanisterId from '../mapCanisterId'
import { createIcrc1IndexCanister } from './icrc_index'
import { GetTransactions } from '@dfinity/ledger-icrc/dist/candid/icrc_index'

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
	const principal = identity.getPrincipal().toText()
	const { canister: { getTransactions } = {} } = await createIcrc1IndexCanister({
		identity,
		canisterId: mapCanisterId(ledgerCanisterId),
	})

	const account = decodeIcrcAccount(principal)
	const transactions = await getTransactions({ max_results: maxResults, start, account })

	return transactions
}

export default getIcrc1IndexTransactions
