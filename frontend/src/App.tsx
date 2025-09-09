import {  useState } from "react";
import "./App.css";
import Login from './pages/login/login.jsx';
import UserList from './pages/User/UserList.jsx';
import { ToastContainer } from "react-toastify";

function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // // TODO: Candidate should implement these components and functions

  const LoginPage = () => {
    // Implement login form and authentication
    return <div>
      <Login setToken={setToken}/>
    </div>;
  };

  const User = () => {
    // Implement user listing with add/edit/delete functionality
    return <div>
      <UserList/>
      </div>;
  };

  return (
    <div className="App">
      {!token ? <LoginPage /> : <User />}
      <ToastContainer />
    </div>
  )
}

export default App;
