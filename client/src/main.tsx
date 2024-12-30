import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './css/style.css';
import './css/satoshi.css';
import 'flatpickr/dist/flatpickr.min.css';
import 'jsvectormap'
import { createBrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import EmployeeRegisterForm from './components/EmployeeRegisterForm.tsx'
import EmployeeLoginForm from './components/EmployeeLoginForm.tsx'
import EmployeeAuth from './pages/EmployeeAuth.tsx'
import EmployerAuth from './pages/EmployerAuth.tsx'
import EmployerLoginForm from './components/EmployerLoginForm.tsx'
import EmployerRegisterForm from './components/EmployerRegisterForm.tsx'
import Search from './pages/Search.tsx'
import EmployeeSearch from './pages/EmployeeSearch.tsx'
import Home from './pages/Home.tsx'
import CompanyApp from './CompanyApp.tsx'
import CompanyHome from './pages/CompanyHome.tsx'
import CompanyProfile from './pages/CompanyProfile.tsx'
import CompanyProfileEdit from './pages/CompanyProfileEdit.tsx'
import CompanyCreateJob from './pages/CompanyCreateJob.tsx'
import CompanyEditJob from './pages/CompanyEditJob.tsx'
import CompanyJobs from './pages/CompanyJobs.tsx'
import CompanyJobApplications from './pages/CompanyJobApplications.tsx'
import ApplicantProfile from './pages/ApplicantProfile.tsx'
import EmployeeCompany from './pages/EmployeeCompany.tsx'
import EmployeeJobDetail from './pages/EmployeeJobDetail.tsx'
import EmployeeCompanyDetail from './pages/EmployeeCompanyDetail.tsx'
import EmployeeProfile from './pages/EmployeeProfile.tsx'
import EmployeeProfileEdit from './pages/EmployeeProfileEdit.tsx'
import EmployeeProfileEditCertification from './pages/EmployeeProfileEditCertification.tsx'
import EmployeeProfileEditEducation from './pages/EmployeeProfileEditEducation.tsx'
import EmployeeProfileEditSkills from './pages/EmployeeProfileEditSkills.tsx'
import EmployeeJobApplication from './pages/EmployeeJobApplication.tsx'

// Import admin components
import ECommerce from './pages/Dashboard/ECommerce';
import Calendar from './pages/Calendar';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Chart from './pages/Chart';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import DefaultLayout from './layout/DefaultLayout';
const router = createBrowserRouter([
  {
      path: '/',
      element: <App />,
      children: [
          {
              path: '/',
              element: <Home />
          },
          {
            path: '/employee-search',
            element: <EmployeeSearch />
        },
          {
              path: '/search',
              element: <Search />
          },
          {
            path: '/companyAll',
            element: <EmployeeCompany />
          },
          {
            path: '/job/:id',
            element: <EmployeeJobDetail />
          },
          {
            path: 'job-applications',
            element: <EmployeeJobApplication />
        },
          {
            path: '/companyAllDetail/:id',
            element: <EmployeeCompanyDetail />
        },
        {
            path: '/profile/:id',
            element: <EmployeeProfile />
        },
        {
            path: '/profile/:id/edit',
            element: <EmployeeProfileEdit />
        },
        {
            path: '/profile/:id/edit/education',
            element: <EmployeeProfileEditEducation />
        },
        {
            path: '/profile/:id/edit/certification',
            element: <EmployeeProfileEditCertification />
        },
        {
            path: '/profile/:id/edit/skills',
            element: <EmployeeProfileEditSkills />
        },
         
      ]
  },
  {
      path: '/auth',
      element: <EmployeeAuth />,
      children: [
          {
              path: '/auth/login',
              element: <EmployeeLoginForm />
          },
          {
              path: '/auth/register',
              element: <EmployeeRegisterForm />
          }
      ]
  },
  {
      path: '/employer/auth',
      element: <EmployerAuth />,
      children: [
          {
              path: '/employer/auth/login',
              element: <EmployerLoginForm />
          },
          {
              path: '/employer/auth/register',
              element: <EmployerRegisterForm />
          }
      ]

  },
  {
      path: '/employer',
      element: <CompanyApp />,
      children: [
          {
              path: '',
              element: <CompanyHome />
          },
          {
            path: 'profile/:id',
            element: <CompanyProfile />
        },
        {
            path: 'profile/edit',
            element: <CompanyProfileEdit />
        },
        {
            path: 'jobs',
            element: <CompanyJobs />
        },
        {
            path: 'jobs/create',
            element: <CompanyCreateJob />
        },
        {
            path: 'jobs/:id/edit',
            element: <CompanyEditJob />
        },
        {
            path: 'jobApplications',
            element: <CompanyJobApplications />
        },
        {
            path: 'jobApplications/applicant/:id',
            element: <ApplicantProfile />
        }
  
      ]
  },
  {
    path: '/admin',
   
    children: [
      {
        path: '',
        element:  <DefaultLayout><ECommerce /></DefaultLayout>
      },
      {
        path: 'calendar',
        element: <DefaultLayout><Calendar /></DefaultLayout> 
      },
      {
        path: 'profile',
        element:  <Profile />
      },
      {
        path: 'settings',
        element:  <DefaultLayout><Settings /></DefaultLayout>
      },
      {
        path: 'chart',
        element:  <DefaultLayout><Chart /></DefaultLayout>
      },
      {
        path: 'tables',
        element:  <DefaultLayout><Tables /></DefaultLayout>
      },
      {
        path: 'ui/alerts',
        element: <DefaultLayout><Alerts /></DefaultLayout>
      },
      {
        path: 'ui/buttons',
        element: <DefaultLayout><Buttons /></DefaultLayout> 
      },
      {
        path: 'auth/signin',
        element: <DefaultLayout><SignIn /></DefaultLayout> 
      },
      {
        path: 'auth/signup',
        element: <DefaultLayout><SignUp /></DefaultLayout> 
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <React.StrictMode>
    <Provider store = {store}>
    <RouterProvider router = {router}/>,  
    </Provider>
  

  </React.StrictMode>,
)
