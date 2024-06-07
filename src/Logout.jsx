import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

/** Component for logging a user out
 *
 * Props:
 * - logout: function
 *
 * State: none
 *
 * RoutesList -> Logout
 */

function Logout({ logout }) {
  const navigate = useNavigate();

  useEffect(function doLogout() {
    logout();
    navigate("/");
  }, []);

  return null;
}

export default Logout;
