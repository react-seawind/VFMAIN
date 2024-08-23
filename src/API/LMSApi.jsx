import axios from 'axios';
import { toast } from 'react-toastify';
import Config from './Config';

const { API_BASE_URL } = Config; // Destructure the values from the config file

const TOKEN = Config.getToken();
const Id = Config.getId();

const headers = {
  Authorization: `Bearer ${TOKEN}`, // Corrected typo from "Bareer" to "Bearer"
};

// =========================Get All LMS=========================
export const getAllLMS = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/LMS`, {
      headers,
    });
    return response.data.responsedata;
  } catch (error) {
    throw error;
  }
};

// ----------------------getLMSbyId----------------
export const getLMSById = async (Id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/LMS/${Id}`, {
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
// ===================Edit LMS================D
export const updateLMSById = async (formData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/LMS`, formData, {
      headers,
    });

    if (response.data.status === true) {
      toast(response.data.message); // Toast success message
      return response.data;
    } else {
      toast.error(response.data.message);
      throw new Error(response.data.message); // Throw error with API message
    }
  } catch (error) {
    throw error; // Rethrow the error for further handling
  }
};

// ------------------------Add LMS---------------------
export const AddLMS = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/LMS`, formData, {
      headers,
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
// ------------------------delete LMS---------------------
export const deleteLMS = async (Id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/LMS/${Id}`, {
      headers,
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
// ===================ChangePassword================D
export const LMSChangePassword = async (data) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/LMS/changePassword`,
      data,
      {
        headers,
      },
    );

    if (response.data.status === true) {
      toast.success(response.data.message);
      return response.data;
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

// =========================Get All LMS=========================
export const getReportAllLMS = async (StatusId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/LMS/report/${StatusId}`, {
      headers,
    });
    return response.data.responsedata;
  } catch (error) {
    throw error;
  }
};

// =============================================================================
// ==================================LMSPayment======================================
// =============================================================================
// =========================Get All LMSPayment=========================

// ----------------------getLMSPaymentbyId----------------
export const getLMSPaymentById = async (Id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/LMSpayment/${Id}`, {
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

// ------------------------Add LMSPayment---------------------
export const AddLMSPayment = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/LMSpayment`, formData, {
      headers,
    });
    if (response.data.status === true) {
      toast.success('LMSPayment Add Successfully..'); // Toast success message
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
export const getLMSPaymentReportBySchoolId = async (StatusId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/LMSpayment/report/${StatusId}`,
      {
        headers,
      },
    );
    return response.data.responsedata;
  } catch (error) {
    throw error;
  }
};
