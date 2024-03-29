import React, { useEffect } from 'react';
import Breadcrumb from '../Breadcrumb';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { getSchoolById, updateSchoolById } from '../../API/SchoolAPI';

const validationSchema = Yup.object().shape({
  SchoolName: Yup.string()
    // .matches(/^[A-Za-z]+$/, 'Only alphabets are allowed for this field')
    .required('School Name is required'),
  SchoolEmail: Yup.string().email().required('School Email is required'),
  SchoolPhone: Yup.string()
    .matches(/^[0-9]+$/, 'Only numbers are allowed for this field')
    .min(10, 'School Phone must be at least 10 characters')
    .max(10, 'School Phone must be at most 10 characters')
    .required('School Phone is required'),
  UserName: Yup.string()
    // .matches(/^[A-Za-z]+$/, 'Only alphabets are allowed for this field')
    .required('Name is required'),
  UserEmail: Yup.string().email().required('Email is required'),
  UserPhone: Yup.string()
    .matches(/^[0-9]+$/, 'Only numbers are allowed for this field')
    .min(10, 'User Phone must be at least 10 characters')
    .max(10, 'User Phone must be at most 10 characters')
    .required('Phone is required'),
  Country: Yup.string().required('Country is required'),
  State: Yup.string().required('State is required'),
  City: Yup.string().required('City is required'),
  Area: Yup.string().required('Area is required'),
  Pincode: Yup.string()
    .matches(/^[0-9]+$/, 'Only numbers are allowed for this field')
    .max(6, 'Pincode must be at most 6 characters')
    .min(6, 'Pincode must be at least 6 characters')
    .required('Pincode is required'),
  Address: Yup.string().required('Temporary/Current Address is required'),
  WhatsApp: Yup.string()
    .matches(/^[0-9]+$/, 'Only numbers are allowed for this field')
    .min(10, 'WhatsApp Number must be at least 10 characters')
    .max(10, 'WhatsApp Number must be at most 10 characters')
    .required('WhatsApp Number is required'),
  Facebook: Yup.string().required('Facebook is required'),
  Twitter: Yup.string().required('Twitter is required'),
  LinkedIn: Yup.string().required('LinkedIn is required'),
  Instagram: Yup.string().required('Instagram is required'),
  Youtube: Yup.string().required('Youtube is required'),
  Telegram: Yup.string().required('Telegram is required'),
  Photo: Yup.string().required('Photo is required'),
  AddressProof: Yup.string().required('AddressProof is required'),
  IdProof: Yup.string().required('Id Proof is required'),
  // Password: Yup.string().required('Password is required'),
});

const SchoolEdit = () => {
  // ================ Get data by Id============
  const { Id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (Id) {
          const SchoolData = await getSchoolById(Id);
          formik.setValues({
            Id: SchoolData.Id || '',
            SchoolName: SchoolData.SchoolName || '',
            SchoolEmail: SchoolData.SchoolEmail || '',
            SchoolPhone: SchoolData.SchoolPhone || '',
            UserName: SchoolData.UserName || '',
            UserEmail: SchoolData.UserEmail || '',
            UserPhone: SchoolData.UserPhone || '',
            Country: SchoolData.Country || '',
            State: SchoolData.State || '',
            City: SchoolData.City || '',
            Area: SchoolData.Area || '',
            Pincode: SchoolData.Pincode || '',
            Address: SchoolData.Address || '',
            WhatsApp: SchoolData.WhatsApp || '',
            Facebook: SchoolData.Facebook || '',
            Twitter: SchoolData.Twitter || '',
            LinkedIn: SchoolData.LinkedIn || '',
            Instagram: SchoolData.Instagram || '',
            Telegram: SchoolData.Telegram || '',
            Youtube: SchoolData.Youtube || '',
            Photo: SchoolData.Photo || '',
            Hid_Photo: SchoolData.Hid_Photo || '',
            AddressProof: SchoolData.AddressProof || '',
            Hid_AddressProof: SchoolData.Hid_AddressProof || '',
            IdProof: SchoolData.IdProof || '',
            Hid_IdProof: SchoolData.Hid_IdProof || '',

            Status: SchoolData.Status || '',
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
  const formik = useFormik({
    initialValues: {
      Id: Id,
      SchoolName: '',
      SchoolEmail: '',
      SchoolPhone: '',
      UserName: '',
      UserEmail: '',
      UserPhone: '',
      Country: '',
      State: '',
      City: '',
      Area: '',
      Pincode: '',
      Address: '',
      WhatsApp: '',
      Facebook: '',
      Twitter: '',
      LinkedIn: '',
      Instagram: '',
      Telegram: '',
      Youtube: '',
      Photo: null,
      Hid_Photo: '',
      AddressProof: null,
      Hid_AddressProof: '',
      IdProof: null,
      Hid_IdProof: '',
      Status: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      try {
        const formData = new FormData();
        formData.append('Id', values.Id);
        formData.append('SchoolName', values.SchoolName);
        formData.append('SchoolEmail', values.SchoolEmail);
        formData.append('SchoolPhone', values.SchoolPhone);
        formData.append('UserName', values.UserName);
        formData.append('UserEmail', values.UserEmail);
        formData.append('UserPhone', values.UserPhone);
        formData.append('Country', values.Country);
        formData.append('State', values.State);
        formData.append('City', values.City);
        formData.append('Area', values.Area);
        formData.append('Pincode', values.Pincode);
        formData.append('Address', values.Address);
        formData.append('WhatsApp', values.WhatsApp);
        formData.append('Facebook', values.Facebook);
        formData.append('Twitter', values.Twitter);
        formData.append('LinkedIn', values.LinkedIn);
        formData.append('Instagram', values.Instagram);
        formData.append('Telegram', values.Telegram);
        formData.append('Youtube', values.Youtube);
        if (values.Photo instanceof File) {
          formData.append('Photo', values.Photo);
        } else {
          formData.append('Photo', values.Photo);
        }
        if (values.Hid_Photo instanceof File) {
          formData.append('Hid_Photo', values.Hid_Photo);
        } else {
          formData.append('Hid_Photo', values.Hid_Photo);
        }
        if (values.AddressProof instanceof File) {
          formData.append('AddressProof', values.AddressProof);
        } else {
          formData.append('AddressProof', values.AddressProof);
        }
        if (values.Hid_AddressProof instanceof File) {
          formData.append('Hid_AddressProof', values.Hid_AddressProof);
        } else {
          formData.append('Hid_AddressProof', values.Hid_AddressProof);
        }
        if (values.IdProof instanceof File) {
          formData.append('IdProof', values.IdProof);
        } else {
          formData.append('IdProof', values.IdProof);
        }
        if (values.Hid_IdProof instanceof File) {
          formData.append('Hid_IdProof', values.Hid_IdProof);
        } else {
          formData.append('Hid_IdProof', values.Hid_IdProof);
        }

        formData.append('Status', values.Status);
        await updateSchoolById(formData);
      } catch (error) {
        console.error('Error updating slider:', error);
      }
    },
  });

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/school/listing');
  };

  return (
    <div>
      <Breadcrumb pageName="School Edit" />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* Input Fields */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                School Add
              </h3>
              <p>
                Please fill all detail and add new School in your School
                directory
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <input
                type="hidden"
                name="Hid_IdProof"
                value={formik.values.Hid_IdProof}
              />
              <input
                type="hidden"
                name="Hid_AddressProof"
                value={formik.values.Hid_AddressProof}
              />
              <input
                type="hidden"
                name="Hid_Photo"
                value={formik.values.Hid_Photo}
              />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    School Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="SchoolName"
                    value={formik.values.SchoolName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your School Name"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.SchoolName && formik.errors.SchoolName && (
                    <small className="text-red-500">
                      {formik.errors.SchoolName}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    School Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="SchoolEmail"
                    value={formik.values.SchoolEmail}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your School Email"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.SchoolEmail && formik.errors.SchoolEmail && (
                    <small className="text-red-500">
                      {formik.errors.SchoolEmail}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    School Phone <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="SchoolPhone"
                    value={formik.values.SchoolPhone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your School Phone"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.SchoolPhone && formik.errors.SchoolPhone && (
                    <small className="text-red-500">
                      {formik.errors.SchoolPhone}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="UserName"
                    value={formik.values.UserName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Name"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.UserName && formik.errors.UserName && (
                    <small className="text-red-500">
                      {formik.errors.UserName}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="UserEmail"
                    value={formik.values.UserEmail}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Email"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.UserEmail && formik.errors.UserEmail && (
                    <small className="text-red-500">
                      {formik.errors.UserEmail}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Phone <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="UserPhone"
                    value={formik.values.UserPhone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Phone"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.UserPhone && formik.errors.UserPhone && (
                    <small className="text-red-500">
                      {formik.errors.UserPhone}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Country <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="Country"
                    value={formik.values.Country}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Country"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Country && formik.errors.Country && (
                    <small className="text-red-500">
                      {formik.errors.Country}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    State <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="State"
                    value={formik.values.State}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your State"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.State && formik.errors.State && (
                    <small className="text-red-500">
                      {formik.errors.State}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    City <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="City"
                    value={formik.values.City}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your City"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.City && formik.errors.City && (
                    <small className="text-red-500">{formik.errors.City}</small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Area <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="Area"
                    value={formik.values.Area}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Area"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Area && formik.errors.Area && (
                    <small className="text-red-500">{formik.errors.Area}</small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Pincode <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="Pincode"
                    value={formik.values.Pincode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Pincode"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Pincode && formik.errors.Pincode && (
                    <small className="text-red-500">
                      {formik.errors.Pincode}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Address <span className="text-danger">*</span>
                  </label>

                  <textarea
                    rows={1}
                    name="Address"
                    value={formik.values.Address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Permanent/Home Address"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  ></textarea>
                  {formik.touched.Address && formik.errors.Address && (
                    <small className="text-red-500">
                      {formik.errors.Address}
                    </small>
                  )}
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    WhatsApp Number
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="WhatsApp"
                    value={formik.values.WhatsApp}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your WhatsApp Number
                    "
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.WhatsApp && formik.errors.WhatsApp && (
                    <small className="text-red-500">
                      {formik.errors.WhatsApp}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Facebook <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="Facebook"
                    value={formik.values.Facebook}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Facebook"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Facebook && formik.errors.Facebook && (
                    <small className="text-red-500">
                      {formik.errors.Facebook}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Twitter <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="Twitter"
                    value={formik.values.Twitter}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Twitter"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Twitter && formik.errors.Twitter && (
                    <small className="text-red-500">
                      {formik.errors.Twitter}
                    </small>
                  )}
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    LinkedIn <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="LinkedIn"
                    value={formik.values.LinkedIn}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your LinkedIn"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.LinkedIn && formik.errors.LinkedIn && (
                    <small className="text-red-500">
                      {formik.errors.LinkedIn}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Instagram <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="Instagram"
                    value={formik.values.Instagram}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Instagram"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Instagram && formik.errors.Instagram && (
                    <small className="text-red-500">
                      {formik.errors.Instagram}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Telegram <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="Telegram"
                    value={formik.values.Telegram}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Telegram"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Telegram && formik.errors.Telegram && (
                    <small className="text-red-500">
                      {formik.errors.Telegram}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Youtube <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="Youtube"
                    value={formik.values.Youtube}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Youtube"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Youtube && formik.errors.Youtube && (
                    <small className="text-red-500">
                      {formik.errors.Youtube}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Photo
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    name="Photo"
                    onChange={(event) => {
                      formik.setFieldValue(
                        'Photo',
                        event.currentTarget.files[0],
                      );
                    }}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                  {formik.touched.Photo && formik.errors.Photo && (
                    <small className="text-red-500">
                      {formik.errors.Photo}
                    </small>
                  )}

                  <p>Please select an a jpg, png, gif, jpeg, webp file only.</p>
                  <div className="mt-5">
                    <p>Your Exsisting Img File</p>
                    <div className="grid grid-cols-4 gap-2 relative">
                      <div className="relative">
                        <img
                          src={formik.values.Photo}
                          alt=""
                          className="rounded border p-2 h-28 w-28"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Address Proof
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    name="AddressProof"
                    onChange={(event) => {
                      formik.setFieldValue(
                        'AddressProof',
                        event.currentTarget.files[0],
                      );
                    }}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                  {formik.touched.AddressProof &&
                    formik.errors.AddressProof && (
                      <small className="text-red-500">
                        {formik.errors.AddressProof}
                      </small>
                    )}

                  <p>Please select an a jpg, png, gif, jpeg, webp file only.</p>
                  <div className="mt-5">
                    <p>Your Exsisting Img File</p>
                    <div className="grid grid-cols-4 gap-2 relative">
                      <div className="relative">
                        <img
                          src={formik.values.AddressProof}
                          alt=""
                          className="rounded border p-2 h-28 w-28"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    IdProof
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    name="IdProof"
                    onChange={(event) => {
                      formik.setFieldValue(
                        'IdProof',
                        event.currentTarget.files[0],
                      );
                    }}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                  {formik.touched.IdProof && formik.errors.IdProof && (
                    <small className="text-red-500">
                      {formik.errors.IdProof}
                    </small>
                  )}
                  <p>Please select an a jpg, png, gif, jpeg, webp file only.</p>
                  <div className="mt-5">
                    <p>Your Exsisting Img File</p>
                    <div className="grid grid-cols-4 gap-2 relative">
                      <div className="relative">
                        <img
                          src={formik.values.IdProof}
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

export default SchoolEdit;
