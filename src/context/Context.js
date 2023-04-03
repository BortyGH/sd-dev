import { createContext } from "react";

const initialState = {
    appState: {},
    setState: () => {},
};

export const GlobalContext = createContext(initialState);


export const ContextProvider = ({initialState, children}) => {

    const value = {initialState};

    return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}


