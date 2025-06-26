"use client";

import { useState, createContext } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext({
  user: {},
  setUser: () => {},
});

export default function UserContextProvider({ children }) {
  // tracks if the there are any changes to the board/tasks
  const [user, setUser] = useState({});

  const userCtx = {
    user: user,
    setUser: setUser,
  };

  return (
    <UserContext.Provider value={userCtx}>{children}</UserContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.array.isRequired,
};
