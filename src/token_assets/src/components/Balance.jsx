import React from "react";
import { useState } from "react";
import { Principal } from "@dfinity/principal";
import { token } from "../../../declarations/token";

function Balance() {
  const [principalID, setPrincipalID] = useState("");
  const [amount, setAmount] = useState("");
  const [symbol, setSymbol] = useState("");
  const [isError, setIsError] = useState(false);

  async function handleClick() {
    try {
      const principal = Principal.fromText(principalID);
      let balance = await token.balanceOf(principal);
      setIsError(false);
      setAmount(balance.toLocaleString());
      setSymbol(await token.getSymbol());
    } catch {
      setAmount("");
      setIsError(true);
    }
  }

  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={principalID}
          onChange={(e) => setPrincipalID(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button id="btn-request-balance" onClick={handleClick}>
          Check Balance
        </button>
      </p>
      {amount == "" ? (
        <></>
      ) : (
        <p>
          This account has a balance of {amount} {symbol}.
        </p>
      )}
      {isError ? (
        <p style={{ color: "red" }}>Enter correct principal ID.</p>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Balance;
