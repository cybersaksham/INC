import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'balanceOf' : (arg_0: Principal) => Promise<bigint>,
  'firstBonus' : () => Promise<string>,
  'getBonus' : () => Promise<bigint>,
  'getName' : () => Promise<string>,
  'getSymbol' : () => Promise<string>,
  'transfer' : (arg_0: bigint, arg_1: Principal) => Promise<string>,
}
