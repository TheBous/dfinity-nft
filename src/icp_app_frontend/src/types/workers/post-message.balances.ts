import type { PostMessageData, PostMessageDataActor } from './post-messages'

export interface PostMessageDataRequestBalance extends PostMessageDataActor {
	accountIdentifier: string
	ledgerCanisterId: string
	certified: boolean
	host?: string
}

export interface PostMessageDataResponseBalances extends PostMessageData {
	balances: PostMessageDataResponseBalance[]
}

export type PostMessageDataResponseBalance = {
	accountIdentifier: string
	balance: bigint
}
