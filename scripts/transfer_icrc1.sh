dfx canister --network ic call thebous icrc1_transfer '
  (record {
    to=(record {
      owner=(principal "eh6lv-7744i-zuer7-2dwaq-6uzco-fkxry-xga4a-5duxu-34w2t-kzixx-bae")
    });
    amount=1_000_000
  })
'