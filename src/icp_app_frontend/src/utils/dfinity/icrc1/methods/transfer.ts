import { IcrcAccount, IcrcBlockIndex, decodeIcrcAccount } from '@dfinity/ledger-icrc'
import { Identity } from '@dfinity/agent'
import { arrayOfNumberToUint8Array, nonNullish } from '@dfinity/utils'
import nowInBigIntNanoSeconds from '../../../date/nowInBigIntNanoSeconds'
import { createIcrcCanister } from '../icrc1'
import mapCanisterId from '../../mapCanisterId'
import getSubAccountFromIdentity from './getSubAccountFromIdentity'

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
	const { canister: { transfer: transferApi } } = await createIcrcCanister({ identity, canisterId: mapCanisterId(canisterId) });
	const chosenFromSubAccount = nonNullish(fromSubAccount) ? arrayOfNumberToUint8Array(fromSubAccount) : (await getSubAccountFromIdentity(identity))?.account?.subaccount;

	const chosenToSubAccount = nonNullish(subaccount) ? subaccount : new Uint8Array(Array(32).fill(0));
	const chosenTo = decodeIcrcAccount(`${owner}.${chosenToSubAccount}`);

	return transferApi({
		to: {
			owner: chosenTo.owner,
			subaccount: [chosenTo.subaccount],
		},
		created_at_time: createdAt ?? nowInBigIntNanoSeconds(),
		from_subaccount: chosenFromSubAccount,
		...rest,
	})
}

export default executeIcrcTransfer
