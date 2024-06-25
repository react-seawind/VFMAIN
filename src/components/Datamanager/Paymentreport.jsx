// import React, { useEffect, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { format } from 'date-fns';
// import { FaTrash } from 'react-icons/fa';
// import { deleteSchool, getAllSchool } from '../../API/SchoolAPI';
// import Swal from 'sweetalert2';
// import ClipLoader from 'react-spinners/BounceLoader';
// import { InputText } from 'primereact/inputtext';
// import { Column } from 'primereact/column';
// import { DataTable } from 'primereact/datatable';
// import { Button } from 'primereact/button';
// import Breadcrumb from '../Breadcrumb';
// import { CSVLink } from 'react-csv';

// const PaymentListing = () => {
//   const [payment, setpayment] = useState([]);
//   const [search, setsearch] = useState('');
//   const [filterData, setfilterData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [csvData, setCsvData] = useState([]);
//   const navigate = useNavigate();
//   const dt = useRef(null);

//   // =============action button===============
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await getAllSchool();
//         setpayment(result);
//         setfilterData(result);
//         setCsvData(
//           result.map((item) => ({
//             SubTitle: item.SubTitle,
//             Title: item.Title,
//           })),
//         );
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // -------------------delete payment------------------
//   const handleDelete = async (row) => {
//     try {
//       await deleteSchool(row.Id);
//       setpayment((prevpayment) =>
//         prevpayment.filter((item) => item.Id !== row.Id),
//       );
//       setfilterData((prevFilterData) =>
//         prevFilterData.filter((item) => item.Id !== row.Id),
//       );
//     } catch (error) {
//       console.error('Error deleting payment:', error);
//     }
//   };

//   const actionTemplate = (rowData) => {
//     return (
//       <div>
//         <Button
//           icon={<FaTrash />}
//           className="border border-red-600 text-red-600 rounded-full py-2.5"
//           onClick={() => {
//             Swal.fire({
//               title: 'Are you sure?',
//               text: `You won't be able to revert this! Are you sure you want to delete ${rowData.Title}?`,
//               icon: 'warning',
//               showCancelButton: true,
//               confirmButtonColor: '#3085d6',
//               cancelButtonColor: '#d33',
//               confirmButtonText: 'Yes, delete it!',
//             }).then((result) => {
//               if (result.isConfirmed) {
//                 handleDelete(rowData);
//                 Swal.fire(
//                   'Deleted!',
//                   `${rowData.Title} has been deleted.`,
//                   'success',
//                 );
//               }
//             });
//           }}
//         />
//       </div>
//     );
//   };

//   return (
//     <div>
//       <Breadcrumb pageName="Payment Report" />
//       <div className="grid grid-cols-1 gap-9 ">
//         <div className="flex flex-col gap-9 ">
//           <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//             <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark card">
//               {loading ? (
//                 <div className="flex justify-center items-center py-60">
//                   <ClipLoader color={'#00afee'} loading={loading} size={45} />
//                 </div>
//               ) : (
//                 <DataTable
//                   ref={dt}
//                   value={filterData}
//                   tableStyle={{
//                     minWidth: '50rem',
//                     border: '1px solid #e0e0e0',
//                   }}
//                   paginator
//                   rows={10}
//                   rowsPerPageOptions={[5, 10, 25]}
//                   emptyMessage="No Data found"
//                   globalFilter={search}
//                   header={
//                     <div className="flex justify-between pb-5 p-ai-center">
//                       <span className="p-input-icon-left">
//                         <i className="pi pi-search" />
//                         <InputText
//                           type="text"
//                           className="text-start me-auto text-sm border-2 py-2 mt-2 pl-2 md:pr-20 pr-5"
//                           onInput={(e) => setsearch(e.target.value)}
//                           placeholder="Search"
//                         />
//                       </span>
//                       <CSVLink
//                         data={csvData}
//                         headers={[
//                           { label: 'SubTitle', key: 'SubTitle' },
//                           { label: 'Title', key: 'Title' },
//                         ]}
//                         filename={'payment-data.csv'}
//                         className="bg-blue-500 text-white p-3 px-10 text-sm"
//                       >
//                         Export
//                       </CSVLink>
//                     </div>
//                   }
//                 >
//                   <Column
//                     field="Id"
//                     header="#"
//                     sortable
//                     className="border border-stroke"
//                   />
//                   <Column
//                     field="Title"
//                     header="Title"
//                     sortable
//                     className="border border-stroke"
//                   />
//                   <Column
//                     field="SubTitle"
//                     header="SubTitle"
//                     className="border border-stroke"
//                   />

//                   <Column
//                     field="EntDt"
//                     header="Entry Date"
//                     className="border border-stroke"
//                     body={(rowData) =>
//                       format(new Date(rowData.EntDt), 'MM/dd/yyyy hh:mm a')
//                     }
//                   />
//                   <Column
//                     header="Action"
//                     className="border border-stroke"
//                     body={actionTemplate}
//                   />
//                 </DataTable>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentListing;

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { FaTrash } from 'react-icons/fa';
import {
  deleteSchool,
  getAllSchool,
  getReportAllSchool,
} from '../../API/SchoolAPI';
import Swal from 'sweetalert2';
import ClipLoader from 'react-spinners/BounceLoader';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import Breadcrumb from '../Breadcrumb';
import { CSVLink } from 'react-csv';
import { getPaymentReportBySchoolId } from '../../API/PaymentAPI';

const PaymentReport = () => {
  const [school, setschool] = useState([]);
  const [search, setsearch] = useState('');
  const [filterData, setfilterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [csvData, setCsvData] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all'); // Default value 'Active'

  const dt = useRef(null);

  //====================Get School====================
  const [schoolData, setSchoolData] = useState([]);
  const fetchSchool = async () => {
    try {
      const result = await getAllSchool();
      setSchoolData(result);
    } catch (error) {
      console.error(error);
    }
  };
  // =============action button===============
  const fetchData = async () => {
    try {
      setLoading(true); // Set loading state for initial loading
      const result = await getPaymentReportBySchoolId(statusFilter);
      setschool(result);
      setfilterData(result);
      setCsvData(
        result.map((item) => ({
          Id: item.Id,
          SchoolId: item.SchoolId,
          SchoolName: item.SchoolName,
          SchoolEmail: item.SchoolEmail,
          SchoolPhone: item.SchoolPhone,
          UserName: item.UserName,
          UserEmail: item.UserEmail,
          UserPhone: item.UserPhone,
          Country: item.Country,
          State: item.State,
          City: item.City,
          Area: item.Area,
          Pincode: item.Pincode,
          Address: item.Address,
          WhatsApp: item.WhatsApp,
          Status: item.Status,
          Amount: item.Amount,
          PaymentMethod: item.PaymentMethod,
          PaymentStatus: item.PaymentStatus,
          PaymentDt: item.PaymentDt,
          StartDt: item.StartDt,
          EndDt: item.EndDt,
          EntDt: item.EntDt,
        })),
      );
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    fetchSchool();
  }, []);

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  useEffect(() => {
    const mySearch = school?.filter(
      (item) =>
        item.Amount && item.Amount.toLowerCase().match(search.toLowerCase()),
    );
    setfilterData(mySearch);
  }, [search]);
  return (
    <div>
      <Breadcrumb pageName="Payment Report" />
      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9 ">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark card">
              <div className="bg-[#7fc6e55c] p-3">
                <form className="">
                  <select
                    className="md:w-80 w-40 h-10 border form-control form-select"
                    value={statusFilter}
                    onChange={handleStatusChange}
                  >
                    <option value="all">All</option>
                    {schoolData.map((std) => (
                      <option key={std.Id} value={std.Id}>
                        {std.SchoolName}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="bg-white h-9.5 px-5 border"
                    onClick={fetchData}
                  >
                    View Report
                  </button>
                </form>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-60">
                  <ClipLoader color={'#00afee'} loading={loading} size={45} />
                </div>
              ) : (
                <DataTable
                  ref={dt}
                  value={filterData}
                  tableStyle={{
                    minWidth: '50rem',
                    border: '1px solid #e0e0e0',
                  }}
                  paginator
                  rows={10}
                  rowsPerPageOptions={[5, 10, 25]}
                  emptyMessage="No Data found"
                  globalFilter={search}
                  header={
                    <div className="flex justify-between pb-5 p-ai-center">
                      <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText
                          type="text"
                          className="text-start me-auto text-sm border-2 py-2 mt-2 pl-2 md:pr-20 pr-5"
                          onInput={(e) => setsearch(e.target.value)}
                          placeholder="Search"
                        />
                      </span>
                      <CSVLink
                        data={csvData}
                        headers={[
                          { label: 'Id', key: 'Id' },
                          { label: 'SchoolId', key: 'SchoolId' },
                          { label: 'SchoolName', key: 'SchoolName' },
                          { label: 'SchoolEmail', key: 'SchoolEmail' },
                          { label: 'SchoolPhone', key: 'SchoolPhone' },
                          { label: 'UserName', key: 'UserName' },
                          { label: 'UserEmail', key: 'UserEmail' },
                          { label: 'UserPhone', key: 'UserPhone' },
                          { label: 'Country', key: 'Country' },
                          { label: 'State', key: 'State' },
                          { label: 'City', key: 'City' },
                          { label: 'Area', key: 'Area' },
                          { label: 'Pincode', key: 'Pincode' },
                          { label: 'Address', key: 'Address' },
                          { label: 'WhatsApp', key: 'WhatsApp' },
                          { label: 'Status', key: 'Status' },
                          { label: 'Amount', key: 'Amount' },
                          { label: 'PaymentMethod', key: 'PaymentMethod' },
                          { label: 'PaymentStatus', key: 'PaymentStatus' },
                          { label: 'PaymentDt', key: 'PaymentDt' },
                          { label: 'StartDt', key: 'StartDt' },
                          { label: 'EndDt', key: 'EndDt' },
                          { label: 'EntDt', key: 'EntDt' },
                        ]}
                        filename={'payment-data.csv'}
                        className="bg-blue-500 text-white p-3 px-10 text-sm"
                      >
                        Export
                      </CSVLink>
                    </div>
                  }
                >
                  <Column
                    field="Id"
                    header="#"
                    sortable
                    className="border border-stroke"
                  />
                  <Column
                    field="SchoolName"
                    header="SchoolName"
                    sortable
                    className="border border-stroke"
                  />
                  <Column
                    field="SchoolEmail"
                    header="SchoolEmail"
                    sortable
                    className="border border-stroke"
                  />
                  <Column
                    field="SchoolPhone"
                    header="SchoolPhone"
                    sortable
                    className="border border-stroke"
                  />
                  <Column
                    field="Amount"
                    header="Amount"
                    sortable
                    className="border border-stroke"
                  />
                  <Column
                    field="PaymentMethod"
                    header="PaymentMethod"
                    sortable
                    className="border border-stroke"
                  />

                  <Column
                    field="PaymentStatus"
                    header="PaymentStatus"
                    className="border border-stroke"
                    body={(rowData) => (
                      <span
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                          rowData.PaymentStatus === 'PAID'
                            ? 'bg-green-600 text-white'
                            : 'bg-red-600 text-white'
                        }`}
                      >
                        {rowData.PaymentStatus === 'PAID' ? 'Paid' : 'Pending'}
                      </span>
                    )}
                  />
                  <Column
                    field="PaymentDt"
                    header="Payment Date"
                    className="border border-stroke"
                    body={(rowData) =>
                      format(new Date(rowData.PaymentDt), 'MM/dd/yyyy')
                    }
                  />
                  <Column
                    field="StartDt"
                    header="Start Date"
                    className="border border-stroke"
                    body={(rowData) =>
                      format(new Date(rowData.StartDt), 'MM/dd/yyyy')
                    }
                  />
                  <Column
                    field="EndDt"
                    header="End Date"
                    className="border border-stroke"
                    body={(rowData) =>
                      format(new Date(rowData.EndDt), 'MM/dd/yyyy')
                    }
                  />
                </DataTable>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentReport;
