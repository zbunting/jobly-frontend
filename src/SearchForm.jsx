import { useState } from "react";

/** Search form component
 *
 * Props:
 * - getList: function
 *
 * State:
 * -searchTerms: string
 *
 * {CompanyList, JobList} -> SearchForm
 */

function SearchForm({ getList }) {
  const [searchTerms, setSearchTerms] = useState("");

  /** Handle input changes */
  function handleChange(evt) {
    setSearchTerms(evt.target.value);
  }

  /** Call parent function */
  function handleSubmit(evt) {
    console.log("handle submit in search form with searhTerms:", searchTerms);
    evt.preventDefault();
    getList(searchTerms.trim());
  }

  return (
    <form className="SearchForm" onSubmit={handleSubmit}>
      <input
        placeholder="Enter search term.."
        value={searchTerms}
        onChange={handleChange}
      />
      <button>Submit</button>
    </form>
  );
}

export default SearchForm;
