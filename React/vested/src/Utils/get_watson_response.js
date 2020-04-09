import axios from "axios"

export default function get_watson_response(message) {
  return axios.post("/api/get_watson_response", {message});
}