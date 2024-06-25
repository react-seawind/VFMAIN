import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { getPaymentById } from '../../API/PaymentAPI';
import { format } from 'date-fns';
import ClipLoader from 'react-spinners/BounceLoader';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

const PaymentListing = () => {
  const [Payment, setPayment] = useState([]);
  const [search, setsearch] = useState('');
  const [filterdata, setfilterdata] = useState([]);

  const { Id } = useParams();
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Loading state
  // =============action button===============
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPaymentById(Id);
        setPayment(result);
        setfilterdata(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const mySearch = Payment?.filter(
      (item) =>
        item.Amount && item.Amount.toLowerCase().match(search.toLowerCase()),
    );
    setfilterdata(mySearch);
  }, [search]);

  return (
    <div>
      <Breadcrumb pageName="Payment Listing" />

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
                        to={`/school/payment/add/${Id}`}
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

export default PaymentListing;
