import React, { useEffect, useReducer } from 'react';
import { useQuery } from '@apollo/client';

import actions from '../context/actions';
import { reducer } from './reducer';

const GlobalContext = React.createContext(null);

function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    // loggedIn: false,
    user: null,
  });

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalProvider, GlobalContext };