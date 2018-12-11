import axios_ from "axios";

const axios = axios_.create({
  baseURL:
    window && window.config && window.config.apiUri
      ? window.config.apiUri
      : "http://api-dev.floq.no",
  headers: {
    Authorization: `Bearer ${window.apiToken}`, // from `intranet` app
    Prefer: "return=representation" // ask for the updated entity after modifications (e.g. PATCH)
  }
});

export const getEmployees = () => axios.get("/employees");

export const updateEmployee = (id, updates) => axios.patch(`/employees?id=eq.${id}`, updates);

export const createEmployee = data => axios.post("/employees", data);

export const getEmployeesProjects = (fromDate, toDate) =>
  axios.post("/rpc/employees_on_projects", {
    from_date: fromDate,
    to_date: toDate
  });
