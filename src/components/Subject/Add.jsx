import React from 'react';
import Breadcrumb from '../Breadcrumb';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { BsChevronDown } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object().shape({
  stdname: yup.string().required('Standard Name is required'),
  subname: yup.string().required('Subject Name is required'),
  slug: yup.string().required('Slug is required'),
  icon: yup.string().required('Icon is required'),
});
const SubjectAdd = () => {
  const formik = useFormik({
    initialValues: {
      stdname: '',
      subname: '',
      slug: '',
      icon: '',
      Status: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      localStorage.setItem('SubjectData', JSON.stringify(values));
    },
  });

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <Breadcrumb pageName="Subject Add " />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Subject Add
              </h3>
              <p>
                Please fill all detail and add new Subject in your Subject
                directory
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Select Standard<span className="text-danger">*</span>
                  </label>
                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <select
                      name="stdname"
                      onChange={formik.handleChange}
                      className="relative z-20   w-full appearance-none rounded border border-stroke bg-transparent py-1.5   px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                    >
                      <option>Select Standard</option>
                      <option value="Standard">Standard</option>
                    </select>
                    <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                      <BsChevronDown />
                    </span>
                    {formik.touched.stdname && formik.errors.stdname && (
                      <small className="text-red-500">
                        {formik.errors.stdname}
                      </small>
                    )}
                  </div>
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Subject Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="subname"
                    onChange={formik.handleChange}
                    placeholder="Enter Subject Name"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />

                  {formik.touched.subname && formik.errors.subname && (
                    <small className="text-red-500">
                      {formik.errors.subname}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Slug <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="slug"
                    onChange={formik.handleChange}
                    placeholder="Enter Slug"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />

                  {formik.touched.slug && formik.errors.slug && (
                    <small className="text-red-500">{formik.errors.slug}</small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Icon <span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    name="stdname"
                    onChange={formik.handleChange}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />

                  {formik.touched.icon && formik.errors.icon && (
                    <small className="text-red-500">{formik.errors.icon}</small>
                  )}
                  <p>Please select an a png,jpeg,jpg,gif file only.</p>
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
                      // checked={blogadd.Status === '1'}
                    />
                    Paid
                  </div>
                  <div>
                    <input
                      type="radio"
                      onChange={formik.handleChange}
                      name="Status"
                      className="mx-2"
                      value="0"
                      // checked={blogadd.Status == = '0'}
                    />
                    UnPaid
                  </div>
                </div>
                <p>Please select an a one status by default is unpaid.</p>
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
                  type="submit"
                  onClick={handleGoBack}
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

export default SubjectAdd;
