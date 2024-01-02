import { IcrcAccount, IcrcBlockIndex } from '@dfinity/ledger-icrc'
import { Identity } from '@dfinity/agent'
import { arrayOfNumberToUint8Array, nonNullish, toNullable } from '@dfinity/utils'
import nowInBigIntNanoSeconds from '../../../date/nowInBigIntNanoSeconds'
import { createIcrcCanister } from '../icrc1'
import mapCanisterId from '../../mapCanisterId'

export type SubAccountArray = Array<number>
export interface IcrcTransferParams {
	identity: Identity
	canisterId: string
	to: IcrcAccount
	amount: bigint
	memo?: Uint8Array
	fromSubAccount?: SubAccountArray
	createdAt?: bigint
	fee: bigint
}

export const executeIcrcTransfer = async ({
	identity,
	canisterId,
	to: { owner, subaccount },
	fromSubAccount,
	createdAt,
	...rest
}: IcrcTransferParams): Promise<IcrcBlockIndex> => {
	const {
		canister: { transfer: transferApi },
	} = await createIcrcCanister({ identity, canisterId: mapCanisterId(canisterId) })

	return transferApi({
		to: {
			owner,
			subaccount: toNullable(subaccount),
		},
		created_at_time: createdAt ?? nowInBigIntNanoSeconds(),
		from_subaccount: nonNullish(fromSubAccount) ? arrayOfNumberToUint8Array(fromSubAccount) : undefined,
		...rest,
	})
}

export default executeIcrcTransfer
