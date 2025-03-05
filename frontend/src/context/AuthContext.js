import { createContext, useEffect, useReducer } from "react";

// Initial state
const initial_state = {
user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
   loading: false,
   error: null,
};


// Create AuthContext
export const AuthContext = createContext(initial_state);

// Reducer function
const AuthReducer = (state, action) => {
   switch (action.type) {
      case "LOGIN_START":
         return {
            user: null,
            loading: true,
            error: null,
         };
        case 'LOGIN_SUCCESS':  // ✅ Correct spelling
         // Fixed typo
         return {
            user: action.payload,
            loading: false,
            error: null,
         };
      case "LOGIN_FAILURE":
         return {
            user: null,
            loading: false,
            error: action.payload,
         };
      case "REGISTER_SUCCESS": // Fixed typo
         return {
            user: null,
            loading: false,
            error: null,
         };
      case "LOGOUT":
         return {
            user: null,
            loading: false,
            error: null,
         };
      default:
         return state;
   }
};

// AuthContext Provider
export const AuthContextProvider = ({ children }) => {
   const [state, dispatch] = useReducer(AuthReducer, initial_state);

   // Persist user state in localStorage
   useEffect(() => {
    console.log("Saving to localStorage:", state.user); // Debugging log
      if (state.user) {
         localStorage.setItem("user", JSON.stringify(state.user));
      } else {
         localStorage.removeItem("user");
      }
   }, [state.user]);

   return (
      <AuthContext.Provider
         value={{
            user: state.user,
            loading: state.loading,
            error: state.error,
            dispatch,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};
