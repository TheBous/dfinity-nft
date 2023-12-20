// const getIcrc1Balance = ({
//     identity,
//     data: { accountIdentifiers, ledgerCanisterId, ...rest },
//     certified,
// }: TimerWorkerUtilsJobData<PostMessageDataRequestBalances> & {
//     certified: boolean;
// }): Promise<GetAccountsBalanceData[]> => {
//     return Promise.all(
//         accountIdentifiers.map(async (accountIdentifier) => {
//             const balance = await getIcrcBalance({
//                 ledgerCanisterId,
//                 identity,
//                 account: decodeIcrcAccount(accountIdentifier),
//                 certified,
//                 ...rest,
//             });

//             return {
//                 balance,
//                 key: accountIdentifier,
//                 certified,
//             };
//         })
//     );
// }



// export default getIcrc1Balance;