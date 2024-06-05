import axios from "axios";

export const registerApi = async (formData) => {
  try {
    const response = await axios.post(
      `https://yamenadiosbandajksjdskj.azurewebsites.net/register`,
      formData
    );
    return response.data;
  } catch (error) {
    console.log("Error:", error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error.message;
  }
};

export const loginApi = async (formData) => {
  try {
    const response = await axios.post(
      `https://yamenadiosbandajksjdskj.azurewebsites.net/login`,
      formData
    );
    return response.data;
  } catch (error) {
    console.log("Error:", error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error.message;
  }
};
