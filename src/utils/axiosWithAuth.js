import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    headers: {
      baseURL: "https://build-week-africanmarketplace.herokuapp.com/api",
      Authorization: `${token}`
    }
  });
};
