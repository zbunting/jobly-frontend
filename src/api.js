const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN
  static token = null;

  /**
   * Return jobs and companies (for example)
   */
  static async request(endpoint, data = {}, method = "GET") {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    const headers = {
      authorization: `Bearer ${JoblyApi.token}`,
      'content-type': 'application/json',
    };

    url.search = (method === "GET")
      ? new URLSearchParams(data).toString()
      : "";

    // set to undefined since the body property cannot exist on a GET method
    const body = (method !== "GET")
      ? JSON.stringify(data)
      : undefined;

    const resp = await fetch(url, { method, body, headers });

    if (!resp.ok) {
      console.error("API Error:", resp.statusText, resp.status);
      const message = (await resp.json()).error.message;
      throw Array.isArray(message) ? message : [message];
    }

    return await resp.json();
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get a list of companies. */

  static async getCompanies(searchTerm) {
    const query = searchTerm.length > 0 ? { nameLike: searchTerm } : {};
    let res = await this.request(`companies/`, query);
    return res.companies;
  }

  /** Get a list of jobs. */

  static async getJobs(searchTerm) {
    const query = searchTerm.length > 0 ? { title: searchTerm } : {};
    let res = await this.request(`jobs/`, query);
    return res.jobs;
  }

  /** log user in, sets a user token on the class
   * accepts data: { username, password }
  */

  static async logIn(data) {
    let res = await this.request(`auth/token`, data, "POST");
    JoblyApi.token = res.token;
    return res.token;
  }

  /** sign user up, sets a user token on the class
   * accepts data:  { username, password, firstName, lastName, email }
  */

  static async signUp(data) {
    let res = await this.request(`auth/register`, data, "POST");
    JoblyApi.token = res.token;
    return res.token;
  }

  /** edit a user's profile */

  static async editProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "PATCH");
  }

  /** log user out, delete a user token from the class
*/

  static logOut() {
    JoblyApi.token = null;
  }

  /** Update the JoblyApi token */
  static updateToken(token) {
    JoblyApi.token = token;
  }

  /** get user and create User instance */

  static async getUser(username, token) {
    JoblyApi.token = token;
    let res = await this.request(`users/${username}`);
    return res.user;
  }
}

export default JoblyApi;
