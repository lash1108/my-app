import { Text } from "react-native";
import { PaperProvider } from "react-native-paper";
import React, { useEffect, useMemo, useState } from "react";

import Auth from "./src/screens/Auth";
import AuthContext from "./src/components/context/AuthContext";
import { getData, setTokenApi } from "./src/api/token";
import Dashboard from "./src/components/Home/DashBoard";

export default function App() {
  const [auth, setAuth] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      const token = await getData();
      if (token) {
        console.log(token, "Ya estoy loggeado");
      } else {
        setAuth(null);
      }
    }
    fetchData();
  }, []);

  const login = (user) => {
    console.log("LOGGING IN");
    console.log(user);
    setTokenApi(user.jwt);
    setAuth({
      token: user.jwt,
      idUser: user.id,
    });
  };

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout: () => null,
    }),
    [auth]
  );

  if (auth === undefined) return null;

  console.log("Rendering App with auth:", auth);

  return (
    <AuthContext.Provider value={authData}>
      <PaperProvider>{auth ? <Dashboard /> : <Auth />}</PaperProvider>
    </AuthContext.Provider>
  );
}
