import React from "react";
import { useState, useEffect, useReducer } from "react";
import { default as server } from "../ProxyServer.js";
import "./ProxyServerExample.css";

export const ProxyServerExample = () => {
  const [users, setUsers] = useState([]);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    getAllAccounts();
  }, []);

  const getAllAccounts = async () => {
    try {
      server
        .getAll("accounts")
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          setUsers(data);
          setEdit(false);
        });
    } catch (error) {
      console.log("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async (id) => {
    try {
      server.delete("accounts", id).then((response) => {
        console.log(response);
        alert("Deleted successfully");
        return getAllAccounts(); //refresh the table without the deleted item
      });
    } catch (error) {
      console.log("Error deleting data", error);
    }
  };

  const createAccount = async () => {
    const newAccountObj = {
      username: username,
      email: email,
      password_hash: password,
    };
    try {
      server.add("accounts", newAccountObj).then((response) => {
        console.log(response);
        alert("Added successfully");
        return getAllAccounts(); //refresh the table
      });
    } catch (error) {
      console.log("Error creating data", error);
    }
  };
  const updateAccount = async (id) => {
    const updatedAccount = {
      username: username,
      email: email,
      password_hash: password,
    };
    try {
      server.update("accounts", id, updatedAccount).then((response) => {
        console.log(response);
        alert("Updated successfully");
        setUsername("");
        setEmail("");
        setPassword("");
        return getAllAccounts(); //refresh the table
      });
    } catch (error) {
      console.log("Error updating data", error);
    }
  };
  const setupEditForm = (user) => {
    setEdit(true);
    setId(user.id);
    setUsername(user.username);
    setEmail(user.email);
    setPassword(user.password);
  };
  const cancelEdit = () => {
    setEdit(false);
    setUsername("");
    setEmail("");
    setPassword("");
  };
  return (
    <div id="example-wrapper" className="grid">
      <div className="grid-child">
        <h2>{edit ? "Update" : "Create"} account</h2>
        <form
          action="#"
          onSubmit={() => (edit ? updateAccount(id) : createAccount())}
        >
          <div className="form-group">
            <input
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              style={{ display: "flex", gap: "1rem", justifyContent: "end" }}
            >
              {edit ? (
                <button type="button" onClick={() => cancelEdit()}>
                  Cancel
                </button>
              ) : (
                ""
              )}
              <button type="submit">{edit ? "Update" : "Create"}</button>
            </div>
          </div>
        </form>
      </div>
      <div className="grid-child">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => setupEditForm(user)}>Edit</button>
                  <button onClick={() => deleteAccount(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
