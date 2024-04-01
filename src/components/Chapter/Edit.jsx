import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Logo from '../../images/logo.jpg';
import { BsChevronDown } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllStandard } from '../../API/StandardApi';
import { getAllSubject } from '../../API/SubjectAPI';
import { getChapterById, updateChapterById } from '../../API/ChapterApi';

const validationSchema = yup.object().shape({
  StandardId: yup.string().required('Standard is required'),
  SubjectId: yup.string().required('Subject is required'),
  Title: yup.string().required('Subject Name is required'),
  Slug: yup.string().required('Slug is required'),
  Image: yup.string().required('Icon is required'),
});

const ChapterEdit = () => {
  // ================ Get data by Id============
  const { Id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (Id) {
          const ChapterData = await getChapterById(Id);
          formik.setValues({
            Id: ChapterData.Id || '',
            StandardId: ChapterData.StandardId || '',
            SubjectId: ChapterData.SubjectId || '',
            Title: ChapterData.Title || '',
            Slug: ChapterData.Slug || '',
            Image: ChapterData.Image || '',
            Hid_Image: ChapterData.Hid_Image || '',
            Status: ChapterData.Status || '0',
          });
        } else {
          console.log('error');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [Id]);

  // ------------Standard DATA-------------------
  const [std, setstd] = useState([]);

  useEffect(() => {
    const fetchStandard = async () => {
      try {
        const StandardData = await getAllStandard();
        setstd(StandardData);
      } catch (error) {
        console.error('Error fetching Standard:', error);
      }
    };
    fetchStandard();
  }, []);

  // ------------subject DATA-------------------
  const [subject, setsubject] = useState([]);

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const SubjectData = await getAllSubject();
        setsubject(SubjectData);
      } catch (error) {
        console.error('Error fetching Subject:', error);
      }
    };
    fetchSubject();
  }, []);
  const formik = useFormik({
    initialValues: {
      StandardId: '',
      SubjectId: '',
      Title: '',
      Slug: '',
      Image: '',
      Hid_Image: '',
      Status: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      try {
        const formData = new FormData();
        formData.append('Id', values.Id);
        formData.append('StandardId', values.StandardId);
        formData.append('SubjectId', values.SubjectId);
        formData.append('Title', values.Title);
        formData.append('Slug', values.Slug);
        if (values.Image instanceof File) {
          formData.append('Image', values.Image);
        } else {
          formData.append('Image', values.Image);
        }
        if (values.Hid_Image instanceof File) {
          formData.append('Hid_Image', values.Hid_Image);
        } else {
          formData.append('Hid_Image', values.Hid_Image);
        }

        formData.append('Status', values.Status);

        await updateChapterById(formData);
      } catch (error) {
        console.error('Error updating slider:', error);
      }
    },
  });

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/chapter/listing');
  };
  return (
    <div>
      <Breadcrumb pageName="Chapter Edit" />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Chapter Edit
              </h3>
              <p>
                Please fill all detail and edit new Chapter in your Chapter
                directory
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <input
                type="hidden"
                name="Hid_Image"
                value={formik.values.Hid_Image}
              />
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Select Standard<span className="text-danger">*</span>
                  </label>
                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <select
                      name="StandardId"
                      value={formik.values.StandardId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="relative z-20   w-full appearance-none rounded border border-stroke bg-transparent py-1.5   px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                    >
                      {std.map((std) => (
                        <option key={std.Id} value={std.Id}>
                          {std.Title}
                        </option>
                      ))}
                    </select>
                    <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                      <BsChevronDown />
                    </span>
                    {formik.touched.StandardId && formik.errors.StandardId && (
                      <small className="text-red-500">
                        {formik.errors.StandardId}
                      </small>
                    )}
                  </div>
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Select Subject<span className="text-danger">*</span>
                  </label>
                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <select
                      name="SubjectId"
                      value={formik.values.SubjectId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="relative z-20   w-full appearance-none rounded border border-stroke bg-transparent py-1.5   px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                    >
                      {subject.map((subject) => (
                        <option key={subject.Id} value={subject.Id}>
                          {subject.Title}
                        </option>
                      ))}
                    </select>
                    <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                      <BsChevronDown />
                    </span>
                    {formik.touched.SubjectId && formik.errors.SubjectId && (
                      <small className="text-red-500">
                        {formik.errors.SubjectId}
                      </small>
                    )}
                  </div>
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Chapter Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="Title"
                    value={formik.values.Title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Chapter Name"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />

                  {formik.touched.Title && formik.errors.Title && (
                    <small className="text-red-500">
                      {formik.errors.Title}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Slug <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="Slug"
                    value={formik.values.Slug}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Slug"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />

                  {formik.touched.Slug && formik.errors.Slug && (
                    <small className="text-red-500">{formik.errors.Slug}</small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Icon <span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    name="Image"
                    onChange={(event) => {
                      formik.setFieldValue(
                        'Image',
                        event.currentTarget.files[0],
                      );
                    }}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />

                  {formik.touched.icon && formik.errors.icon && (
                    <small className="text-red-500">{formik.errors.icon}</small>
                  )}
                  <p>Please select an a jpg, png, gif, jpeg, webp file only.</p>
                </div>
                <div className="mt-5">
                  <p>Your Exsisting Img File</p>
                  <div className="grid grid-cols-4 gap-2 relative">
                    <div className="relative">
                      <img
                        src={formik.values.Image}
                        alt=""
                        className="rounded border p-2 h-28 w-28"
                      />
                    </div>
                  </div>
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

export default ChapterEdit;
