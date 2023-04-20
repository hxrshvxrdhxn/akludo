import { createContext, useState,useContext, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const [ps,setps] =useState(false);

    return (
        <AuthContext.Provider value={{ auth, setAuth,ps,setps }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const {auth,setAuth,ps,setps}=useContext(AuthContext);
    console.log(auth,ps);
    return useContext(AuthContext);
}

export default useAuth;