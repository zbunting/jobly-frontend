import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

const INITIAL_STATE = {
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  email: "",
};

/** Component for signup form
 *
 * Props:
 * - signup: function
 *
 * State:
 * - formData: {
 * username: string,
 * password: string,
 * firstName: string,
 * lastName: string,
 * email: string
 * }
 * - errors: [string, ...]
 *
 * RoutesList -> SignupForm
 */
function SignupForm({ signup }) {
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
      await signup(formData);
      navigate("/");
    } catch (err) {
      console.log(err);
      setErrors(err);
    }
  }

  return (
    <form className="SignupForm" onSubmit={handleSubmit}>
      <label htmlFor="SignupForm-username">Username</label>
      <input
        id="SignupForm-username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <label htmlFor="SignupForm-password">Password</label>
      <input
        id="SignupForm-password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <label htmlFor="SignupForm-firstName">First Name</label>
      <input
        id="SignupForm-firstName"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <label htmlFor="SignupForm-lastName">Last Name</label>
      <input
        id="SignupForm-lastName"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <label htmlFor="SignupForm-email">Email</label>
      <input
        id="SignupForm-email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      {errors !== null &&
        errors.map((error) => <Alert key={error} msg={error} />)}
      <button>Submit</button>
    </form>
  );
}

export default SignupForm;
