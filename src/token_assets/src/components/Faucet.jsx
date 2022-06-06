import React from "react";
import { useEffect, useState } from "react";
import { token, canisterId, createActor } from "../../../declarations/token";
// import { AuthClient } from "@dfinity/auth-client";
import { AuthClient } from "../../../../node_modules/@dfinity/auth-client/lib/cjs/index";

function Faucet() {
  const [cryptoName, setCryptoName] = useState("");
  const [cryptoSymbol, setCryptoSymbol] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Give Me!!");

  const getCrypto = async () => {
    setCryptoName(await token.getName());
    setCryptoSymbol(await token.getSymbol());
  };

  useEffect(() => {
    getCrypto();
  }, []);

  async function handleClick(event) {
    setIsDisabled(true);

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    // const result = await authenticatedCanister.firstBonus();
    const result = await token.firstBonus();
    setButtonText(result);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>
        Get your free {cryptoName} ({cryptoSymbol}) tokens here! Claim 10,000{" "}
        {cryptoSymbol} coins to your account on first signup.
      </label>
      <p className="trade-buttons">
        <button id="btn-payout" disabled={isDisabled} onClick={handleClick}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
