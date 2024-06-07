import "./JobCard.css";

/**
 * Purpose: renders a single job
 *
 * Props: title, salary, equity, name
 * States: none
 *
 *  JobList > JobCard
 */
function JobCard({ title, salary, equity, name }) {
  return (
    <div className="JobCard">
      <h3>{title}</h3>
      {name !== undefined ? <p>Company: {name}</p> : ""}
      <p>Salary: {salary}</p>
      <p>Equity: {equity}</p>
    </div>
  );
}
export default JobCard;
