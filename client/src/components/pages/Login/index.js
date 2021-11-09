import React, { useState, useContext } from "react";
import { useMutation } from '@apollo/react-hooks';
import { Link, useHistory } from "react-router-dom";
import { LOGIN } from "../../utils/mutations"
import Auth from "../../utils/auth";
import { GlobalContext as UserContext } from "../../context/store"
import {login as storeLogin} from "../../context/actions";

function Login(props) {
  const [formState, setFormState] = useState({ username: '', password: '' })
  const [login, { error }] = useMutation(LOGIN);
  const { dispatch } = useContext(UserContext);
  let history = useHistory();
  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      const mutationResponse = await login({ variables: { username: formState.username, password: formState.password } })
      const token = mutationResponse.data.login.token;
      Auth.login(token);
      console.log("Dispatch: ", dispatch);
      console.log("MutationResponse: ", mutationResponse);
      dispatch(storeLogin(mutationResponse.data.login.user));
      history.push("/");
    } catch (e) {
      console.log(e)
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  return (
    <div className="container my-1">
      <Link to="/signup">
        ← Go to Signup
      </Link>

      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="username">Username:</label>
          <input
            placeholder="username"
            name="username"
            type="username"
            id="username"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        {
          error ? <div>
            <p className="error-text" >The provided credentials are incorrect</p>
          </div> : null
        }
        <div className="flex-row flex-end">
          <button type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}


export default Login;
