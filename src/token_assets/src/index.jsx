import ReactDOM from "react-dom";
import React from "react";
import App from "./components/App";
import { AuthClient } from "@dfinity/auth-client";

const init = async () => {
  const authClient = await AuthClient.create();

  if (authClient.isAuthenticated()) {
    handleAuthenticated();
  } else {
    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: handleAuthenticated,
    });
  }
};

const handleAuthenticated = async () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

init();
