import { createContext, useContext, useReducer } from "react";

import { AuthContext } from "./AuthContext";

//for creating context
export const ChatsContext = createContext();

//context provider function
export const ChatsContextProvider = ({ children }) => {
  //getting user from Auth
  const { currentUser } = useContext(AuthContext);

  //state
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
    receiverId: "null",
  };

  //reducer
  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
          user: action.payload,
          receiverId: action.payload.uid,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatsContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatsContext.Provider>
  );
};
