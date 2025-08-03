import React, { createContext, ReactNode, SetStateAction, useContext, useState } from "react";

interface GlobalPropsType {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<GlobalPropsType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    return (
        <GlobalContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn
        }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalContext must be used withing a global provider")
    }
    return context;
}