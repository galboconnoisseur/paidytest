import { useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";

/* 
  I made this into a hook so it could potentially be used
  on other authenticated pages
*/
const useAuthentication = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const authenticateUser = async (navigation) => {
    setIsAuthenticating(true);
    const hasBiometrics = await LocalAuthentication.hasHardwareAsync();

    if (hasBiometrics) {
      const { success } = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to access the application",
      });

      if (success) {
        // User is authenticated
        setIsAuthenticating(false);
        return;
      } else {
        // Authentication failed
        navigation.navigate("Home");
      }
    } else {
      // Biometrics not available
      navigation.navigate("Home");
    }
  };

  return { isAuthenticating, authenticateUser };
};

export default useAuthentication;
