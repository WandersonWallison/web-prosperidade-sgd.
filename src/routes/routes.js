import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'
// Dashboard pages
const Overview = () => import(/* webpackChunkName: "widgets" */ 'src/components/Dashboard/Views/Dashboard/Overview.vue')
// dashbord home
const homeDashbord = () => import(/* webpackChunkName: "widgets" */ 'src/components/Dashboard/Views/Dashboard/homeDashbord.vue')
const homeDashbordCentral = () => import(/* webpackChunkName: "widgets" */ 'src/components/Dashboard/Views/Dashboard/homeDashbordCentral.vue')
const homeDashbordADM = () => import(/* webpackChunkName: "widgets" */ 'src/components/Dashboard/Views/Dashboard/homeDashbordADM.vue')

const homeDashbordAssessor = () => import(/* webpackChunkName: "widgets" */ 'src/components/Dashboard/Views/Dashboard/homeDashbordAssessor.vue')
const homeDashbordEscritorio = () => import(/* webpackChunkName: "widgets" */ 'src/components/Dashboard/Views/Dashboard/homeDashbordEscritorio.vue')

const Widgets = () => import(/* webpackChunkName: "widgets" */ 'src/components/Dashboard/Views/Dashboard/Widgets.vue')
// Pages
import User from 'src/components/Dashboard/Views/Pages/UserProfile.vue'
import TimeLine from 'src/components/Dashboard/Views/Pages/TimeLinePage.vue'
import Login from 'src/components/Dashboard/Views/Pages/Login.vue'
import Register from 'src/components/Dashboard/Views/Pages/Register.vue'
import NewPassword from 'src/components/Dashboard/Views/Pages/NewPassword.vue'
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

const CompanyForms = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/Empresa/FormCompany.vue')
const CompanyFormsEdit = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/Empresa/FormCompanyEdit.vue')
const CompanyList = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/Empresa/ListCompany.vue')

const OfficeList = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/Escritorio/ListOfficer.vue')
const OfficeForms = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/Escritorio/FormOffice.vue')
const OfficeFormsEdit = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/Escritorio/FormOfficeEdit.vue')

const TipoMovimentacaoForms = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/TipoMovimentacao/FormTipoMovimentacao.vue')
const TipoMovimentacaoEdit = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/TipoMovimentacao/FormTipoMovimentacaoEdit.vue')
const TipoMovimentacaoList = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/TipoMovimentacao/ListTipoMovimentacao.vue')

const TipoSituacaoMovimentoForms = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/TipoSituacaoMovimento/FormTipoSituacaoMovimento.vue')
const TipoSituacaoMovimentoEdit = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/TipoSituacaoMovimento/FormTipoSituacaoMovimentoEdit.vue')
const TipoSituacaoMovimentoList = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/TipoSituacaoMovimento/ListTipoSituacaoMovimento.vue')

const TipoSituacaoTributariaForms = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/TipoSituacaoTributaria/FormTipoSituacaoTributaria.vue')
const TipoSituacaoTributariaEdit = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/TipoSituacaoTributaria/FormTipoSituacaoTributariaEdit.vue')
const TipoSituacaoTributariaList = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/TipoSituacaoTributaria/ListTipoSituacaoTributaria.vue')


const TipoCentralForms = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/TipoCentral/FormTipoCentral.vue')
const TipoCentralEdit = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/TipoCentral/FormTipoCentralEdit.vue')
const TipoCentralList = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/TipoCentral/ListTipoCentral.vue')

const CentralForms = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/Central/FormCentral.vue')
const CentralEdit = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/Central/FormCentralEdit.vue')
const CentralList = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/Central/ListCentral.vue')

const OperatorList = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/Usuario/ListOperator.vue')
const AdvisorList = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Lists/ListAdvisor.vue')
const MovementList = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/Movimentacao/ListMovement.vue')
const MovementListAporteCliente = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/Movimentacao/ListMovementAporteCliente.vue')
const MovementListBoletaCliente = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/Movimentacao/ListMovementBoletaCliente.vue')
const MovementFormAtualizacao = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/Movimentacao/FormAtualizaMovimentacao.vue')
const MovementFormEdit = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/Movimentacao/FormMovementEdit.vue')
const MovementFormAporteCliente = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/Movimentacao/FormMovementAporteCliente.vue')
const MovementFormBoletaCliente = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/Movimentacao/FormMovementBoletaCliente.vue')
const MovementForm = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/Movimentacao/FormMovement.vue')
const ComissionList = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Lists/ListComission.vue')

const ClientList = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/Cliente/ListClient.vue')
const ClientForm = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/Cliente/FormClient.vue')
const ClientFormAporte = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/Cliente/FormClientAporte.vue')
const ClientFormEdit = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/Cliente/FormClientEdit.vue')

const UserControlList = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/Usuario/ListUserControl.vue')
const UserForms = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/Usuario/FormUser.vue')
const UserFormsEdit = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/Usuario/FormUserEdit.vue')
const UserList = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/Usuario/ListUser.vue')

const GroupList = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/Group/ListGroup.vue')
const GroupForm = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/Group/FormGroup.vue')
const GroupFormEdit = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/Group/FormGroupEdit.vue')

const LinkFormsEdit = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/Link/FormLinkEdit.vue')
const LinkList = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/Link/ListLink.vue')
const LinkForms = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/Link/FormLink.vue')

const TipoLinkEdit = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/TipoLink/FormTipoLinkEdit.vue')
const TipoLinkForms = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/TipoLink/FormTipoLink.vue')
const TipoLinkList = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/TipoLink/ListTipoLink.vue')

const ListItens = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/Import/ListItens.vue')
const ImportForm = () => import(/* webpackChunkName: "forms" */ 'src/components/Dashboard/Views/Forms/Import/FormImport.vue')
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
      path: 'companyEdit',
      name: 'Form Edit Company',
      component: CompanyFormsEdit
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
      path: 'OfficeFormsEdit',
      name: 'Edit Office',
      component: OfficeFormsEdit
    },
    {
      path: 'CentralForms',
      name: 'Form Central',
      component: CentralForms
    },
    {
      path: 'CentralEdit',
      name: 'Edit Central',
      component: CentralEdit
    },
    {
      path: 'CentralList',
      name: 'List Central',
      component: CentralList
    },
    {
      path: 'TipoMovimentacaoForms',
      name: 'Form Tipo Movimentacao',
      component: TipoMovimentacaoForms
    },
    {
      path: 'TipoMovimentacaoList',
      name: 'List Tipo Movimentacao',
      component: TipoMovimentacaoList
    },
    {
      path: 'TipoMovimentacaoEdit',
      name: 'Edit Tipo Movimentacao',
      component: TipoMovimentacaoEdit
    },
    //Tipo Situacao Movimento
    {
      path: 'TipoSituacaoMovimentoForms',
      name: 'Form Tipo Situacao Movimento',
      component: TipoSituacaoMovimentoForms
    },
    {
      path: 'TipoSituacaoMovimentoList',
      name: 'List Tipo Situacao Movimento',
      component: TipoSituacaoMovimentoList
    },
    {
      path: 'TipoSituacaoMovimentoEdit',
      name: 'Edit Tipo Situacao Movimento',
      component: TipoSituacaoMovimentoEdit
    },
    //Tipo Situacao Tributaria
    {
      path: 'TipoSituacaoTributariaForms',
      name: 'Form Tipo SituacaoTributaria',
      component: TipoSituacaoTributariaForms
    },
    {
      path: 'TipoSituacaoTributariaList',
      name: 'List Tipo Situacao Tributaria',
      component: TipoSituacaoTributariaList
    },
    {
      path: 'TipoSituacaoTributariaEdit',
      name: 'Edit Tipo Situacao Tributaria',
      component: TipoSituacaoTributariaEdit
    },
      //Tipo de Central
    {
      path: 'TipoCentralForms',
      name: 'Form Tipo Central',
      component: TipoCentralForms
    },
    {
      path: 'TipoCentralList',
      name: 'List Tipo Central',
      component: TipoCentralList
    },
    {
      path: 'TipoCentralEdit',
      name: 'Edit Tipo Central',
      component: TipoCentralEdit
    },
    {
      path: 'OperatorList',
      name: 'List Operator',
      component: OperatorList
    },
    {
      path: 'AdvisorList',
      name: 'List Advisors',
      component: AdvisorList
    },
    {
      path: 'ClientList',
      name: 'List Client',
      component: ClientList
    },
    {
      path: 'ClientForm',
      name: 'Form Client',
      component: ClientForm
    },
    {
      path: 'ClientFormEdit',
      name: 'Form Client Edit',
      component: ClientFormEdit
    },
    {
      path: 'ClientFormAporte',
      name: 'Form Client Aporte',
      component: ClientFormAporte
    },
    {
      path: 'MovementList',
      name: 'List Movement',
      component: MovementList
    },
    {
      path: 'MovementListAporteCliente',
      name: 'List Movement Aporte Cliente',
      component: MovementListAporteCliente
    },
    {
      path: 'MovementListBoletaCliente',
      name: 'List Movement Boleta Cliente',
      component: MovementListBoletaCliente
    },
    {
      path: 'MovementFormAporteCliente',
      name: 'Aporte Cliente Movement',
      component: MovementFormAporteCliente
    },
    {
      path: 'MovementFormBoletaCliente',
      name: 'Boleta Cliente Movement',
      component: MovementFormBoletaCliente
    },
    {
      path: 'MovementFormAtualizacao',
      name: 'List Movement Atualizacao',
      component: MovementFormAtualizacao
    },
    {
      path: 'MovementForm',
      name: 'Form Movement',
      component: MovementForm
    },
    {
      path: 'MovementFormEdit',
      name: 'Form Edit Movement',
      component: MovementFormEdit
    },
    {
      path: 'ComissionList',
      name: 'List Comission',
      component: ComissionList
    },
    {
      path: 'user',
      name: 'Form User',
      component: UserForms
    },
    {
      path: 'userEdit',
      name: 'Form User Edit',
      component: UserFormsEdit
    },
    {
      path: 'UserList',
      name: 'List User',
      component: UserList
    },
    {
      path: 'GroupForm',
      name: 'Form Group',
      component: GroupForm
    },
    {
      path: 'GroupList',
      name: 'List Group',
      component: GroupList
    },
    {
      path: 'GroupFormEdit',
      name: 'Edit Group',
      component: GroupFormEdit
    },
    {
      path: 'LinkList',
      name: 'List Link',
      component: LinkList
    },
    {
      path: 'LinkForms',
      name: 'Form Link',
      component: LinkForms
    },
    {
      path: 'LinkFormsEdit',
      name: 'Edit Link',
      component: LinkFormsEdit
    },
    {
      path: 'TipoLinkForms',
      name: 'Form Tipo Link',
      component: TipoLinkForms
    },
    {
      path: 'TipoLinkEdit',
      name: 'Edit Tipo Link',
      component: TipoLinkEdit
    },
    {
      path: 'TipoLinkList',
      name: 'List Tipo Link',
      component: TipoLinkList
    },
    {
      path: 'UserControlList',
      name: 'List User Control',
      component: UserControlList
    },
    {
      path: 'Import',
      name: 'Import List',
      component: ImportForm
    },
    {
      path: 'Itens',
      name: 'Itens List',
      component: ListItens
    },
    {
      path: 'wizard',
      name: 'Wizard',
      component: Wizard
    },
    {
      path: 'homeDashbord',
      name: 'homeDashbord',
      component: homeDashbord
    },
    {
      path: 'homeDashbordAssessor',
      name: 'homeDashbordAssessor',
      component: homeDashbordAssessor
    },
    {
      path: 'homeDashbordEscritorio',
      name: 'homeDashbordEscritorio',
      component: homeDashbordEscritorio
    },
    {
      path: 'homeDashbordADM',
      name: 'homeDashbordADM',
      component: homeDashbordADM
    },
    {
      path: 'homeDashbordCentral',
      name: 'homeDashbordCentral',
      component: homeDashbordCentral
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
let newPasswordPage = {
  path: '/newPassword',
  name: 'NewPassword',
  component: NewPassword
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
  newPasswordPage,
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
]
export default routes
