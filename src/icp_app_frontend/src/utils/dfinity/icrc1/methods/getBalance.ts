import { Identity } from '@dfinity/agent'
import { createIcrcCanister } from '../icrc1'
import mapCanisterId from '../../mapCanisterId'
import getSubAccountFromIdentity from './getSubAccountFromIdentity'
import logWithTimestamp from '../../../date/logWithTimestamp'

interface GetIcrc1Balance {
	identity: Identity
	data: {
		ledgerCanisterId: string
		certified?: boolean
	}
}

const getIcrc1Balance = async ({
	identity,
	data: { ledgerCanisterId, certified = false },
}: GetIcrc1Balance): Promise<bigint> => {
	logWithTimestamp(`Get icrc balance...`)
	const { account } = await getSubAccountFromIdentity(identity);
	const { canister: { balance: getBalance } = {} } = await createIcrcCanister({
		identity,
		canisterId: mapCanisterId(ledgerCanisterId),
	})

	const balance = await getBalance({ certified, ...account })

	logWithTimestamp(`Getting icrc balance complete.`)
	return balance
}

export default getIcrc1Balance
