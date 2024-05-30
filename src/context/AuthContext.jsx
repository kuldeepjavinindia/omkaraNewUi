import { createContext, useReducer, useContext } from 'react';

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
};

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        isAuthenticated: false,
        user: null,
    });

    return (
        <AuthStateContext.Provider value={state}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    );
};

const useAuthState = () => {
    const context = useContext(AuthStateContext);
    if (context === undefined) {
        throw new Error('useAuthState must be used within an AuthProvider');
    }
    return context;
};

const useAuthDispatch = () => {
    const context = useContext(AuthDispatchContext);
    if (context === undefined) {
        throw new Error('useAuthDispatch must be used within an AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuthState, useAuthDispatch };
