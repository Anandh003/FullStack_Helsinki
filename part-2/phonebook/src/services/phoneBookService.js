import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request
    .then((response) => response.data)
    .catch((err) => console.log(err));
};

const addInfo = (details) => {
  const request = axios.post(baseUrl, details);
  return request.then((response) => response.data);
};

const updateInfo = (id, details) => {
  const request = axios.put(`${baseUrl}/${id}`, details);
  return request.then((response) => response.data);
};

const deleteInfo = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const phoneBookService = {
  getAll,
  addInfo,
  updateInfo,
  deleteInfo,
};

export default phoneBookService;
