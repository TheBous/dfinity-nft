const convertNanoSecondsToDate = (nanoSeconds: bigint | number) => {
  const milliseconds = BigInt(nanoSeconds) / BigInt(1000000);
  const roundedMilliseconds = milliseconds / BigInt(1); // This performs a flooring operation
  return new Date(Number(roundedMilliseconds));
}

export default convertNanoSecondsToDate;