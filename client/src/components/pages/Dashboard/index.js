import {useContext} from "react";
import { GlobalContext as UserContext } from "../../context/store"


const Dashboard = () => {
  
  const { state } = useContext(UserContext);
  console.log(state);
  return(

  <div>
      Dashboard
  </div>)
};

export default Dashboard;