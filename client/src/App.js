import {useContext, useState, useEffect  } from "react";
import Container from "./components/Container";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import Dashboard from "./components/pages/Dashboard";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Nav from "./components/Nav";
import Auth from './components/utils/auth';
import { GlobalContext as UserContext } from "./components/context/store";

// const client = new ApolloClient({
//   request: (operation) => {
//     const token = localStorage.getItem('id_token')
//     operation.setContext({
//       headers: {
//         authorization: token ? `Bearer ${token}` : ''
//       }
//     })
//   },
//   uri: '/graphql',
// })


function App() {
    // const classes = useStyles();
    const [loggedIn,setLoggedIn] = useState();
    const { state } = useContext(UserContext);
    useEffect(()=>{
        setLoggedIn(Auth.loggedIn())
    },[state.user])
    return (
        <Router>
          <div>
              {/* <Nav /> */}
              
              {loggedIn ? (
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/dashboard" component={Dashboard} />
                {/* <Route component={NoMatch} /> */}
              </Switch> 
              ) : (
                <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                {/* <Route component={NoMatch} /> */}
                </Switch> 
              )
}
          </div>
        </Router>

  
    );
  }
  

export default App;
