import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'
// Dashboard pages
const Overview = () => import(/* webpackChunkName: "widgets" */ 'src/components/Dashboard/Views/Dashboard/Overview.vue')
const Widgets = () => import(/* webpackChunkName: "widgets" */ 'src/components/Dashboard/Views/Dashboard/Widgets.vue')

// Pages
import User from 'src/components/Dashboard/Views/Pages/UserProfile.vue'
import TimeLine from 'src/components/Dashboard/Views/Pages/TimeLinePage.vue'
import Login from 'src/components/Dashboard/Views/Pages/Login.vue'
import Register from 'src/components/Dashboard/Views/Pages/Register.vue'
import Lock from 'src/components/Dashboard/Views/Pages/Lock.vue'

// Components pages
import Buttons from 'src/components/Dashboard/Views/Components/Buttons.vue'
import GridSystem from 'src/components/Dashboard/Views/Components/GridSystem.vue'
import Panels from 'src/components/Dashboard/Views/Components/Panels.vue'
import SweetAlert from 'src/components/Dashboard/Views/Components/SweetAlert.vue'
import Notifications from 'src/components/Dashboard/Views/Components/Notifications.vue'
import Icons from 'src/components/Dashboard/Views/Components/Icons.vue'
import Typography from 'src/components/Dashboard/Views/Components/Typography.vue'

// Forms pages
const RegularForms  = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/RegularForms.vue')
const ExtendedForms = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/ExtendedForms.vue')
const ValidationForms = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/ValidationForms.vue')
const CompanyForms = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/ValidationForms/FormCompany.vue')
const CompanyList = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Lists/ListCompany.vue')
const OfficeList = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Lists/ListOfficer.vue')
const CentralList = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Lists/ListCentral.vue')
const OperatorlList = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Lists/ListOperator.vue')
const AdvisorsList = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Lists/ListAdvisors.vue')
const ClientList = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Lists/ListClient.vue')
const MovementList = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Lists/ListMovement.vue')
const UserControlList = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Lists/ListUserControl.vue')
const OfficeForms = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/ValidationForms/FormOffice.vue')
const UserForms = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/FormUser.vue')
const UserList = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Lists/ListUser.vue')
// const TaskList = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Lists/ListTask.vue')
const Wizard = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/Wizard.vue')


// TableList pages
const RegularTables = () => import(/* webpackChunkName: "tables" */ 'src/components/Dashboard/Views/Tables/RegularTables.vue');
const ExtendedTables = () => import(/* webpackChunkName: "tables" */ 'src/components/Dashboard/Views/Tables/ExtendedTables.vue');
const PaginatedTables = () => import(/* webpackChunkName: "tables" */ 'src/components/Dashboard/Views/Tables/PaginatedTables.vue');
// Maps pages
const GoogleMaps = () => import(/* webpackChunkName: "maps" */ 'src/components/Dashboard/Views/Maps/GoogleMaps.vue')
const FullScreenMap = () => import(/* webpackChunkName: "maps" */ 'src/components/Dashboard/Views/Maps/FullScreenMap.vue')
const VectorMaps = () => import(/* webpackChunkName: "maps" */ 'src/components/Dashboard/Views/Maps/VectorMapsPage.vue');

// Calendar
import Calendar from 'src/components/Dashboard/Views/Calendar/CalendarRoute.vue'
// Charts
const Charts = () => import(/* webpackChunkName: "widgets" */ 'src/components/Dashboard/Views/Charts.vue')

let componentsMenu = {
  path: '/components',
  component: DashboardLayout,
  redirect: '/components/buttons',
  children: [
    {
      path: 'buttons',
      name: 'Buttons',
      component: Buttons
    },
    {
      path: 'grid-system',
      name: 'Grid System',
      component: GridSystem
    },
    {
      path: 'panels',
      name: 'Panels',
      component: Panels
    },
    {
      path: 'sweet-alert',
      name: 'Sweet Alert',
      component: SweetAlert
    },
    {
      path: 'notifications',
      name: 'Notifications',
      component: Notifications
    },
    {
      path: 'icons',
      name: 'Icons',
      component: Icons
    },
    {
      path: 'typography',
      name: 'Typography',
      component: Typography
    }

  ]
}
let formsMenu = {
  path: '/forms',
  component: DashboardLayout,
  redirect: '/forms/regular',
  children: [
    {
      path: 'regular',
      name: 'Regular Forms',
      component: RegularForms
    },
    {
      path: 'extended',
      name: 'Extended Forms',
      component: ExtendedForms
    },
    {
      path: 'validation',
      name: 'Validation Forms',
      component: ValidationForms
    },
    {
      path: 'company',
      name: 'Form Company',
      component: CompanyForms
    },
    {
      path: 'companyList',
      name: 'List Company',
      component: CompanyList
    },
    {
      path: 'office',
      name: 'List Office',
      component: OfficeForms
    },
    {
      path: 'OfficeList',
      name: 'Form Office',
      component: OfficeList
    },
    {
      path: 'CentralList',
      name: 'List Central',
      component: CentralList
    },
    {
      path: 'OperatorlList',
      name: 'List Operator',
      component: OperatorlList
    },
    {
      path: 'AdvisorsList',
      name: 'List Advisors',
      component: AdvisorsList
    },
    {
      path: 'ClientList',
      name: 'List Advisors',
      component: ClientList
    },
    {
      path: 'MovementList',
      name: 'List Movement',
      component: MovementList
    },
    {
      path: 'user',
      name: 'Form User',
      component: UserForms
    },
    {
      path: 'UserList',
      name: 'Form User',
      component: UserList
    },
    {
      path: 'UserControlList',
      name: 'List User Control',
      component: UserControlList
    },
    {
      path: 'wizard',
      name: 'Wizard',
      component: Wizard
    }
  ]
}

let tablesMenu = {
  path: '/table-list',
  component: DashboardLayout,
  redirect: '/table-list/regular',
  children: [
    {
      path: 'regular',
      name: 'Regular Tables',
      component: RegularTables
    },
    {
      path: 'extended',
      name: 'Extended Tables',
      component: ExtendedTables
    },
    {
      path: 'paginated',
      name: 'Paginated Tables',
      component: PaginatedTables
    }]
}

let mapsMenu = {
  path: '/maps',
  component: DashboardLayout,
  redirect: '/maps/google',
  children: [
    {
      path: 'google',
      name: 'Google Maps',
      component: GoogleMaps
    },
    {
      path: 'full-screen',
      name: 'Full Screen Map',
      component: FullScreenMap
    },
    {
      path: 'vector-map',
      name: 'Vector Map',
      component: VectorMaps
    }
  ]
}

let pagesMenu = {
  path: '/pages',
  component: DashboardLayout,
  redirect: '/pages/user',
  children: [
    {
      path: 'user',
      name: 'User Page',
      component: User
    },
    {
      path: 'timeline',
      name: 'Timeline Page',
      component: TimeLine
    }
  ]
}

let loginPage = {
  path: '/login',
  name: 'Login',
  component: Login
}

let registerPage = {
  path: '/register',
  name: 'Register',
  component: Register
}

let lockPage = {
  path: '/lock',
  name: 'Lock',
  component: Lock
}

const routes = [
  {
    path: '/',
    component: Login,
    redirect: '/login',
    children: [
      {
        path: 'calendar',
        name: 'Calendar',
        component: Calendar
      },
      {
        path: 'charts',
        name: 'Charts',
        component: Charts
      }
    ]
  },
  componentsMenu,
  formsMenu,
  tablesMenu,
  mapsMenu,
  pagesMenu,
  loginPage,
  registerPage,
  lockPage,
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'widgets',
        name: 'Widgets',
        component: Widgets
      }
    ]
  },
  {path: '*', component: NotFound}
];

export default routes
