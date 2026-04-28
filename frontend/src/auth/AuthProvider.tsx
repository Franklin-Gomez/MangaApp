import { createContext, useContext, useState } from "react";

type AuthContextType = {
  user?: any | null;
  token: string | null;
  login: (data: { token: string; user?: any }) => void;
  logout: () => void;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: AuthProviderProps ) {
  const [user, setUser] = useState<any | null>(null);
  const [ token , setToken ] = useState<string | null>(null);


  const login = ( data : { token: string  , user? : any } ) => {
    localStorage.setItem("token", data.token);
    setToken(data.token);
    setUser(data.user ?? null); 
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token ,  login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// export const useAuth = () => useContext(AuthContext);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  return context;
};

