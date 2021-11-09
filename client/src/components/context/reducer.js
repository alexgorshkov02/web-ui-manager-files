export function reducer(state, { type, payload }) {
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        ...payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    case "GET_USER":
      return {
        ...state,
        ...payload,
      };
    default:
      throw new Error();
  }
}
