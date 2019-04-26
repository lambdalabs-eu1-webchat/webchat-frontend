import React, { useState, useEffect } from "react";
import "./App.css";

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
  });

  return (
    <div className="App">
      <h1>Hello, world!</h1>
      {users.map(user => (
        <p key={user._id}> {user.username} </p>
      ))}
    </div>
  );
}

export default App;
