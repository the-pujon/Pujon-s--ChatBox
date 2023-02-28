import { onAuthStateChanged } from "firebase/auth";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { auth } from "../Firebase";
import { AuthContext } from "./AuthContext";

export const ChatsContext = createContext();

export const ChatsContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  const INITIAL_STATE = {
    chatId: "null",
    user: {},
    receiverId: "null",
  };

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
