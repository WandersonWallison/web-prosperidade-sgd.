export default [
  {
    name: 'Home',
    icon: 'nc-icon nc-app',
    path: '/admin/overview'
  },
  {
    name: 'Dashbord',
    icon: 'nc-icon nc-chart-pie-36',
    children: [{
      name: 'Administrador',
      path: '/forms/homeDashbordADM'
    },
    {
      name: 'Escritorio',
      path: '/forms/homeDashbordEscritorio'
    },
    {
      name: 'Assessor',
      path: '/forms/homeDashbordAssessor'
    }]
    // path: '/admin/overview'
  },
 {
  name: 'Empreendimento',
  icon: 'nc-icon nc-bank',
  children: [{
    name: 'Empresa',
    path: '/forms/CompanyList'
  },
  {
    name: 'Central',
    path: '/forms/CentralList'
  },
  {
    name: 'Escritorio',
    path: '/forms/OfficeList'
  },
  {
    name: 'Operador',
    path: '/forms/OperatorList'
  },
  {
    name: 'Assessor',
    path: '/forms/AdvisorList'
  }
  ]
},
{
  name: 'Cadastro',
  icon: 'nc-icon nc-paper',
  children: [{
    name: 'Cliente',
    path: '/forms/ClientList'
  }]
},
{
  name: 'Movimentação',
  icon: 'nc-icon nc-money-coins',
  children: [{
    name: 'MRV Fluxo de Caixa',
    path: '/forms/MovementList'
  },
  {
    name: 'Aporte Cliente',
    path: '/forms/MovementListAporteCliente'
    //path: '/forms/MovementFormAporteCliente'
  },
  {
    name: 'Boleta Cliente',
    path: '/forms/MovementListBoletaCliente'
    //path: '/forms/MovementFormBoletaCliente'
  },
  {
    name: 'Atualização de Movimentações',
    path: '/forms/MovementFormAtualizacao'
  }

  ]
},
/*
{
  name: 'Integração',
  icon: 'nc-icon nc-cloud-upload-94',
  children: [
    {
      name: 'Comissionamento',
      path: '/forms/Import'
    }
  ]
},
*/
{
  name: 'Auxiliares',
  icon: 'nc-icon nc-box',
  collapsed: true,
  children: [
    {
      name: 'Situações De Movimento',
      path: '/forms/TipoSituacaoMovimentoList'
    },
    {
      name: 'Situações Tributaria',
      path: '/forms/TipoSituacaoTributariaList'
    },
     {
      name: 'Tipos De Central',
      path: '/forms/TipoCentralList'
    },
    {
    name: 'Tipos De Movimentação',
    path: '/forms/TipoMovimentacaoList'
  },


 /* {
    name: 'Controle de Usuários',
    path: '/forms/UserControlList'
  },*/
  /*
  {
    name: 'Mensagens',
    path: '/forms/TaskList'
  }
  */
]
},
{
  name: 'Administração',
  icon: 'nc-icon nc-badge',
  collapsed: true,
  children: [
    {
      name: 'Tipo De Link',
      path: '/forms/TipoLinkList'
    },
    {
      name: 'Link',
      path: '/forms/LinkList'
    },
    {
      name: 'Grupo',
      path: '/forms/GroupList'
    },
    {
      name: 'Usuário',
      path: '/forms/UserList'
    },
 ]
}
/*{
  name: 'Sair',
  icon: 'nc-icon nc-simple-remove',
  path: '/login'
},

  {
    name: 'Pages',
    icon: 'nc-icon nc-book-bookmark',
    children: [
      {
        name: 'Timeline',
        path: '/pages/timeline'
      },
      {
        name: 'User Profile',
        path: '/pages/user'
      },
      {
        name: 'Login',
        path: '/login'
      },
      {
        name: 'Register',
        path: '/register'
      },
      {
        name: 'Lock',
        path: '/lock'
      }
    ]
  },
  {
    name: 'Components',
    icon: 'nc-icon nc-layout-11',
    children: [{
      name: 'Buttons',
      path: '/components/buttons'
    },
    {
      name: 'Grid System',
      path: '/components/grid-system'
    },
    {
      name: 'Panels',
      path: '/components/panels'
    },
    {
      name: 'Sweet Alert',
      path: '/components/sweet-alert'
    },
    {
      name: 'Notifications',
      path: '/components/notifications'
    },
    {
      name: 'Icons',
      path: '/components/icons'
    },
    {
      name: 'Typography',
      path: '/components/typography'
    }]
  },
  /*
  {
    name: 'Forms',
    icon: 'nc-icon nc-ruler-pencil',
    children: [{
      name: 'Regular Forms',
      path: '/forms/regular'
    },
    {
      name: 'Extended Forms',
      path: '/forms/extended'
    },
    {
      name: 'Validation Forms',
      path: '/forms/validation'
    },
    {
      name: 'Wizard',
      path: '/forms/wizard'
    }
    ]
  },

  {
    name: 'Table List',
    icon: 'nc-icon nc-single-copy-04',
    collapsed: true,
    children: [{
      name: 'Regular Tables',
      path: '/table-list/regular'
    },
    {
      name: 'Extended Tables',
      path: '/table-list/extended'
    },
    {
      name: 'Paginated Tables',
      path: '/table-list/paginated'
    }
    ]
  },
  {
    name: 'Maps',
    icon: 'nc-icon nc-pin-3',
    children: [{
      name: 'Google Maps',
      path: '/maps/google'
    },
    {
      name: 'Full Screen Maps',
      path: '/maps/full-screen'
    },
    {
      name: 'Vector Maps',
      path: '/maps/vector-map'
    }
    ]
  },
  {
    name: 'Widgets',
    icon: 'nc-icon nc-box',
    path: '/admin/widgets'
  },
  {
    name: 'Charts',
    icon: 'nc-icon nc-chart-bar-32',
    path: '/admin/charts'
  },
  {
    name: 'Calendar',
    icon: 'nc-icon nc-calendar-60',
    path: '/calendar'
  },
  */
]
