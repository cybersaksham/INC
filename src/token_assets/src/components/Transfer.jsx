import React from "react";
import { useState } from "react";
import { Principal } from "@dfinity/principal";
import { token, canisterId, createActor } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";

function Transfer() {
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [statusText, setStatusText] = useState("");

  async function handleClick() {
    setIsDisabled(true);

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    setStatusText("");
    try {
      // const result = await authenticatedCanister.firstBonus();
      const result = await token.transfer(Number(amount), Principal.fromText(toAccount));
      setStatusText(result);
    } catch (err) {
      console.log(err);
      setStatusText("Enter valid ID and amount");
    }
    setIsDisabled(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={toAccount}
                onChange={(e) => setToAccount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" disabled={isDisabled} onClick={handleClick}>
            Transfer
          </button>
        </p>
      </div>
      {statusText == "" ? <></> : <p>{statusText}</p>}
    </div>
  );
}

export default Transfer;
