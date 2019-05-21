<template>
  <div>
    <div class="card">
      <div class="card-header">
        <div class="row">
          <!-- ------------------------ -->
          <div class="col-sm-10">
            <div class="card-body text-left">
                <div><h5 class="card-title">Controle de Acesso</h5></div>
            </div>
          </div>
          <!-- ------------------------- -->
          <div>
            <div class="col-sm-1">
              <div class="iten-center">
                <p-button type="primary">Cadastro</p-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body row">
        <div class="col-sm-12">
          <el-table :data="tableData" header-row-class-name="text-primary">
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="name"
                             label="Nome">
            </el-table-column>
            <el-table-column prop="job"
                             label="E-mail">
            </el-table-column>
            <el-table-column prop="salary"
                             label="Escriorio">
            </el-table-column>
            <el-table-column prop="salary"
                             label="Central">
            </el-table-column>
            <el-table-column prop="salary"
                             label="Grupo">
            </el-table-column>
            <el-table-column prop="salary"
                             label="Grupo">
            </el-table-column>
            <el-table-column
              class-name="action-buttons td-actions"
              align="right"
              label="Ações">
              <template slot-scope="props">

                <p-button type="success" size="sm" icon @click="handleEdit(props.$index, props.row)">
                  <i class="fa fa-edit"></i>
                </p-button>
                <p-button type="danger" size="sm" icon @click="handleDelete(props.$index, props.row)">
                  <i class="fa fa-times"></i>
                </p-button>
                <p-button type="danger" size="sm" icon @click="handleDelete(props.$index, props.row)">
                  <i class="fa fa-times"></i>
                </p-button>
                <p-button type="danger" size="sm" icon @click="handleDelete(props.$index, props.row)">
                  <i class="fa fa-times"></i>
                </p-button>
                <p-button type="danger" size="sm" icon @click="handleDelete(props.$index, props.row)">
                  <i class="fa fa-times"></i>
                </p-button>
                <p-button type="danger" size="sm" icon @click="handleDelete(props.$index, props.row)">
                  <i class="fa fa-times"></i>
                </p-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {Table, TableColumn} from 'element-ui'
  import PSwitch from 'src/components/UIComponents/Switch.vue'
  Vue.use(Table)
  Vue.use(TableColumn)
  export default{
    components: {
      PSwitch
    },
    data () {
      return {
        tableData: [

        {
          name: 'Andrew Mike',
          job: 'Develop',
          salary: '€ 99,225',
          active: false
        },
        /*
        {
          name: 'John Doe',
          job: 'Design',
          salary: '€ 89,241',
          active: false
        }, {
          name: 'Alex Mike',
          job: 'Design',
          salary: '€ 92,144',
          active: false
        }, {
          name: 'Mike Monday',
          job: 'Marketing',
          salary: '€ 49,990',
          active: true
        },
        {
          name: 'Paul dickens',
          job: 'Communication',
          salary: '€ 69,201',
          active: true
        }
        */],
        productsTable: [
          {
            image: 'static/img/tables/agenda.png',
            title: 'Notebook',
            subTitle: 'Most beautiful agenda for the office.',
            price: 49,
            quantity: 1
          },
          {
            image: 'static/img/tables/stylus.jpg',
            title: 'Stylus',
            subTitle: 'Design is not just what it looks like and feels like. Design is how it works.',
            price: 499,
            quantity: 2
          },
          {
            image: 'static/img/tables/evernote.png',
            title: 'Evernote iPad Stander',
            subTitle: 'A groundbreaking Retina display. All-flash architecture. Fourth-generation Intel processors.',
            price: 799,
            quantity: 1
          }
        ]
      }
    },
    methods: {
      handleLike (index, row) {
        alert(`Your clicked on Like button`)
      },
      handleEdit (index, row) {
        alert(`Your want to edit ${row.name}`)
      },
      handleDelete (index, row) {
        alert(`Your want to delete ${row.name}`)
      },
      getSummaries (param) {
        const { columns } = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = 'Total'
          } else if (index < columns.length - 1) {
            sums[index] = ''
          } else {
            let sum = 0
            this.productsTable.forEach((obj) => {
              sum += obj.quantity * obj.price
            })
            sums[index] = `€ ${sum}`
          }
        })
        return sums
      }
    }
  }
</script>
<style lang="scss">
  .el-table .td-actions{
    button.btn {
      margin-right: 5px;
    }
  }
</style>
