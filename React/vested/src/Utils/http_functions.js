import axios from "axios"

export function get_company_data(company) {
    return axios.post("/api/get_company_data", {company});
}

export default get_company_data;