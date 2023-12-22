dfx canister --network local call thebous icrc1_transfer '
  (record {
    to=(record {
      owner=(principal "ml6ci-6ntwf-itf2z-c354m-ipd2p-xm62m-fzxtk-xiyqf-g3jvx-wxm47-2qe")
    });
    amount=1_000_000
  })
'