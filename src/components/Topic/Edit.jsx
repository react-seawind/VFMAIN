import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Logo from '../../images/logo.jpg';
import { BsChevronDown } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { getTopicById, updateTopicById } from '../../API/TopicAPI';
import { getAllChapter } from '../../API/ChapterApi';
import { getAllSubject } from '../../API/SubjectAPI';
import { getAllStandard } from '../../API/StandardApi';
import {
  getChapterBySubjectIdId,
  getSubjectByStandardId,
} from '../../API/CommonApi';
import FormLoader from '../../common/Loader/FormLoader';

const validationSchema = yup.object().shape({
  StandardId: yup.string().required('Standard is required'),
  SubjectId: yup.string().required('Subject is required'),
  ChapterId: yup.string().required('Chapter is required'),
  Title: yup.string().required('Subject Name is required'),
  Slug: yup.string().required('Slug is required'),
  Image: yup.string().required('Icon is required'),
});

const TopicEdit = () => {
  // ================ Get data by Id============
  const { Id } = useParams();
  const [imagePreview, setImagePreview] = useState();
  const fetchData = async () => {
    try {
      if (Id) {
        const TopicData = await getTopicById(Id);
        formik.setValues(TopicData);
        if (TopicData.Image) {
          setImagePreview(TopicData.Image); // Update image preview if image exists
        }
      } else {
        console.log('error');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
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

  // ------------chapter DATA-------------------
  const [chapter, setchapter] = useState([]);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      Id: Id,
      StandardId: '',
      SubjectId: '',
      ChapterId: '',
      Title: '',
      Slug: '',
      Image: '',
      Hid_Image: '',
      Status: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      setIsFormLoading(true);
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });

        await updateTopicById(formData);
        fetchData();
      } catch (error) {
        console.error('Error updating slider:', error);
      } finally {
        setIsFormLoading(false);
      }
    },
  });

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/topic/listing');
  };

  useEffect(() => {
    if (formik.values.StandardId) {
      const fetchSubject = async () => {
        try {
          const SubjectData = await getSubjectByStandardId(
            formik.values.StandardId,
          );
          setsubject(SubjectData);
        } catch (error) {
          console.error('Error fetching Subject:', error);
        }
      };
      fetchSubject();
    }
  }, [formik.values.StandardId]);
  useEffect(() => {
    if (formik.values.StandardId && formik.values.SubjectId) {
      const fetchStandard = async () => {
        try {
          const ChapterData = await getChapterBySubjectIdId(
            formik.values.StandardId,
            formik.values.SubjectId,
          );
          setchapter(ChapterData);
        } catch (error) {
          console.error('Error fetching Subject:', error);
        }
      };
      fetchStandard();
    }
  }, [formik.values.StandardId, formik.values.SubjectId]);
  return (
    <div>
      {isFormLoading && <FormLoader loading={isFormLoading} />}
      <Breadcrumb pageName="Topic Edit" />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Topic Edit
              </h3>
              <p>
                Please fill all detail and edit new Topic in your Topic
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
                      onChange={formik.handleChange}
                      className="relative z-20   w-full appearance-none rounded border border-stroke bg-transparent py-1.5   px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                    >
                      {std.length === 0 && (
                        <option disabled value="">
                          No Standard Available
                        </option>
                      )}
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
                      {subject.length === 0 && (
                        <option disabled value="">
                          No Standard Available
                        </option>
                      )}
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
                    Select Chapter<span className="text-danger">*</span>
                  </label>
                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <select
                      name="ChapterId"
                      value={formik.values.ChapterId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="relative z-20   w-full appearance-none rounded border border-stroke bg-transparent py-1.5   px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                    >
                      {chapter.length === 0 && (
                        <option disabled value="">
                          No Chapter Available
                        </option>
                      )}
                      {chapter.map((chapter) => (
                        <option key={chapter.Id} value={chapter.Id}>
                          {chapter.Title}
                        </option>
                      ))}
                    </select>
                    <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                      <BsChevronDown />
                    </span>
                    {formik.touched.ChapterId && formik.errors.ChapterId && (
                      <small className="text-red-500">
                        {formik.errors.ChapterId}
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
                    name="Title"
                    value={formik.values.Title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Topic Name"
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
                    onChange={(e) => {
                      let newSlug = e.target.value
                        .toLowerCase()
                        .trim()
                        .replace(/\s+/g, '-');
                      newSlug = newSlug.replace(/\//g, '-');
                      newSlug = newSlug.replace(/%/g, '');
                      newSlug = newSlug.replace(/&/g, '');
                      newSlug = newSlug.replace(/\?/g, '-');
                      formik.setFieldValue('Slug', newSlug);
                    }}
                    value={formik.values.Slug}
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
                  <div className="mt-5">
                    <p>Your Exsisting Img File</p>
                    <div className="grid grid-cols-4 gap-2 relative">
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt=""
                          className="rounded border p-2 h-28 w-28"
                        />
                      </div>
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

export default TopicEdit;
