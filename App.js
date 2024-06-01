
import { PaperProvider } from "react-native-paper";
import React, { useEffect, useMemo, useState } from "react";

import Auth from "./src/screens/Auth";
import AuthContext from "./src/components/context/AuthContext";
import { getTokenApi, removeTokenApi, setTokenApi } from "./src/api/token";
import Dashboard from "./src/components/Home/DashBoard";
import { jwtDecode } from "jwt-decode";
import Logout from "./src/components/Auth/Logout";

export default function App() {
  const [auth, setAuth] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      const token = await getTokenApi();
      if (token) {
        setAuth({
          token,
          idUser: jwtDecode(token),
        });
        console.log("Logged");
        console.log(token);
        console.log(jwtDecode(token));
      }
    }
    fetchData();

    setAuth(null);
  }, []);

  const login = (user) => {
    console.log("LOGGING IN");
    console.log(user);
    setTokenApi(user.jwt);
    setAuth({
      token: user.jwt,
      idUser: user.user._id,
    });
  };

  const logout = () => {
    if (auth) {
      removeTokenApi();
      setAuth(null);
    }
  };

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
    }),
    [auth]
  );

  if (auth === undefined) return null;

  console.log("Rendering App with auth:", auth);

  return (
    <AuthContext.Provider value={authData}>
      {authData.auth && <Logout authData={authData} />}
      <PaperProvider>
        {authData.auth ? <Dashboard /> : <Auth />}
      </PaperProvider>
    </AuthContext.Provider>
  );
}