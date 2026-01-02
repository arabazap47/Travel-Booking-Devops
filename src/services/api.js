
import axios from "axios";

const api = axios.create({
<<<<<<< HEAD
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
=======
  baseURL:import.meta.env.VITE_API_URL + "/api"
>>>>>>> 2d04dc2 (Fix API base URL and frontend fetch logic)
});

export default api;
