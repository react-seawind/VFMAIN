import React, { useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { AddPayment } from '../../API/PaymentAPI'; // Assuming AddPayment is implemented correctly
import FormLoader from '../../common/Loader/FormLoader';

// Validation schema using yup
const validationSchema = yup.object().shape({
  Amount: yup
    .string()
    .matches(/^[0-9]+$/, 'Only numbers are allowed for this field')
    .required('Amount is required'),
  PaymentMethod: yup.string().required('Payment Method is required'),
});

const PaymentAdd = () => {
  const [isFormLoading, setIsFormLoading] = useState(false);
  const { Id } = useParams(); // Assuming Id is extracted correctly from the URL
  const navigate = useNavigate();

  // Formik hook for managing form state and validation
  const formik = useFormik({
    initialValues: {
      SchoolId: Id, // Assuming this will be filled with Id from URL
      Amount: '',
      PaymentMethod: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      setIsFormLoading(true); // Start loading state

      try {
        // Call your API function (AddPayment) passing form data
        const result = await AddPayment(values);

        if (result.status === true) {
          actions.resetForm(); // Reset form after successful submission
          navigate(`/school/payment/listing/${Id}`); // Navigate to payment listing page
        } else {
          // Handle case where API call returns false or error
          console.error('Failed to add payment:', result.error);
        }
      } catch (error) {
        console.error('Error adding payment:', error);
      } finally {
        setIsFormLoading(false); // Always set loading state to false at the end
      }
    },
  });

  const handleGoBack = () => {
    navigate(`/school/payment/listing/${Id}`); // Navigate back to payment listing page
  };

  return (
    <div>
      <Breadcrumb pageName="Payment Add" />
      {isFormLoading && <FormLoader loading={isFormLoading} />}{' '}
      {/* Show loader if form is submitting */}
      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          {/* Form container */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Payment Add
              </h3>
              <p>Please fill all details to add a new payment.</p>
            </div>

            {/* Form submission */}
            <form onSubmit={formik.handleSubmit}>
              {/* Hidden field for SchoolId */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5.5 py-3.5 px-5.5">
                {/* Amount input */}
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Amount <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="Amount"
                    value={formik.values.Amount}
                    onChange={formik.handleChange}
                    placeholder="Enter Payment Amount"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Amount && formik.errors.Amount && (
                    <small className="text-red-500">
                      {formik.errors.Amount}
                    </small>
                  )}
                </div>

                {/* Payment Method input */}
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Payment Method <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="PaymentMethod"
                    value={formik.values.PaymentMethod}
                    onChange={formik.handleChange}
                    placeholder="Enter Payment Method"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.PaymentMethod &&
                    formik.errors.PaymentMethod && (
                      <small className="text-red-500">
                        {formik.errors.PaymentMethod}
                      </small>
                    )}
                </div>
              </div>
              {/* Form actions */}
              <div className="flex gap-5.5 py-3.5 px-5.5">
                {/* Submit button */}
                <button
                  className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                  type="submit"
                >
                  Submit
                </button>

                {/* Cancel button */}
                <button
                  className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  onClick={handleGoBack}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentAdd;
