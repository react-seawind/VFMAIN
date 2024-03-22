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
import PaymentEdit from '../components/Payment/Edit';
import Paymentreport from '../components/Datamanager/Paymentreport';
import Schoolreport from '../components/Datamanager/Schoolreport';
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
    path: '/school/edit',
    component: SchoolEdit,
  },
  // -------------------
  // =================payment=============
  {
    path: '/payment/listing',
    component: PaymentListing,
  },
  {
    path: '/payment/add',
    component: PaymentAdd,
  },
  {
    path: '/payment/edit',
    component: PaymentEdit,
  },
  // =================REPOET=============
  {
    path: '/schoolreport',
    component: Schoolreport,
  },
  {
    path: '/paymentreport',
    component: Paymentreport,
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
    path: '/standard/edit',
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
    path: '/subject/edit',
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
    path: '/chapter/edit',
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
    path: '/topic/edit',
    component: TopicEdit,
  },
];

const routes = [...coreRoutes];
export default routes;
