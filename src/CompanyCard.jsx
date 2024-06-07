import { NavLink } from "react-router-dom";
import "./CompanyCard.css";
/**
 * Purpose: renders a single company
 *
 * Props: { handle, name, description, numEmployees, logoUrl }
 * States: none
 *
 *  CompanyList > CompanyCard
 */
function CompanyCard({ companyData }) {
  return (
    <NavLink to={`/companies/${companyData.handle}`} className="CompanyCard">
      <h2>{companyData.name}</h2>
      <p>{companyData.description}</p>
    </NavLink>
  );
}
export default CompanyCard;
