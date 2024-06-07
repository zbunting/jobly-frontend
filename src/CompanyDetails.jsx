import { useState, useEffect } from "react";
import { useParams, Link, NavLink } from "react-router-dom";
import JobCard from "./JobCard";
import JoblyApi from "./api";
import NotFound404 from "./NotFound404";
import "./CompanyDetails.css";

/**
 * Purpose: renders a list of companies
 *
 * Props: none
 * States: company
 * - Before company data is returned: {null}
 * - Company not found: {error: error message}
 *
 * App > RoutesList > CompanyDetails
 */

function CompanyDetails() {
  const [company, setCompany] = useState(null);
  const { handle } = useParams();

  console.log("Render CompanyDetails", { company, handle });

  async function getCompanyDetails() {
    try {
      const company = await JoblyApi.getCompany(handle);
      setCompany(company);
    } catch (err) {
      setCompany({ error: err });
    }
  }

  useEffect(
    function getCompanyDetailsWhenMounted() {
      getCompanyDetails();
    },
    [handle]
  );

  if (company === null) {
    return <p>Loading...</p>;
  }

  if (company.error !== undefined) {
    return (
      <div>
        <NotFound404 searchParam={handle} />
      </div>
    );
  }

  return (
    <div className="CompanyDetails">
      <h1 className="CompanyDetails-heading">{company.name}</h1>
      <ul>
        {company.jobs.map((job) => (
          <li key={job.id} className="CompanyDetails-item">
            <JobCard
              title={job.title}
              salary={job.salary}
              equity={job.equity}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
export default CompanyDetails;

// DO NOT DELETE, USE THE FOLLOWING FOR TESTING:
// const defaultCompany = {
//   handle: "handle1",
//   name: "name1",
//   description: "description1",
//   numEmployees: 10000,
//   logoUrl: "",
//   jobs: [
//     {
//       id: 1,
//       title: "title 1",
//       salary: 100000,
//       equity: "0.5",
//       name: "company 1",
//     },
//     {
//       id: 2,
//       title: "title 2",
//       salary: 200000,
//       equity: "0.5",
//       name: "company 1",
//     },
//   ],
// };
