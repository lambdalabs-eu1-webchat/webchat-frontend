import React, { useState, useEffect } from "react";
import "./App.css";
import store from "./redux/store";
import { Provider } from "react-redux";
import userCalls from "./ajax/users";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    userCalls
      .get()
      .then(res => {
        setUsers(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <h1>Hello, world!</h1>
        {users.map(user => (
          <p key={user._id}> {user.username} </p>
        ))}
      </div>
    </Provider>
  );
}

export default App;
