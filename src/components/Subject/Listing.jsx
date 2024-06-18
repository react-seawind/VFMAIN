// import React, { useEffect, useState } from 'react';
// import DataTable from 'react-data-table-component';
// import Breadcrumb from '../Breadcrumb';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { FaChevronDown } from 'react-icons/fa6';
// import { getServicedata } from '../API';
// import { deleteSubject, getAllSubject } from '../../API/SubjectAPI';
// import { format } from 'date-fns';

// const SubjectListing = () => {
//   const [subject, setsubject] = useState([]);
//   const [search, setsearch] = useState('');
//   const [filterdata, setfilterdata] = useState([]);

//   const Navigate = useNavigate();

//   // =============action button===============
//   const [selectedRow, setSelectedRow] = useState(null);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await getAllSubject();
//         setsubject(result);
//         setfilterdata(result);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);
//   // -------------------delete subject------------------
//   const handleDelete = async (row) => {
//     try {
//       await deleteSubject(row.Id);
//       setsubject((prevsubject) =>
//         prevsubject.filter((item) => item.Id !== row.Id),
//       );
//       setfilterdata((prevFilterData) =>
//         prevFilterData.filter((item) => item.Id !== row.Id),
//       );
//     } catch (error) {
//       console.error('Error deleting subject:', error);
//     }
//   };

//   useEffect(() => {
//     const mySearch = subject.filter(
//       (item) =>
//         item.Title && item.Title.toLowerCase().match(search.toLowerCase()),
//     );
//     setfilterdata(mySearch);
//   }, [search]);

//   const columns = [
//     {
//       name: '#',
//       selector: (row) => <h1 className="text-base">{row.Id}</h1>,
//     },
//     {
//       name: 'Title',
//       selector: (row) => <h1 className="text-base">{row.Title}</h1>,
//     },

//     {
//       name: 'Image',
//       selector: (row) => (
//         <img
//           className="p-2 overflow-hidden h-40 rounded-md w-40 border my-2 border-slate-200 bg-white "
//           src={row.Image}
//         />
//       ),
//     },
//     {
//       name: 'Status',
//       selector: (row) => {
//         const statusText = row.Status == '1' ? 'Active' : 'Inactive';
//         const statusColor =
//           row.Status == '1'
//             ? 'bg-green-600 text-white'
//             : 'bg-red-600 text-white';

//         return (
//           <span
//             className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded-full  ${statusColor}`}
//           >
//             {statusText}
//           </span>
//         );
//       },
//     },
//     {
//       name: 'Entry Date',
//       selector: (row) => (
//         <h1 className="text-base">
//           {format(new Date(row.EntDt), 'MM/dd/yyyy hh:mm a')}
//         </h1>
//       ),
//     },
//     {
//       name: 'Action',
//       cell: (row) => (
//         <div>
//           <div className="bg-red-600 text-white p-3 pl-5 w-26 flex relative">
//             <button>Actions</button>
//             <button
//               onClick={() => {
//                 setSelectedRow((prevRow) => (prevRow === row ? null : row));
//               }}
//             >
//               <FaChevronDown className=" my-auto ml-4 " />
//             </button>
//           </div>

//           {selectedRow && selectedRow.Id === row.Id && (
//             <div className="action-buttons  absolute z-99">
//               <button
//                 className="text-black bg-white border  p-2 w-26"
//                 onClick={() => {
//                   setSelectedRow(null);
//                   Navigate(`/subject/edit/${row.Id}`);
//                 }}
//               >
//                 Edit
//               </button>

//               <br />
//               <button
//                 className=" text-black bg-white border  p-2 w-26"
//                 onClick={() => {
//                   if (
//                     window.confirm(
//                       `Are you sure you want to delete ${row.Title}?`,
//                     )
//                   ) {
//                     handleDelete(row); // Call handleDelete function on click of delete button
//                   }
//                   setSelectedRow(null);
//                 }}
//               >
//                 Delete
//               </button>
//             </div>
//           )}
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <Breadcrumb pageName="Subject Listing" />
//       <div className="grid grid-cols-1 gap-9 ">
//         <div className="flex flex-col gap-9 ">
//           <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//             <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
//               <DataTable
//                 className="text-2xl"
//                 columns={columns}
//                 data={filterdata}
//                 pagination
//                 highlightOnHover
//                 actions={
//                   <Link
//                     to="/subject/add"
//                     className="bg-blue-500 text-white p-3 px-10 text-sm"
//                   >
//                     Add
//                   </Link>
//                 }
//                 subHeader
//                 subHeaderComponent={
//                   <input
//                     type="text"
//                     placeholder="search"
//                     className="text-start me-auto -mt-25 border-2 py-3 px-5"
//                     value={search}
//                     onChange={(e) => {
//                       setsearch(e.target.value);
//                     }}
//                   />
//                 }
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubjectListing;

import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { deleteSubject, getAllSubject } from '../../API/SubjectAPI';
import { format } from 'date-fns';
import ClipLoader from 'react-spinners/BounceLoader';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';

const SubjectListing = () => {
  const [Subject, setSubject] = useState([]);
  const [search, setsearch] = useState('');
  const [filterdata, setfilterdata] = useState([]);

  const Navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Loading state
  // =============action button===============
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllSubject();
        setSubject(result);
        setfilterdata(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, []);

  // -------------------delete Subject------------------
  const handleDelete = async (row) => {
    try {
      await deleteSubject(row.Id);
      setSubject((prevCategory) =>
        prevCategory.filter((item) => item.Id !== row.Id),
      );
      setfilterdata((prevFilterData) =>
        prevFilterData.filter((item) => item.Id !== row.Id),
      );
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };
  useEffect(() => {
    const mySearch = Subject.filter(
      (item) =>
        item.Title && item.Title.toLowerCase().match(search.toLowerCase()),
    );
    setfilterdata(mySearch);
  }, [search]);

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={rowData.Image}
        alt={rowData.Image}
        className="mx-auto border-round"
        style={{ width: '84px' }}
      />
    );
  };

  const actionTemplate = (rowData) => {
    return (
      <div>
        <Button
          icon={<FaPencilAlt />}
          className="border border-blue-600 text-blue-600 mr-2 rounded-full py-2.5"
          onClick={() => {
            Navigate(`/subject/edit/${rowData.Id}`);
          }}
        />
        <Button
          icon={<FaTrash />}
          className="border border-red-600 text-red-600 rounded-full py-2.5"
          onClick={() => {
            Swal.fire({
              title: 'Are you sure?',
              text: `You won't be able to revert this! Are you sure you want to delete ${rowData.Title}?`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!',
            }).then((result) => {
              if (result.isConfirmed) {
                handleDelete(rowData);
                Swal.fire(
                  'Deleted!',
                  `${rowData.Title} has been deleted.`,
                  'success',
                );
              }
            });
          }}
        />
      </div>
    );
  };

  return (
    <div>
      <Breadcrumb pageName="Subject Listing" />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9 ">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              {loading ? (
                <div className="flex justify-center items-center py-60">
                  <ClipLoader color={'#00afee'} loading={loading} size={40} />
                </div>
              ) : (
                <DataTable
                  value={filterdata}
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
                      <Link
                        to="/subject/add"
                        className="bg-blue-500 text-white p-3 px-10 text-sm"
                      >
                        Add
                      </Link>
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
                    field="Title"
                    header="Title"
                    sortable
                    className="border border-stroke"
                  />

                  <Column
                    field="image"
                    header="Image"
                    className="border border-stroke"
                    body={imageBodyTemplate}
                  ></Column>
                  <Column
                    field="Status"
                    header="Status"
                    className="border border-stroke"
                    body={(rowData) => (
                      <span
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                          rowData.Status === 1
                            ? 'bg-green-600 text-white'
                            : 'bg-red-600 text-white'
                        }`}
                      >
                        {rowData.Status === 1 ? 'Active' : 'Inactive'}
                      </span>
                    )}
                  />
                  <Column
                    field="EntDt"
                    header="Entry Date"
                    className="border border-stroke"
                    body={(rowData) =>
                      format(new Date(rowData.EntDt), 'MM/dd/yyyy hh:mm a')
                    }
                  />
                  <Column
                    header="Action"
                    className="border border-stroke"
                    body={actionTemplate}
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

export default SubjectListing;
