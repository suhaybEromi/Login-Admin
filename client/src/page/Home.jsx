import { useState } from "react";

export default function Home() {
  const [auth, setAuth] = useState(false);
  return (
    <div>
      {auth ? (
        <div>
          <h3>You are authorized {}</h3>
          <button className="btn btn-danger">Logout</button>
        </div>
      ) : (
        <div>
          <h3>{}</h3>
          <h3>Login Now</h3>
          <button className="btn btn-primary">Login</button>
        </div>
      )}
    </div>
  );
}
