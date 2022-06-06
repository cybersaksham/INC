export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'balanceOf' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'firstBonus' : IDL.Func([], [IDL.Text], []),
    'getName' : IDL.Func([], [IDL.Text], ['query']),
    'getSymbol' : IDL.Func([], [IDL.Text], ['query']),
    'transfer' : IDL.Func([IDL.Nat, IDL.Principal], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
