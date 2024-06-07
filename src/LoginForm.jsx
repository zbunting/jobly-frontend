import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

const INITIAL_STATE = { username: "", password: "" };

/** Component for login form
 *
 * Props:
 * - login: function
 *
 * State:
 * - formData: { username: string, password: string }
 * - errors: [string, ...]
 *
 * RoutesList -> LoginForm
 */
function LoginForm({ login }) {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  /** Handle change to input */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  }

  /** Try calling parent function, otherwise set errors */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await login(formData);
      navigate("/");
    } catch (err) {
      setErrors(err);
    }
  }

  return (
    <form className="LoginForm" onSubmit={handleSubmit}>
      <label htmlFor="LoginForm-username">Username</label>
      <input
        id="LoginForm-username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <label htmlFor="LoginForm-password">Password</label>
      <input
        id="LoginForm-password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      {errors !== null &&
        errors.map((error) => <Alert key={error} msg={error} />)}
      <button>Submit</button>
    </form>
  );
}

export default LoginForm;
