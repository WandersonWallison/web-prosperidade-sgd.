<template>
<div class="card">
    <form>
        <div class="card-header">
            <h4 class="card-title">
                Importador
            </h4>
        </div>
        <div class="card-body">
           <input ref="excel-upload-input" class="form-input" type="file" accept=".xlsx, .xls" @change="handleClick">
    <!-- <div @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
      <md-button class="md-raised md-primary" name="importador" :loading="loading" style="margin-left:10px; cursor:pointer;" size="mini" type="primary" @click="handleUpload">Importador de Lead</md-button>
    </div>-->
    <span>{{this.arquivo}}</span>
    <div class="loading-overlay2" v-if="loading">
      <md-progress-spinner md-mode='indeterminate' md-diameter='50' :md-stroke='4'></md-progress-spinner>
    </div>
    <div>
      <md-content>
          <ul id="leadsError">
            <li v-for="item in leadsError" v-bind:key="item.nome">
              <label>Registro não importado: {{ item }}</label>
            </li>
          </ul>
      </md-content>
  </div>
        </div>
        <div class="card-footer text-right">
        </div>
    </form>
    <!-- inicio da lista -->
    <div class="row">
    <div class="col-md-12 card">
      <div class="card-header">
        <div class="category">Registros importados</div>
      </div>
      <div class="card-body row">
        <div class="col-sm-6">
          <el-select
            class="select-default"
            v-model="pagination.perPage"
            placeholder="Per page">
            <el-option
              class="select-default"
              v-for="item in pagination.perPageOptions"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
        <div class="col-sm-6">
          <div class="pull-right">
            <fg-input class="input-sm"
                      placeholder="Search"
                      v-model="searchQuery"
                      addon-right-icon="nc-icon nc-zoom-split">
            </fg-input>
          </div>
        </div>
        <div class="col-sm-12 mt-2">
          <el-table class="table-striped"
                    :data="queriedData"
                    border
                    style="width: 100%">
            <el-table-column v-for="column in tableColumns"
                             :key="column.label"
                             :min-width="column.minWidth"
                             :prop="column.prop"
                             :label="column.label">
            </el-table-column>
            <!--<el-table-column
              :min-width="120"
              fixed="right"
              class-name="td-actions"
              label="Actions">
              <template slot-scope="props">
                <p-button type="info" size="sm" icon @click="handleLike(props.$index, props.row)">
                  <i class="fa fa-user"></i>
                </p-button>
                <p-button type="success" size="sm" icon @click="handleEdit(props.$index, props.row)">
                  <i class="fa fa-edit"></i>
                </p-button>
                <p-button type="danger" size="sm" icon @click="handleDelete(props.$index, props.row)">
                  <i class="fa fa-times"></i>
                </p-button>
              </template>
            </el-table-column>-->
          </el-table>
        </div>
        <div class="col-sm-6 pagination-info">
          <p class="category">Showing {{from + 1}} to {{to}} of {{total}} entries</p>
        </div>
        <div class="col-sm-6">
          <p-pagination class="pull-right"
                        v-model="pagination.currentPage"
                        :per-page="pagination.perPage"
                        :total="pagination.total">
          </p-pagination>
        </div>
      </div>
    </div>
    </div>

</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import moment from 'moment'
import XLSX from 'xlsx'
import {Table, TableColumn, Select, Option} from 'element-ui'
import PPagination from 'src/components/UIComponents/Pagination.vue'
import users from './users'
  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Select)
  Vue.use(Option)
export default {
  components: {
      PPagination
    },
  props: {
    beforeUpload: Function, // eslint-disable-line
    onSuccess: Function// eslint-disable-line
  },
  data () {
    return {
      pagination: {
          perPage: 5,
          currentPage: 1,
          perPageOptions: [5, 10, 25, 50],
          total: 0
        },
        searchQuery: '',
        propsToSearch: ['name'],
        tableColumns: [
          {
            prop: 'name',
            label: 'Produto',
            minWidth: 200
          },
          /*{
            prop: 'email',
            label: 'Email',
            minWidth: 250
          },
          {
            prop: 'age',
            label: 'Age',
            minWidth: 100
          },
          {
            prop: 'salary',
            label: 'Salary',
            minWidth: 120
          }*/
        ],
        tableData: [],
      loading: false,
      excelData: {
        header: null,
        results: null
      },
      userAtual: null,
      erroUsuarios: [],
      arquivo: null,
      leadsError: [],
      valor_importacao: null
    }
  },
  updated () {
    this.tableData = users  
  },
  computed: {
      pagedData () {
        return this.tableData.slice(this.from, this.to)
      },
      queriedData () {
        if (!this.searchQuery) {
          this.pagination.total = this.tableData.length
          return this.pagedData
        }
        let result = this.tableData
          .filter((row) => {
            let isIncluded = false
            for (let key of this.propsToSearch) {
              let rowValue = row[key].toString()
              if (rowValue.includes && rowValue.includes(this.searchQuery)) {
                isIncluded = true
              }
            }
            return isIncluded
          })
        this.pagination.total = result.length
        return result.slice(this.from, this.to)
      },
      to () {
        let highBound = this.from + this.pagination.perPage
        if (this.total < highBound) {
          highBound = this.total
        }
        return highBound
      },
      from () {
        return this.pagination.perPage * (this.pagination.currentPage - 1)
      },
      total () {
        this.pagination.total = this.tableData.length
        return this.tableData.length
      }
    },
  mounted () {
    const authUser = window.localStorage.getItem('Usuario')
    const authUser2 = JSON.parse(authUser)
    this.userAtual = authUser2
  },
  methods: {
     handleLike (index, row) {
        alert(`Your want to like ${row.name}`)
      },
      handleEdit (index, row) {
        alert(`Your want to edit ${row.name}`)
      },
      handleDelete (index, row) {
        let indexToDelete = this.tableData.findIndex((tableRow) => tableRow.id === row.id)
        if (indexToDelete >= 0) {
          this.tableData.splice(indexToDelete, 1)
        }
      },
    generateData ({ header, results }) {
      this.excelData.header = header
      this.excelData.results = results
      this.onSuccess && this.onSuccess(this.excelData)
      if (this.excelData.results.length > 0) {
        this.loading = true
        this.importarLeads()
      } else {
        alert('Arquivo sem informaÃ§Ãµes para importaÃ§Ã£o')
        this.arquivo = ''
      }
    },
    handleDrop (e) {
      e.stopPropagation()
      e.preventDefault()
      if (this.loading) return
      const files = e.dataTransfer.files
      if (files.length !== 1) {
        this.$message.error('Only support uploading one file!')
        return
      }
      const rawFile = files[0] // only use files[0]
      if (!this.isExcel(rawFile)) {
        this.$message.error('Only supports upload .xlsx, .xls, .csv suffix files')
        return false
      }
      this.upload(rawFile)
      e.stopPropagation()
      e.preventDefault()
    },
    handleDragover (e) {
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },
    handleUpload () {
      this.$refs['excel-upload-input'].click()
    },
    handleClick (e) {
      const files = e.target.files
      const rawFile = files[0] // only use files[0]
      console.log(rawFile)
      if (!rawFile) return
      this.upload(rawFile)
    },
    upload (rawFile) {
      this.arquivo = this.editarNomeArquivo(this.$refs['excel-upload-input'].value)
      this.$refs['excel-upload-input'].value = null // fix can't select the same excel
      if (!this.beforeUpload) {
        this.readerData(rawFile)
        return
      }
      const before = this.beforeUpload(rawFile)
      if (before) {
        this.readerData(rawFile)
      }
    },
    readerData (rawFile) {
      this.loading = true
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = e => {
          const data = e.target.result
          const workbook = XLSX.read(data, { type: 'array' })
          const firstSheetName = workbook.SheetNames[0]
          this.valor_importacao = firstSheetName
          const worksheet = workbook.Sheets[firstSheetName]
          const header = this.getHeaderRow(worksheet)
          const results = XLSX.utils.sheet_to_json(worksheet)
          this.generateData({ header, results })
          this.loading = false
          resolve()
        }
        reader.readAsArrayBuffer(rawFile)
      })
    },
    getHeaderRow (sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C
      const R = range.s.r
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    },
    isExcel (file) {
      return /\.(xlsx|xls|csv)$/.test(file.name)
    },
    importarLeads () {
      for (let i = 0; i < this.excelData.results.length; i++) {
        let newImport = {
          produto: this.excelData.results[i].Produto,
          //email: this.excelData.results[i].Email ? this.removerEspacos(this.excelData.results[i].Email) : this.removeAcento(this.excelData.results[i].Cliente) + this.retiraMascara(this.excelData.results[i].Celular) + '@importacao.com',
          //telefone: this.excelData.results[i].Telefone,
          //celular: this.excelData.results[i].Celular,
          //numero_operadora: this.excelData.results[i].NumeroXP,
          //data_criacao: moment(Date.now()).format(),
          //id_user_criador: this.userAtual.id,
          //id_office: this.userAtual.id_office,
          //id_importacao: this.valor_importacao
        }

        try {
          axios.post(process.env.VUE_APP_ROOT_API + '/importacao', newImport)
            .then(response => {
            })
            .catch(error => {
              this.leadsError.push(error.response.config.data)
              console.log('Erro do Axios ', error.response.config.data)
            })
        } catch (error) {
          console.log('Erro Try', error)
        }
      }
      this.loading = false
      this.arquivo = ''
      alert('ImportaÃ§Ã£o realizada com sucesso !!!')
    },
    maskFone: function (v) {
      if (v) {
        v = v.replace(/\D/g, '') // Remove tudo o que nÃ£o Ã© dÃ­gito
        v = v.replace(/^(\d{2})(\d)/g, '($1) $2') // Coloca parÃªnteses em volta dos dois primeiros dÃ­gitos
        v = v.replace(/(\d)(\d{4})$/, '$1-$2') // Coloca hÃ­fen entre o quarto e o quinto dÃ­gitos
      }
      return v
    },
    retiraMascara (campo) {
      console.log(campo.lenght)
      if (campo.lenght > 11) {
        campo = campo.replace(' ', '') // remover espaÃ§os
        campo = campo.replace(/\D/g, '') // Remove tudo o que nÃ£o Ã© dÃ­gito
      }
      return campo
    },
    removeAcento (text) {
      text = text.replace(' ', '')
      text = text.replace(' ', '')
      text = text.replace(' ', '')
      text = text.replace(' ', '')
      text = text.replace(' ', '')
      text = text.toLowerCase()
      text = text.replace(new RegExp('[ÃÃÃÃ]', 'gi'), 'a')
      text = text.replace(new RegExp('[ÃÃÃ]', 'gi'), 'e')
      text = text.replace(new RegExp('[ÃÃÃ]', 'gi'), 'i')
      text = text.replace(new RegExp('[ÃÃÃÃ]', 'gi'), 'o')
      text = text.replace(new RegExp('[ÃÃÃ]', 'gi'), 'u')
      text = text.replace(new RegExp('[Ã]', 'gi'), 'c')
      text = text.substring(0, 12)
      return text
    },
    editarNomeArquivo (text) {
      text = text.substring(12, text.length)
      return text
    },
    removerEspacos (campo) {
      campo = campo.replace(' ', '')
      campo = campo.replace(' ', '')
      campo = campo.replace(' ', '')
      campo = campo.replace(' ', '')
      campo = campo.replace(' ', '')
      return campo
    }
  }
}
</script>

<style lang="scss">
.excel-upload-input{
  display: none;
  z-index: -9999;
}
.drop{
  border: 2px dashed #bbb;
  width: 600px;
  height: 160px;
  line-height: 160px;
  margin: 0 auto;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
.el-table .td-actions{
  button.btn {
    margin-right: 5px;
  }
  }
</style>
