dfx canister --network ic call thebous icrc1_transfer '
  (record {
    to=(record {
      owner=(principal "b53ip-bdbzc-vzpjg-bh4qc-tbxyb-ijgmm-syldq-gcxqh-ptpyt-fwua2-zae")
    });
    amount=1_000_000
  })
'