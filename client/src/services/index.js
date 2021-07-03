import axios from "axios";
import querystring from "querystring";

const BASE_URL = "http://localhost:9090/api/v1/alarm";
const token = btoa("hey");

export const fetchAlarmEvents = (page, query) => {
  const queryParam = querystring.stringify({ ...query, page });
  return axios.get(`${BASE_URL}/get-all?${queryParam}`, {
    headers: {
      token,
    },
  });
};
