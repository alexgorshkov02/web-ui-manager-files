import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ApolloProvider } from '@apollo/react-hooks';
import { GlobalProvider as UserProvider } from "./components/context/store";
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    request: (operation) => {
      const token = localStorage.getItem('id_token')
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : ''
        }
      })
    },
    uri: '/graphql',
  })
  

ReactDOM.render(
    <ApolloProvider client={client}>
    <UserProvider> 
<App />
</UserProvider> 
      </ApolloProvider>
, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
