/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect, PropsWithChildren, FC} from "react";
import {
  LoginRequest,
  LogoutRequest,
  RegisterRequest,
  verifyTokenRequest,
} from "../api/auth";
import Cookies from "js-cookie";
import { User, UserAuth } from "../types";

interface ContextAuth {
  user: User | null;
  isAuth: boolean;
  errors: string[];
  loading: boolean;
  signIn: (values: UserAuth) => void;
  signUp: (values: UserAuth) => void;
  logout: () => void;
}

export const AuthContext = createContext<ContextAuth | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const signIn = async (values: UserAuth) => {
    try {
      const res = await LoginRequest(values);
      setUser(res.data);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
      setErrors(["Ocurrio un error al hacer la petiion"]);
    }
  };

  const signUp = async (values: UserAuth) => {
    try {
      console.log(values);
      const res = await RegisterRequest(values);
      setUser(res.data);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
      setErrors(["Ocurrio un error al hacer la petiion"]);
    }
  };

  const logout = async () => {
    try {
      await LogoutRequest();
      setUser(null);
      setIsAuth(false);
    } catch (error) {
      console.log(error);
      setErrors(["Ocurrio un error al hacer la petiion"]);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const time = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(time);
    }
  }, [errors]);

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuth(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest();
        if (!res.data) return setIsAuth(false);
        setIsAuth(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error)
        setErrors(["Ocurrio en error al hacer la peticion"])
        setIsAuth(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        errors,
        loading,
        signIn,
        signUp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// AuthProvider.propTypes = {
//   children: PropTypes.node,
// };
