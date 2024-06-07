import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert.jsx";
import "./ProfileForm.css";

/** Component for profile form
 *
 * Props:
 * - editProfile: function
 *
 * State:
 * - formData: {
 * username: string,
 * firstName: string,
 * lastName: string,
 * email: string
 * }
 * - errors: [string, ...]
 *
 * RoutesList -> ProfileForm
 */
function ProfileForm({ editProfile, user }) {
  const [formData, setFormData] = useState({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  });
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
      console.log("ProfileForm", { formData });
      await editProfile(formData);
      navigate("/");
    } catch (err) {
      console.log(err);
      setErrors(err);
    }
  }

  return (
    <form className="ProfileForm" onSubmit={handleSubmit}>
      <label htmlFor="ProfileForm-username">Username
        <input
          id="ProfileForm-username"
          name="username"
          // value={formData.username}
          placeholder={formData.username}
          disabled
        />
      </label>
      <label htmlFor="ProfileForm-firstName">First Name
        <input
          id="ProfileForm-firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="ProfileForm-lastName">Last Name
        <input
          id="ProfileForm-lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="ProfileForm-email">Email
        <input
          id="ProfileForm-email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      {errors !== null &&
        errors.map((error) => <Alert key={error} msg={error} />)}
      <div>
        <button className="btn-primary btn fw-bold">Submit</button>
      </div>
    </form>
  );
}

export default ProfileForm;
