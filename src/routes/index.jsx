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
];

const routes = [...coreRoutes];
export default routes;
