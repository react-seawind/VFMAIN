import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { deleteSchool, getAllSchool } from '../../API/SchoolAPI';
import { format } from 'date-fns';
import ClipLoader from 'react-spinners/BounceLoader';
import { FaLock, FaPencilAlt, FaRupeeSign, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { IoKeyOutline } from 'react-icons/io5';

const SchoolListing = () => {
  const [School, setSchool] = useState([]);
  const [search, setsearch] = useState('');
  const [filterdata, setfilterdata] = useState([]);

  const Navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Loading state
  // =============action button===============
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllSchool();
        setSchool(result);
        setfilterdata(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, []);

  // -------------------delete School------------------
  const handleDelete = async (row) => {
    try {
      await deleteSchool(row.Id);
      setSchool((prevCategory) =>
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
    const mySearch = School.filter(
      (item) =>
        item.SchoolName &&
        item.SchoolName.toLowerCase().match(search.toLowerCase()),
    );
    setfilterdata(mySearch);
  }, [search]);

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={rowData.Photo}
        alt={rowData.Photo}
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
          className="border border-blue-600 text-blue-600 mr-2 rounded-full mt-3 py-2.5"
          onClick={() => {
            Navigate(`/school/edit/${rowData.Id}`);
          }}
        />
        <Button
          icon={<FaTrash />}
          className="border border-red-600 text-red-600 mr-2 rounded-full mt-3 py-2.5"
          onClick={() => {
            Swal.fire({
              title: 'Are you sure?',
              text: `You won't be able to revert this! Are you sure you want to delete ${rowData.SchoolName}?`,
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
                  `${rowData.SchoolName} has been deleted.`,
                  'success',
                );
              }
            });
          }}
        />
        <Button
          icon={<IoKeyOutline />}
          className="border border-green-600 text-green-600 mr-2 rounded-full mt-3 py-2.5"
          onClick={() => {
            Navigate(`/school/changepassword/${rowData.Id}`);
          }}
        />
        <Button
          icon={<FaRupeeSign />}
          className="border border-green-600 text-green-600 mr-2 rounded-full mt-3 py-2.5"
          onClick={() => {
            Navigate(`/school/payment/listing/${rowData.Id}`);
          }}
        />
      </div>
    );
  };

  return (
    <div>
      <Breadcrumb pageName="School Listing" />

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
                        to="/school/add"
                        className="bg-blue-500 text-white p-3 px-10 text-sm"
                      >
                        Add
                      </Link>
                    </div>
                  }
                >
                  <Column
                    header="#"
                    className="border border-stroke"
                    body={(rowData, { rowIndex }) => rowIndex + 1}
                  />
                  <Column
                    field="SchoolName"
                    header="School Name"
                    sortable
                    className="border border-stroke"
                  />
                  <Column
                    field="SchoolEmail"
                    header="School Email"
                    sortable
                    className="border border-stroke"
                  />
                  <Column
                    field="SchoolPhone"
                    header="School Phone"
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
                    field="ExpDt"
                    header="Expiry Date"
                    className="border border-stroke"
                    body={(rowData) =>
                      format(new Date(rowData.ExpDt), 'MM/dd/yyyy')
                    }
                  />
                  <Column
                    field="EntDt"
                    header="Entry Date"
                    className="border border-stroke"
                    body={(rowData) =>
                      format(new Date(rowData.EntDt), 'MM/dd/yyyy')
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

export default SchoolListing;
