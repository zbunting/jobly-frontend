import { useContext } from "react";
import userContext from "./userContext";
import "./Home.css";

/**
 * Purpose: renders home page
 *
 * Props: none
 * States: none
 * Context:
 * - user: object
 *
 * App > RoutesList > Home
 */
function Home() {
  const { user } = useContext(userContext);

  return (
    <div className="Home">
      <div className="Home-text">
        <h1>Jobly</h1>
        <p>All the jobs in one, convenient place.</p>
        {user !== null &&
          <p>Welcome back {user.firstName}!</p>
        }
      </div>
    </div>
  );
}
export default Home;
