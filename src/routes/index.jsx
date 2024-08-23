import { lazy } from 'react';

import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import ECommerce from '../pages/Dashboard/ECommerce';
import SignIn from '../pages/Authentication/SignIn';
import SchoolListing from '../components/School/Listing';
import SchoolAdd from '../components/School/Add';
import SchoolEdit from '../components/School/Edit';
import PaymentListing from '../components/Payment/Listing';
import PaymentAdd from '../components/Payment/Add';
import MyQuillEditor from '../components/QuillEditor';
import StandardListing from '../components/Standard/Listing';
import StandardAdd from '../components/Standard/Add';
import StandardEdit from '../components/Standard/Edit';
import SubjectListing from '../components/Subject/Listing';
import SubjectAdd from '../components/Subject/Add';
import SubjectEdit from '../components/Subject/Edit';
import ChapterListing from '../components/Chapter/Listing';
import ChapterAdd from '../components/Chapter/Add';
import ChapterEdit from '../components/Chapter/Edit';
import TopicListing from '../components/Topic/Listing';
import TopicAdd from '../components/Topic/Add';
import TopicEdit from '../components/Topic/Edit';
import ChangePassword from '../components/School/ChangePassword';
import PaymentReport from '../components/Datamanager/Paymentreport';
import SchoolReport from '../components/Datamanager/Schoolreport';
import LMSListing from '../components/LMS/Listing';
import LMSAdd from '../components/LMS/Add';
import LMSEdit from '../components/LMS/Edit';
import LMSPaymentListing from '../components/LMS/PaymentListing';
import LMSPaymentAdd from '../components/LMS/PaymentAdd';

const coreRoutes = [
  {
    path: '/login',
    title: 'Login',
    component: SignIn,
  },
  {
    path: '/profile', //Profile
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/dashboard', //dashboard
    title: 'dashboard',
    component: ECommerce,
  },
  {
    path: '/settings', //Setting
    title: 'Settings',
    component: Settings,
  },

  // =================school=============
  {
    path: '/school/listing',
    component: SchoolListing,
  },
  {
    path: '/school/add',
    component: SchoolAdd,
  },
  {
    path: '/school/edit/:Id',
    component: SchoolEdit,
  },
  {
    path: '/school/changepassword/:Id',
    component: ChangePassword,
  },
  // -------------------
  // =================payment=============
  {
    path: '/school/payment/listing/:Id',
    component: PaymentListing,
  },
  {
    path: '/school/payment/add/:Id',
    component: PaymentAdd,
  },

  // =================REPOET=============
  {
    path: '/schoolreport',
    component: SchoolReport,
  },
  {
    path: '/paymentreport',
    component: PaymentReport,
  },
  {
    path: '/new',
    component: MyQuillEditor,
  },

  // =================standard=============
  {
    path: '/standard/listing',
    component: StandardListing,
  },
  {
    path: '/standard/add',
    component: StandardAdd,
  },
  {
    path: '/standard/edit/:Id',
    component: StandardEdit,
  },
  // =================subject=============
  {
    path: '/subject/listing',
    component: SubjectListing,
  },
  {
    path: '/subject/add',
    component: SubjectAdd,
  },
  {
    path: '/subject/edit/:Id',
    component: SubjectEdit,
  },
  // =================chapter=============
  {
    path: '/chapter/listing',
    component: ChapterListing,
  },
  {
    path: '/chapter/add',
    component: ChapterAdd,
  },
  {
    path: '/chapter/edit/:Id',
    component: ChapterEdit,
  },
  // =================topic=============
  {
    path: '/topic/listing',
    component: TopicListing,
  },
  {
    path: '/topic/add',
    component: TopicAdd,
  },
  {
    path: '/topic/edit/:Id',
    component: TopicEdit,
  },

  // =================lms=============
  {
    path: '/lms/listing',
    component: LMSListing,
  },
  {
    path: '/lms/add',
    component: LMSAdd,
  },
  {
    path: '/lms/edit/:Id',
    component: LMSEdit,
  },
  {
    path: '/lms/payment/listing/:Id',
    component: LMSPaymentListing,
  },
  {
    path: '/lms/payment/add/:Id',
    component: LMSPaymentAdd,
  },
];

const routes = [...coreRoutes];
export default routes;
