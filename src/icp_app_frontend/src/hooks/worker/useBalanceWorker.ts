import type { PostMessage } from '../../types/workers/post-messages'
import type {
	PostMessageDataRequestBalance,
	PostMessageDataResponseBalance,
} from '../../types/workers/post-message.balances'
import type { PostMessageDataResponseSync } from '../../types/workers/post-message.sync'
import { useEffect, useState } from 'react'
import { useAuth } from '../auth/useAuth'
import getIcrc1Balance from '../../utils/dfinity/icrc1/methods/getBalance'

export type BalancesCallback = (data: PostMessageDataResponseBalance) => void

const balanceWorker = new Worker(new URL('../../workers/balance/balance.worker', import.meta.url))
let balanceCallback: BalancesCallback | undefined

const useBalanceWorker = (initialFetch = false) => {
	const { identity } = useAuth()
	const [balance, setBalance] = useState(BigInt(0))

	useEffect(() => {
		const getBalance = async () => {
			const data = {
				ledgerCanisterId: process.env.CANISTER_ID_THEBOUS,
				certified: false,
			}
			const _balance = await getIcrc1Balance({
				identity,
				data,
			})
			setBalance(_balance)
		}

		if (identity && initialFetch) getBalance()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [identity])

	useEffect(() => {
		balanceWorker.onmessage = async ({
			data,
		}: MessageEvent<PostMessage<PostMessageDataResponseBalance | PostMessageDataResponseSync>>) => {
			const { msg } = data

			switch (msg) {
				case 'syncBalance':
					balanceCallback?.(data.data as PostMessageDataResponseBalance)
					return
				case 'syncStatus':
					console.warn('syncStatus')
					return
				case 'syncErrorBalance':
					console.warn('syncErrorBalance')
					return
			}
		}
		return () => (balanceWorker.onmessage = null)
	}, [])

	return {
		startBalancesTimer: ({
			callback,
			...rest
		}: {
			callback: BalancesCallback
		} & Omit<PostMessageDataRequestBalance, 'fetchRootKey'>) => {
			balanceCallback = callback

			balanceWorker.postMessage({
				msg: 'nnsStartBalancesTimer',
				data: { ...rest },
			})
		},
		stopBalancesTimer: () => {
			balanceCallback = undefined
			balanceWorker.postMessage({
				msg: 'nnsStopBalancesTimer',
			})
		},
		balance,
		setBalance,
	}
}

export default useBalanceWorker
