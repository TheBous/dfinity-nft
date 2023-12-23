import { Identity } from '@dfinity/agent'
import { createIcrcCanister } from '../icrc1'
import logWithTimestamp from '../../../date/logWithTimestamp'
import mapCanisterId from '../../mapCanisterId'

export const transactionFee = async ({
	identity,
	canisterId,
	certified = false,
}: {
	identity: Identity
	canisterId: string
	certified?: boolean
}): Promise<bigint> => {
	logWithTimestamp(`Getting transaction fee call...`)
	const {
		canister: { transactionFee },
	} = await createIcrcCanister({ identity, canisterId: mapCanisterId(canisterId) })

	const fee = await transactionFee({ certified })
	logWithTimestamp(`Getting transaction fee complete.`)
	return fee
}
