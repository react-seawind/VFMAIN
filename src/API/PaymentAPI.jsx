import axios from 'axios';
import { toast } from 'react-toastify';
import Config from './Config';

const { API_BASE_URL } = Config; // Destructure the values from the config file

const TOKEN = Config.getToken();
const Id = Config.getId();

const headers = {
  Authorization: `Bearer ${TOKEN}`, // Corrected typo from "Bareer" to "Bearer"
};

// =============================================================================
// ==================================Payment======================================
// =============================================================================
// =========================Get All Payment=========================

// ----------------------getPaymentbyId----------------
export const getPaymentById = async (Id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/payment/${Id}`, {
      headers,
    });

    if (response.data.status === true) {
      return response.data.responsedata;
    } else {
      toast.error(response.data.message);
      throw new Error(response.data.message); // Throw error with API message
    }
  } catch (error) {
    throw error; // Rethrow the error for further handling
  }
};

// ------------------------Add Payment---------------------
export const AddPayment = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/payment`, formData, {
      headers,
    });
    if (response.data.status === true) {
      toast.success('Payment Add Successfully..'); // Toast success message
      return response.data; // Return response data
    } else {
      toast.error(response.data.message);
      throw new Error(response.data.message); // Throw error with API message
    }
  } catch (error) {
    throw error; // Rethrow the error for further handling
  }
};

// =========================Get All School=========================
export const getPaymentReportBySchoolId = async (StatusId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/payment/report/${StatusId}`,
      {
        headers,
      },
    );
    return response.data.responsedata;
  } catch (error) {
    throw error;
  }
};
