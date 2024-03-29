import axios from 'axios';

const API_BASE_URL = 'https://seawindsolution.ae/VF/api';

const sessiondata = sessionStorage.getItem('logindata');
const parsedSessionData = sessiondata ? JSON.parse(sessiondata) : null;
const token = parsedSessionData ? parsedSessionData.token : null;
const Id = parsedSessionData ? parsedSessionData.Id : null;

const TOKEN = token;

const headers = {
  Authorization: `Bareer ${TOKEN}`,
  'Content-Type': 'application/json',
};

// // =========================SERVICE=========================
export const getServicedata = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getCategory`, {
      headers,
    });

    if (response.data.status == true) {
      return response.data.ResponseData;
    } else {
      toast.error(response.data.message);
      throw new Error(response.data.message); // Throw error with API message
    }
  } catch (error) {
    throw error; // Rethrow the error for further handling
  }
};

export const AddSchool = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/school`, formData, {
      headers,
      'Content-Type': 'multipart/form-data',
    });
    if (response.data.status === true) {
      toast(response.data.message); // Toast success message
      return response.data; // Return response data
    } else {
      toast.error(response.data.message);
      throw new Error(response.data.message); // Throw error with API message
    }
  } catch (error) {
    throw error; // Rethrow the error for further handling
  }
};
// // =========================BLOG=========================
export const getBlog = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getBlog`, {
      headers,
    });
    return response.data.responsedata;
  } catch (error) {
    throw error;
  }
};
export const AddBlog = async (formData) => {
  try {
    const headers = {
      'x-api-key': '123456789123456789',
      'Content-Type': 'multipart/form-data',
      authorization: `Bearer ${TOKEN}`,
    };
    const response = await axios.post(`${API_BASE_URL}/addBlog`, formData, {
      headers,
    });
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};
