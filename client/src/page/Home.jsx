import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:8081")
      .then(res => {
        if (res.data.message === "success") {
          setAuth(true);
          setName(res.data.name);
        } else {
          setMessage(res.data.message);
        }
      })
      .catch(err => {
        setMessage("we need token please provide it.");
      });
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:8081/logout")
      .then(res => {
        if (res.data.message === "success") {
          location.reload(true);
        } else {
          alert("Couldn't log out");
        }
      })
      .catch(err => console.log(err.message));
  };

  return (
    <div>
      {auth ? (
        <div>
          <h3>You are Authorized, {name}</h3>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <h3>{message}</h3>
          <h3>Login Now</h3>
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        </div>
      )}
    </div>
  );
}
