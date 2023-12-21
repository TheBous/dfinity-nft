dfx canister --network local call thebous icrc1_transfer '
  (record {
    to=(record {
      owner=(principal "m2glu-q2anu-ycce7-hasir-5xmlx-pknsz-ypqja-ladug-csn6t-nysnc-vqe")
    });
    amount=100_000
  })
'