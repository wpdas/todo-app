import axios from "axios";

export const api = () => {
  // If user is logged in, send its uniq id
  const userId = localStorage.getItem("userId");

  return axios.create({
    baseURL: `${window.location.origin}/api/`,
    headers: {
      "Content-Type": "application/json",
      ...(userId ? { "User-Id": userId } : {}),
    },
  });
};
