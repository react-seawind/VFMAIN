import React from 'react';
import Breadcrumb from '../Breadcrumb';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { BsChevronDown } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { AddPayment } from '../../API/PaymentAPI';

const validationSchema = yup.object().shape({
  schoolname: yup
    .string()
    .matches(/^[A-Z a-z]+$/, 'Only alphabets are allowed for this field ')
    .required('School Name is required'),
  amount: yup
    .string()
    .matches(/^[0-9]+$/, 'Only Number are allowed for this field ')
    .required('Amount is required'),
});

const PaymentAdd = () => {
  const formik = useFormik({
    initialValues: {
      schoolname: '',
      amount: '',
      Status: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      try {
        const formData = new FormData();
        formData.append('Title', values.Title);
        formData.append('Slug', values.Slug);
        if (values.Icon instanceof File) {
          formData.append('Icon', values.Icon);
        } else {
          formData.append('Icon', values.Icon);
        }
        if (values.Image instanceof File) {
          formData.append('Image', values.Image);
        } else {
          formData.append('Image', values.Image);
        }
        formData.append('Content', values.Content);
        formData.append('Status', values.Status);

        await AddPayment(formData);
        actions.resetForm();
        navigate('/payment/listing');
      } catch (error) {
        console.error('Error adding payment:', error);
      }
    },
  });

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/payment/listing');
  };
  return (
    <div>
      <Breadcrumb pageName="Payment Add " />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Payment Add
              </h3>
              <p>
                Please fill all detail and add new Payment in your Payment
                directory
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Select School <span className="text-danger">*</span>
                  </label>
                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <select
                      name="schoolname"
                      onChange={formik.handleChange}
                      className="relative z-20   w-full appearance-none rounded border border-stroke bg-transparent py-1.5   px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                    >
                      <option>Select School</option>
                      <option value="school">School</option>
                    </select>
                    <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                      <BsChevronDown />
                    </span>
                    {formik.touched.schoolname && formik.errors.schoolname && (
                      <small className="text-red-500">
                        {formik.errors.schoolname}
                      </small>
                    )}
                  </div>
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Amount <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="amount"
                    onChange={formik.handleChange}
                    placeholder="Enter Your Amount"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />

                  {formik.touched.amount && formik.errors.schoolname && (
                    <small className="text-red-500">
                      {formik.errors.schoolname}
                    </small>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2.5 py-3.5 px-5.5">
                <label className="mb-3 block text-black dark:text-white">
                  Status <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <div>
                    <input
                      type="radio"
                      onChange={formik.handleChange}
                      name="Status"
                      className="mx-2"
                      value="1"
                      checked={formik.values.Status == '1'}
                    />
                    Active
                  </div>
                  <div>
                    <input
                      type="radio"
                      onChange={formik.handleChange}
                      name="Status"
                      className="mx-2"
                      value="0"
                      checked={formik.values.Status == '0'}
                    />
                    In Active
                  </div>
                </div>
                <p>Please select an a one status by default is inactive.</p>
              </div>

              <div className="flex   gap-5.5 py-3.5 px-5.5">
                <button
                  className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                  type="submit"
                >
                  Submit
                </button>
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
