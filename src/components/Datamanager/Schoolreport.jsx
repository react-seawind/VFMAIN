import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { FaTrash } from 'react-icons/fa';
import { deleteSchool, getAllSchool } from '../../API/SchoolAPI';
import Swal from 'sweetalert2';
import ClipLoader from 'react-spinners/BounceLoader';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import Breadcrumb from '../Breadcrumb';
import { CSVLink } from 'react-csv';

const SchoolListing = () => {
  const [school, setschool] = useState([]);
  const [search, setsearch] = useState('');
  const [filterData, setfilterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [csvData, setCsvData] = useState([]);
  const navigate = useNavigate();
  const dt = useRef(null);

  // =============action button===============
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllSchool();
        setschool(result);
        setfilterData(result);
        setCsvData(
          result.map((item) => ({
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
            Facebook: item.Facebook,
            Twitter: item.Twitter,
            LinkedIn: item.LinkedIn,
            Instagram: item.Instagram,
            Telegram: item.Telegram,
            Youtube: item.Youtube,
            Status: item.Status,
          })),
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // -------------------delete school------------------
  const handleDelete = async (row) => {
    try {
      await deleteSchool(row.Id);
      setschool((prevschool) =>
        prevschool.filter((item) => item.Id !== row.Id),
      );
      setfilterData((prevFilterData) =>
        prevFilterData.filter((item) => item.Id !== row.Id),
      );
    } catch (error) {
      console.error('Error deleting school:', error);
    }
  };

  const actionTemplate = (rowData) => {
    return (
      <div>
        <Button
          icon={<FaTrash />}
          className="border border-red-600 text-red-600 rounded-full py-2.5"
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
      </div>
    );
  };

  return (
    <div>
      <Breadcrumb pageName="School Report" />
      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9 ">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark card">
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
                          { label: 'Facebook', key: 'Facebook' },
                          { label: 'Twitter', key: 'Twitter' },
                          { label: 'LinkedIn', key: 'LinkedIn' },
                          { label: 'Instagram', key: 'Instagram' },
                          { label: 'Telegram', key: 'Telegram' },
                          { label: 'Youtube', key: 'Youtube' },
                          { label: 'Status', key: 'Status' },
                        ]}
                        filename={'school-data.csv'}
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
                    header="School Name"
                    sortable
                    className="border border-stroke"
                  />
                  <Column
                    field="SchoolEmail"
                    header="School Email"
                    className="border border-stroke"
                  />
                  <Column
                    field="SchoolPhone"
                    header="School Phone"
                    className="border border-stroke"
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

export default SchoolListing;
