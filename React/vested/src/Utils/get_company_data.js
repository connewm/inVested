import axios from "axios"

export default function get_company_data(company) {
  return axios.post("/api/get_company_data", {company});
}