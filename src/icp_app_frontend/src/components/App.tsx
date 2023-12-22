import React, { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'
import dfinity from '../../assets/images/dfinity.jpg'
import { useAuth } from '../hooks/auth/useAuth'
import getIcrc1Balance from '../utils/dfinity/icrc1/methods/getBalance'
import executeIcrcTransfer from '../utils/dfinity/icrc1/methods/transfer'
import { decodeIcrcAccount } from '@dfinity/ledger-icrc'
import { transactionFee } from '../utils/dfinity/icrc1/methods/fees'
import getIcrc1IndexTransactions from '../utils/dfinity/icrc1_index/getIdentityTransactions'
import { TransactionWithId } from '@dfinity/ledger-icrc/dist/candid/icrc_index'
import convertNanoSecondsToDate from '../utils/date/convertNanoSecondsToDate'
import humanReadableDate from '../utils/date/humanReadableDate'

const App = () => {
	const { identity, internetIdentitySync, internetIdentityLogin, internetIdentityLogout } = useAuth()
	const [balance, setBalance] = useState(BigInt(0))
	const [address, setAddress] = useState('')
	const [amount, setAmount] = useState(BigInt(0))
	const [txs, setTxs] = useState<TransactionWithId[]>([])
	const [isAccordionOpened, setIsAccordionOpened] = useState(false)

	useEffect(() => {
		internetIdentitySync()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

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

		if (identity) getBalance()
	}, [identity])

	useEffect(() => {
		const getTxs = async () => {
			if (identity?.getPrincipal()) {
				const data = {
					ledgerCanisterId: process.env.CANISTER_ID_THEBOUS_INDEX,
					maxResults: BigInt(2),
				}
				const _identityTransactions = await getIcrc1IndexTransactions({
					identity,
					data,
				})

				console.log('here', _identityTransactions)
				setTxs(_identityTransactions.transactions)
			}
		}

		getTxs()
	}, [identity])

	const showSendModal = () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		document.getElementById('send_modal').showModal()
	}

	const showReceiveModal = () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		document.getElementById('receive_modal').showModal()
	}

	const transfer = async () => {
		try {
			const fees = await transactionFee({ identity, certified: true, canisterId: process.env.CANISTER_ID_THEBOUS })
			await executeIcrcTransfer({
				identity,
				canisterId: process.env.CANISTER_ID_THEBOUS,
				to: decodeIcrcAccount(address),
				amount,
				fee: fees,
			})
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="w-screen h-screen flex flex-col justify-center items-center">
			{!!identity && (
				<div className="badge badge-primary absolute top-3 right-2 h-10">{identity?.getPrincipal()?.toText()}</div>
			)}
			<div className="card w-96 bg-base-100 shadow-xl">
				<figure>
					<img loading="lazy" src={dfinity} alt="dfinity" />
				</figure>
				<div className="card-body">
					<h2 className="card-title">
						dfinity ICRC2!
						<div className="badge badge-secondary">NEW</div>
					</h2>
					{!identity && <p>Join the best dfinity ICRC2 community!</p>}
					{!!identity && (
						<p>
							<span>thebous amount: </span>
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-purple-900">
								{balance.toString()}
							</span>
							<span> THB</span>
						</p>
					)}
					<div className="card-actions justify-end">
						{!identity && (
							<button onClick={internetIdentityLogin} className="btn btn-primary">
								Login
							</button>
						)}
						{!!identity && (
							<div className="flex gap-2">
								<button onClick={internetIdentityLogout} className="btn btn-secondary">
									Logout
								</button>
								<button
									onClick={showSendModal}
									// disabled={balance <= BigInt(0)}
									className="btn btn-primary"
								>
									Send
								</button>
								<button onClick={showReceiveModal} className="btn btn-tertiary">
									Receive
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
			{!!identity && (
				<div
					className="collapse collapse-arrow bg-base-200 w-96"
					onClick={() => setIsAccordionOpened(!isAccordionOpened)}
				>
					<input type="radio" name="my-accordion-2" checked={isAccordionOpened} />
					<div className="collapse-title text-xl font-medium">Transactions</div>
					<div className="collapse-content">
						{txs.map(tx => {
							return (
								<div key={tx.id}>
									<span className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-purple-900">
										{tx.transaction.kind}
									</span>
									<p className="text-sm">{humanReadableDate(convertNanoSecondsToDate(tx.transaction.timestamp))}</p>
								</div>
							)
						})}
					</div>
				</div>
			)}
			<dialog id="send_modal" className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Send</h3>
					<p className="py-4">Insert the amount you wanna send!</p>
					<input
						onChange={e => setAmount(BigInt(e?.target?.value))}
						type="number"
						placeholder="Inser amount"
						className="input input-bordered w-full"
					/>
					<input
						onChange={e => setAddress(e?.target?.value ?? '')}
						type="string"
						placeholder="Insert receiver"
						className="input input-bordered w-full my-5"
					/>
					<div className="modal-action">
						<button onClick={transfer} className="btn btn-primary">
							Send
						</button>
						<form method="dialog">
							<button className="btn btn-secondary">Close</button>
						</form>
					</div>
				</div>
			</dialog>
			<dialog id="receive_modal" className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Receive</h3>
					<span>{identity?.getPrincipal()?.toText()}</span>
					<QRCode
						style={{
							borderRadius: 5,
							marginRight: 'auto',
							marginLeft: 'auto',
							marginTop: 10,
						}}
						value={identity?.getPrincipal()?.toText() ?? ''}
					/>
					<div className="modal-action">
						<form method="dialog">
							<button className="btn btn-primary">Close</button>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	)
}

export default App
