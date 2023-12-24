import { create } from 'zustand'

export interface BalanceStoreData {
    balance: bigint
    setBalance: (balance: bigint) => void
}

export const useBalanceStore = create<BalanceStoreData>(set => ({
    balance: BigInt(0),
    setBalance: (balance: bigint) => set(() => ({ balance })),
}))

export default useBalanceStore
