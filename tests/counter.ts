import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Counter } from '../target/types/counter';

describe('counter', () => {
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Counter as Program<Counter>;
  const counterAccount = anchor.web3.Keypair.generate();
  it('Is initialized!', async () => {
    await program.rpc.create({
      accounts: {
        counterAccount: counterAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [counterAccount],
    } as any);
  });
  it('Increment counter', async () => {
    await program.rpc.increment({
      accounts: {
        counterAccount: counterAccount.publicKey,
      },
    } as any);
  });
  it('Fetch account', async () => {
    const account: any = await program.account.counterAccount.fetch(
      counterAccount.publicKey
    );
    console.log('account.count==>', account.count);
  });
});
