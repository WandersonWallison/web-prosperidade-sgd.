<template>
  <div>
    <div class="card">
      <div class="card-header">
        <div class="row">
          <!-- ------------------------ -->
          <div class="col-sm-10">
            <div class="card-body text-left">
                <div><h5 class="card-title">Clientes</h5></div>
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
          <el-table :data="tableData" empty-text="Sem Informações" header-row-class-name="text-primary">
            <el-table-column type="index">

            </el-table-column>
            <el-table-column prop="name"
                             label="Nome">
            </el-table-column>
            <el-table-column prop="job"
                             label="CPF">
            </el-table-column>
            <el-table-column prop="salary"
                             label="Valor Investido">
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
                  <i class="fa fa-trash-o"></i>
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
        tableData: [],
        productsTable: []
      }
    },
    methods: {
      handleRegister (index, row) {
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
