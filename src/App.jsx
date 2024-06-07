import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Nav from "./Nav.jsx";
import RoutesList from "./RoutesList.jsx";
import JoblyApi from "./api.js";
import userContext from "./userContext.js";
import { jwtDecode } from "jwt-decode";

/** Component for entire page.
 * On mount checks for a token in localStorage and attempts to fetch the
 * user's information
 *
 * Props: none
 *
 * Context:
 * - firstName
 * - lastName
 *
 * State:
 * - user: object
 * - isWaitingForUser: boolean
 *
 * App -> {Nav, RoutesList}
 *
 */

function App() {
  const [user, setUser] = useState(null);
  const [isWaitingForUser, setIsWaitingForUser] = useState(true);
  const token = localStorage.getItem("token");

  console.log("Rendered App", { user, token, isLoading: isWaitingForUser });

  /** Add a token to JoblyApi and logs a user in */
  async function logIn(loginData) {
    const token = await JoblyApi.logIn(loginData);
    localStorage.setItem("token", token);
    await updateUser(token);
  }

  /** Registers a user, adds a token to JoblyApi, and logs a user in */
  async function signUp(signupData) {
    const token = await JoblyApi.signUp(signupData);
    localStorage.setItem("token", token);
    await updateUser(token);
  }

  /** Edits a user's profile */
  async function editProfile(profileData) {
    const { username, ...editedData } = profileData;
    await JoblyApi.editProfile(username, editedData);
    await updateUser(token);
  }

  /** Logs a user out */
  function logOut() {
    localStorage.removeItem("token");
    JoblyApi.logOut();
    setUser(null);
  }

  /** Function to log a user in if token in localStorage */
  async function updateUser(token) {
    console.log("getUser", { token });

    const username = jwtDecode(token)?.username;
    const user = await JoblyApi.getUser(username, token);
    setUser(user);
  }

  useEffect(function loadTokenUserOnMount() {
    async function loadTokenUser() {
      console.log("loadTokenUser", { token });

      if (token !== null) {
        JoblyApi.updateToken(token);
        await updateUser(token);
        setIsWaitingForUser(false);
      } else {
        setIsWaitingForUser(false);
      }

    }
    loadTokenUser();
  }, []);

  // FIXME: call this isWaitingForUser or something that clarifies it is not
  // just about talking to the server
  if (isWaitingForUser) {
    return <div>Hey! Loading.</div>;
  }
  /** NOTE: never load a component until we know whether there's a user
   * This allows us to let the useEffect to take place after the first render
   * This is guarding our component
   */

  return (
    <div className="App">
      <userContext.Provider value={{ user }}>
        <BrowserRouter>
          <Nav user={user} />
          <RoutesList
            login={logIn}
            signup={signUp}
            editProfile={editProfile}
            logout={logOut}
            user={user}
          />
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
