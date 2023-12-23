import type { PostMessage } from '../../types/workers/post-messages'
import type {
	PostMessageDataRequestBalance,
	PostMessageDataResponseBalance,
} from '../../types/workers/post-message.balances'
import type { PostMessageDataResponseSync } from '../../types/workers/post-message.sync'
import { useEffect } from 'react'

export type BalancesCallback = (data: PostMessageDataResponseBalance) => void

const balanceWorker = new Worker(new URL('../../workers/balance/balance.worker', import.meta.url))
let balanceCallback: BalancesCallback | undefined

const useBalanceWorker = () => {
	useEffect(() => {
		balanceWorker.onmessage = async ({
			data,
		}: MessageEvent<PostMessage<PostMessageDataResponseBalance | PostMessageDataResponseSync>>) => {
			const { msg } = data

			switch (msg) {
				case 'nnsSyncBalances':
					balanceCallback?.(data.data as PostMessageDataResponseBalance)
					return
				case 'nnsSyncStatus':
					console.warn('nnsSyncStatus')
					return
				case 'nnsSyncErrorBalances':
					console.warn('nnsSyncErrorBalances')
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
	}
}

export default useBalanceWorker
