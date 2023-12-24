import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/auth/useAuth'
import humanReadableDate from '../../utils/date/humanReadableDate'
import convertNanoSecondsToDate from '../../utils/date/convertNanoSecondsToDate'
import type { TransactionWithId } from '@dfinity/ledger-icrc/dist/candid/icrc_index'
import getIcrc1IndexTransactions from '../../utils/dfinity/icrc1_index/getIdentityTransactions'

const Transactions = () => {
	const [txs, setTxs] = useState<TransactionWithId[]>([])
	const [isAccordionOpened, setIsAccordionOpened] = useState(false)

	const { identity } = useAuth()

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
	if (!identity) return null
	return (
		<div className="collapse collapse-arrow bg-base-200 w-96 mt-5" onClick={() => setIsAccordionOpened(!isAccordionOpened)}>
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
	)
}

export default Transactions
