import axios from 'axios';
import { toast } from 'react-toastify';
import Config from './Config';

const { API_BASE_URL } = Config; // Destructure the values from the config file

const TOKEN = Config.getToken();
const Id = Config.getId();

const headers = {
  Authorization: `Bearer ${TOKEN}`, // Corrected typo from "Bareer" to "Bearer"
};

// ----------------------getSubjectByStandardId----------------
// https://vf.seawindsolution.ae/api/common/1
export const getSubjectByStandardId = async (StandardId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/common/${StandardId}`, {
      headers,
    });

    if (response.data.status === true) {
      return response.data.responseData;
    } else {
      toast.error(response.data.message);
      throw new Error(response.data.message); // Throw error with API message
    }
  } catch (error) {
    throw error; // Rethrow the error for further handling
  }
};
// ----------------------getChapterBySubjectIdId----------------
// https://vf.seawindsolution.ae/api/common/1/1
export const getChapterBySubjectIdId = async (StandardId, SubjectId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/common/${StandardId}/${SubjectId}`,
      {
        headers,
      },
    );

    if (response.data.status === true) {
      return response.data.responseData;
    } else {
      toast.error(response.data.message);
      throw new Error(response.data.message); // Throw error with API message
    }
  } catch (error) {
    throw error; // Rethrow the error for further handling
  }
};
