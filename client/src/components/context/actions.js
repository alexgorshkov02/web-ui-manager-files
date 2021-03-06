const TYPES = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    GET_USER: 'GET_USER',
  };
  
  const actions = {
    login: (user) => ({
      type: TYPES.LOGIN,
      payload: { user },
    }),
    logout: () => ({
      type: TYPES.LOGOUT,
      payload: {},
    }),
    getUser: (user) => ({
      type: TYPES.GET_USER,
      payload: { user },
    }),
  };
  
  module.exports = actions;