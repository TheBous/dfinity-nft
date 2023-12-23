import { Identity } from '@dfinity/agent'
import type {
	PostMessageDataRequestBalance,
	PostMessageDataResponseBalance,
} from '../../types/workers/post-message.balances'
import type { PostMessage } from '../../types/workers/post-messages'
import { TimerWorker } from '../../utils/workers/timer.worker'
import getIcrc1Balance from '../../utils/dfinity/icrc1/methods/getBalance'

export interface TimerWorkerUtilsSyncParams {
	identity: Identity
}

type TimerWorkerUtilsJobData<T> = {
	data: T
} & TimerWorkerUtilsSyncParams

const worker = new TimerWorker()
const SYNC_ACCOUNTS_TIMER_INTERVAL_MILLIS = 5 * 1000 // 30 seconds in milliseconds

const emitBalances = (postMessageResponse: PostMessageDataResponseBalance) => {
	const data: PostMessageDataResponseBalance = { ...postMessageResponse }

	worker.postMsg({
		msg: 'syncBalance',
		data,
	})
}

const syncBalances = async (params: TimerWorkerUtilsJobData<PostMessageDataRequestBalance>) => {
	try {
		const queries = await getIcrc1Balance({
			...params,
		})

		emitBalances({ accountIdentifier: params.identity.getPrincipal().toString(), balance: queries })
	} catch (err: unknown) {
		worker.postMsg({
			msg: 'syncErrorBalance',
			data: err,
		})

		throw err
	}
}

onmessage = async ({ data: dataMsg }: MessageEvent<PostMessage<PostMessageDataRequestBalance>>) => {
	const { msg, data } = dataMsg

	switch (msg) {
		case 'nnsStopBalancesTimer':
			worker.stop()
			return
		case 'nnsStartBalancesTimer':
			await worker.start<PostMessageDataRequestBalance>({
				interval: SYNC_ACCOUNTS_TIMER_INTERVAL_MILLIS,
				job: syncBalances,
				data,
			})
			return
	}
}
