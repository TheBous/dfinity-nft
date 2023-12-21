const nowInBigIntNanoSeconds = (): bigint =>
    BigInt(Date.now()) * BigInt(1e6);

export default nowInBigIntNanoSeconds;
