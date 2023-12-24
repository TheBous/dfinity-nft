import { AuthClient } from '@dfinity/auth-client'
import { PostMessage, PostMessageData } from '../../types/workers/post-messages'
import createAuthClient from '../../utils/auth/createAuthClient'

let timer: NodeJS.Timeout | undefined = undefined

onmessage = ({ data }: MessageEvent<PostMessage<PostMessageData>>) => {
	const { msg } = data

	switch (msg) {
		case 'nnsStartIdleTimer':
			startIdleTimer()
			return
		case 'nnsStopIdleTimer':
			stopIdleTimer()
			return
	}
}

export const startIdleTimer = () => (timer = setInterval(async () => await onIdleSignOut(), 1000))

const onIdleSignOut = async () => {
	const auth = await checkAuthentication()
	if (!auth) logout()
}

const checkAuthentication = async (): Promise<boolean> => {
	const authClient: AuthClient = await createAuthClient()
	return authClient.isAuthenticated()
}

const logout = () => {
	stopIdleTimer()
	postMessage({ msg: 'nnsSignOut' })
}

export const stopIdleTimer = () => {
	if (!timer) return
	clearInterval(timer)
	timer = undefined
}
