import React, { useEffect, useState } from 'react';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { BiCategory, BiRupee } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { getAllDashbaord } from '../../API/DashboardApi.jsx';
import school from '../../images/icon/school.png';
import standard from '../../images/icon/standard.png';
import subject from '../../images/icon/book-stack.png';
import chapter from '../../images/icon/chapter.png';
import topic from '../../images/icon/trending-topic.png';
import income from '../../images/icon/income.png';

const ECommerce = () => {
  const [TotalSchoolCount, setTotalSchoolCount] = useState([]);
  const [TotalStandardCount, setTotalStandardCount] = useState([]);
  const [TotalSubjectCount, setTotalSubjectCount] = useState([]);
  const [TotalChapterCount, setTotalChapterCount] = useState([]);
  const [TotalTopicCount, setTotalTopicCount] = useState([]);
  const [TotalPayment, setTotalPayment] = useState([]);
  const [YearWiseDetails, setYearWiseDetails] = useState([]);
  const [ActiveInactiveSchoolDetails, setActiveInactiveSchoolDetails] =
    useState([]);

  const Navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Loading state
  // =============action button===============
  const fetchTotalStandardCount = async () => {
    try {
      const result = await getAllDashbaord();
      setTotalSchoolCount(result.TotalSchoolCount);
      setTotalStandardCount(result.TotalStandardCount);
      setTotalSubjectCount(result.TotalSubjectCount);
      setTotalChapterCount(result.TotalChapterCount);
      setTotalTopicCount(result.TotalTopicCount);
      setTotalPayment(result.TotalPayment);
      setYearWiseDetails(result.YearWiseDetails);
      setActiveInactiveSchoolDetails(result.ActiveInactiveSchoolDetails);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };
  useEffect(() => {
    fetchTotalStandardCount();
  }, []);
  // --------------------Income-------------------
  // Extract YearWiseDetails
  const YearWiseDetailslabels = YearWiseDetails.map(
    (country) => country.PaymentYear,
  );
  const YearWiseDetailsCounts = YearWiseDetails.map(
    (country) => country.TotalAmount,
  );
  // --------------------Income-------------------
  // Extract YearWiseDetails
  const ActiveInactiveSchoolDetailslabels = ActiveInactiveSchoolDetails.map(
    (country) => country.Title,
  );
  const ActiveInactiveSchoolDetailsCount = ActiveInactiveSchoolDetails.map(
    (country) => country.Count,
  );

  console.log(ActiveInactiveSchoolDetailsCount);

  // ----------------------Pie--------------------
  const PieChartdata = {
    labels: YearWiseDetailslabels,
    datasets: [
      {
        label: 'Income',
        data: YearWiseDetailsCounts,
        backgroundColor: ['#fd6285', '#50c0bf'],
        borderColor: ['#fd6285', '#50c0bf'],
        borderWidth: 1,
      },
    ],
  };
  // ----------------------Pie--------------------
  const ActiveInactiveChartdata = {
    labels: ActiveInactiveSchoolDetailslabels,
    datasets: [
      {
        label: 'Active / In-Active School',
        data: ActiveInactiveSchoolDetailsCount,
        backgroundColor: [
          '#fd6285',
          '#fd9e49',
          '#50c0bf',
          '#9968fc',
          '#3ca3e9',
        ],
        borderColor: ['#fd6285', '#fd9e49', '#50c0bf', '#9968fc', '#3ca3e9'],
        borderWidth: 1,
      },
    ],
  };

  const Pieoptions = {
    maintainAspectRatio: false, // Disable the default aspect ratio
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <Link to={'/school/listing'}>
          <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4 p-2">
              <img src={school} alt="" />
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  {TotalSchoolCount}
                </h4>
                <span className="text-sm font-medium">Total School</span>
              </div>
            </div>
          </div>
        </Link>

        <Link to={'/standard/listing'}>
          <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4 p-2">
              <img src={standard} alt="" />
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  {TotalStandardCount}
                </h4>
                <span className="text-sm font-medium">Total Standard</span>
              </div>
            </div>
          </div>
        </Link>

        <Link to={'/subject/listing'}>
          <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4 p-2">
              <img src={subject} alt="" />
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  {TotalSubjectCount}
                </h4>
                <span className="text-sm font-medium">Total Subject</span>
              </div>
            </div>
          </div>
        </Link>

        <Link to={'/chapter/listing'}>
          <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4 p-2">
              <img src={chapter} alt="" />
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  {TotalChapterCount}
                </h4>
                <span className="text-sm font-medium">Total Chapter</span>
              </div>
            </div>
          </div>
        </Link>
        <Link to={'/topic/listing'}>
          <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4 p-2">
              <img src={topic} alt="" />
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  {TotalTopicCount}
                </h4>
                <span className="text-sm font-medium">Total Topic</span>
              </div>
            </div>
          </div>
        </Link>
        <Link to={'/paymentreport'}>
          <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4 p-2">
              <img src={income} alt="" />
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  {TotalPayment}
                </h4>
                <span className="text-sm font-medium">Total Earning</span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 2xl:gap-7.5 my-7">
        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="h-80">
            <Bar data={PieChartdata} options={Pieoptions} />
          </div>
          <p className="text-center mt-3 font-bold">Total Events</p>
        </div>
        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="h-80">
            <Doughnut data={ActiveInactiveChartdata} options={Pieoptions} />
          </div>
          <p className="text-center mt-3 font-bold">
            Active / In-Active School
          </p>
        </div>
      </div>
    </div>
  );
};

export default ECommerce;
