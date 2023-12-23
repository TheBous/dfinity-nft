import { useEffect, useRef, useState } from 'react'
import logWithTimestamp from '../../utils/date/logWithTimestamp'

interface WorkerMessage {
	type: string
	payload?: MessageEvent
}

const useWebWorker = (workerScript: URL) => {
	const [worker, setWorker] = useState<Worker | null>(null)
	const [messageFromWorker, setMessageFromWorker] = useState<MessageEvent>(null)

	const workerRef = useRef<Worker | null>(null)

	useEffect(() => {
		const newWorker = new Worker(workerScript)
		workerRef.current = newWorker
		setWorker(newWorker)

		const handleMessage = (event: MessageEvent) => {
			const { data } = event
			logWithTimestamp(data)
			setMessageFromWorker(data)
		}

		newWorker.addEventListener('message', handleMessage)

		return () => {
			newWorker.removeEventListener('message', handleMessage)
			newWorker.terminate()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const postMessageToWorker = (message: WorkerMessage) => {
		if (workerRef.current) {
			console.warn('post', message)
			workerRef.current.postMessage(message)
		}
	}

	return { worker, messageFromWorker, postMessageToWorker }
}

export default useWebWorker
