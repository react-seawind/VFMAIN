import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { BsChevronDown } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { AddTopic } from '../../API/TopicAPI';
import { getAllChapter } from '../../API/ChapterApi';
import { getAllStandard } from '../../API/StandardApi';
import { getAllSubject } from '../../API/SubjectAPI';

const validationSchema = yup.object().shape({
  stdname: yup.string().required('Standard Name is required'),
  subname: yup.string().required('Subject Name is required'),
  chaptername: yup.string().required('Chapter Name is required'),
  topicname: yup.string().required('Topic Name is required'),
  slug: yup.string().required('Slug is required'),
  icon: yup.string().required('Icon is required'),
});

const TopicAdd = () => {
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

  // ------------chapter DATA-------------------
  const [chapter, setchapter] = useState([]);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const ChapterData = await getAllChapter();
        setchapter(ChapterData);
      } catch (error) {
        console.error('Error fetching Chapter:', error);
      }
    };
    fetchChapter();
  }, []);

  const formik = useFormik({
    initialValues: {
      stdname: '',
      subname: '',
      chaptername: '',
      topicname: '',
      slug: '',
      icon: '',
      Status: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      try {
        const formData = new FormData();
        formData.append('Title', values.Title);
        if (values.Image instanceof File) {
          formData.append('Image', values.Image);
        } else {
          formData.append('Image', values.Image);
        }
        formData.append('Content', values.Content);
        formData.append('Status', values.Status);

        await AddTopic(formData);
        actions.resetForm();
        navigate('/topic/listing');
      } catch (error) {
        console.error('Error adding topic:', error);
      }
    },
  });

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/topic/listing');
  };
  return (
    <div>
      <Breadcrumb pageName="Topic Add " />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Topic Add
              </h3>
              <p>
                Please fill all detail and add new Topic in your Topic directory
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
                      {std.map((std) => (
                        <option key={std.Id} value={std.Id}>
                          {std.Title}
                        </option>
                      ))}
                    </select>
                    <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                      <BsChevronDown />
                    </span>
                  </div>
                  {formik.touched.stdname && formik.errors.stdname && (
                    <small className="text-red-500">
                      {formik.errors.stdname}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Select Subject<span className="text-danger">*</span>
                  </label>
                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <select
                      name="subname"
                      onChange={formik.handleChange}
                      className="relative z-20   w-full appearance-none rounded border border-stroke bg-transparent py-1.5   px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                    >
                      <option>Select Subject</option>
                      {subject.map((subject) => (
                        <option key={subject.Id} value={subject.Id}>
                          {subject.Title}
                        </option>
                      ))}
                    </select>
                    <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                      <BsChevronDown />
                    </span>
                    {formik.touched.subname && formik.errors.subname && (
                      <small className="text-red-500">
                        {formik.errors.subname}
                      </small>
                    )}
                  </div>
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Select Chapter<span className="text-danger">*</span>
                  </label>
                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <select
                      name="chaptername"
                      onChange={formik.handleChange}
                      className="relative z-20   w-full appearance-none rounded border border-stroke bg-transparent py-1.5   px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                    >
                      <option>Select Chapter</option>
                      {chapter.map((chapter) => (
                        <option key={chapter.Id} value={chapter.Id}>
                          {chapter.Title}
                        </option>
                      ))}
                    </select>
                    <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                      <BsChevronDown />
                    </span>
                    {formik.touched.chaptername &&
                      formik.errors.chaptername && (
                        <small className="text-red-500">
                          {formik.errors.chaptername}
                        </small>
                      )}
                  </div>
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Topic Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="topicname"
                    onChange={formik.handleChange}
                    placeholder="Enter Topic Name"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />

                  {formik.touched.topicname && formik.errors.topicname && (
                    <small className="text-red-500">
                      {formik.errors.topicname}
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
                    name="icon"
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

export default TopicAdd;
