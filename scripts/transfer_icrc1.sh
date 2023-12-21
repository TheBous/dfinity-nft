dfx canister --network local call thebous icrc1_transfer '
  (record {
    to=(record {
      owner=(principal "v5mav-3nfum-ucfol-4lpoo-eqxqb-m65e6-xtkcs-zcyi5-cewpa-hixr7-vqe")
    });
    amount=100_000
  })
'