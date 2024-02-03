import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState({username: "", penName: ""});

  const BASE_URL = "http://localhost:3001";
  const token = localStorage.getItem("jwt_token");

  useEffect(() => {
    axios
      .get(BASE_URL+"/getUser", { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  return (
    <div>
      <h1>Profile</h1>
      <h3>Name: {user.username}</h3>
      <h3>Pen Name: {user.penName}</h3>
      <h3>Speciality genre:</h3>
      <h3>Popular Stories:</h3>
    </div>
  );
}
