dfx deploy --network="ic" thebous --argument '
  (variant {
    Init = record {
      token_name = "thebous";
      token_symbol = "THB";
      minting_account = record {
        owner = principal "'${PRINCIPAL}'";
      };
      initial_balances = vec {
        record {
          record {
            owner = principal "'${PRINCIPAL}'";
          };
          1_000_000_000;
        };
      };
      metadata = vec {};
      transfer_fee = 10_000;
      archive_options = record {
        trigger_threshold = 2000;
        num_blocks_to_archive = 1000;
        controller_id = principal "'${PRINCIPAL}'";
      };
    }
  })
'