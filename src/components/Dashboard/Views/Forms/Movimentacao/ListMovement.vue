<template>
<div class="row">

    <div class="col-md-12 card">
        <div class="card-body row">
            <!-- ***************************************************  -->
            <div class="col-sm-9">
                <div class="card-body text-left">
                    <div>
                        <h5 class="card-title">Movimentações</h5>
                    </div>
                </div>
            </div>
            <!-- -------------------------
            <div class="col-sm-1">
                <div class="pull-right">
                    <p-button type="primary" @click="handleMoviment()">Atualizações</p-button>
                </div>
            </div>
            -->
            <div class="col-sm-3">
                <div class="pull-right">
                    <p-button type="primary" @click="handleRegister()">Cadastro</p-button>
                </div>
            </div>
            <!-- ***************************************************  -->
            <div class="col-sm-6">
                <el-select class="select-default" v-model="pagination.perPage" placeholder="Per page">
                    <el-option class="select-default" v-for="item in pagination.perPageOptions" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
            </div>
            <div class="col-sm-6">
                <div class="pull-right">
                    <fg-input class="input-sm" placeholder="Pesquisar por Código" v-model="searchQuery">
                    </fg-input>
                </div>
            </div>
            <div class="col-sm-12 mt-2">
                <el-table empty-text="Sem Informações" class="table-striped" :data="queriedData" border style="width: 100%">
                    <el-table-column v-for="column in tableColumns" :key="column.label" :min-width="column.minWidth" :prop="column.prop" :label="column.label">
                    </el-table-column>
                    <el-table-column :min-width="80" :formatter="formatPrice" prop="valor" label="Valor">
                    </el-table-column>
                    <el-table-column :min-width="110" :formatter="dateFormat" prop="data_registro" label="Data Registro">
                    </el-table-column>
                    <el-table-column :min-width="55" fixed="right" class-name="td-actions" label="Ações">
                        <template slot-scope="props">
                            <el-tooltip class="item" effect="dark" content="Editar" placement="top">
                                <p-button type="success" size="sm" icon @click="handleEdit(props.$index, props.row)">
                                    <i class="fa fa-edit"></i>
                                </p-button>
                            </el-tooltip>
                            <!--
                            <el-tooltip class="item" effect="dark" content="Excluir" placement="top">
                                <p-button type="danger" size="sm" icon @click="handleDelete(props.$index, props.row)">
                                    <i class="fa fa-trash-o"></i>
                                </p-button>
                            </el-tooltip>
                            -->
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="col-sm-6 pagination-info">
                <p class="category">Mostrando {{from + 1}} de {{to}} de {{total}} Entradas</p>
            </div>
            <div class="col-sm-6">
                <p-pagination class="pull-right" v-model="pagination.currentPage" :per-page="pagination.perPage" :total="pagination.total">
                </p-pagination>
            </div>
        </div>
    </div>
    <md-dialog :md-active.sync="showUpdate">
        <div>
            <MovementEdit :selected="selected"></MovementEdit>
        </div>
    </md-dialog>
</div>
</template>

<script>
import Vue from 'vue'
import {
    Table,
    TableColumn,
    Select,
    Option
} from 'element-ui'
import axios from 'axios'
import swal from 'sweetalert2'
import {
    Money
} from 'v-money'
import moment from 'moment'
import PPagination from 'src/components/UIComponents/Pagination.vue'
import MovementEdit from './FormMovementEdit'
import { type } from 'os'
export default {
    name: 'ListMovement',
    props: {
        selected: {
            type: Object
        }
    },
    components: {
        PPagination,
        MovementEdit,
        Money
    },
    computed: {
        pagedData() {
            return this.tableData.slice(this.from, this.to)
        },
        /***
         * Searches through table data and returns a paginated array.
         * Note that this should not be used for table with a lot of data as it might be slow!
         * Do the search and the pagination on the server and display the data retrieved from server instead.
         * @returns {computed.pagedData}
         */
        queriedData() {
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
        to() {
            let highBound = this.from + this.pagination.perPage
            if (this.total < highBound) {
                highBound = this.total
            }
            return highBound
        },
        from() {
            return this.pagination.perPage * (this.pagination.currentPage - 1)
        },
        total() {
            this.pagination.total = this.tableData.length
            return this.tableData.length
        }
    },
    data() {
        return {
            showUpdate: false,
            pagination: {
                perPage: 10,
                currentPage: 1,
                perPageOptions: [10, 25, 50, 75],
                total: 0
            },
            money: {
                decimal: ',',
                thousands: '.',
                prefix: 'R$ ',
                suffix: ' #',
                precision: 2,
                masked: false
            },
            searchQuery: '',
            propsToSearch: ['id','observacao'],
            tableColumns: [
                {
                    prop: 'id',
                    label: 'Código',
                    minWidth: 70
                },
                {
                    prop: 'id_cliente.nome',
                    label: 'Cliente',
                    minWidth: 150
                },
                {
                    prop: 'id_situacao_movimento.descricao',
                    label: 'Situação',
                    minWidth: 90
                },
                {
                    prop: 'observacao',
                    label: 'Observação',
                    minWidth: 100
                }
            ],
            tableData: []
        }
    },
    created() {
        axios.get(process.env.VUE_APP_ROOT_API + '/movimentacao?where={"ativo": 1}').then(response => {
            this.tableData = response.data
        })
    },
    methods: {
        dateFormat(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("DD/MM/YYYY")
        },
        formatPrice(value) {

            var tmp = value.valor
            if (tmp == null || tmp == "") {
                tmp = 0, 0
            }
            tmp = tmp.toFixed(2).replace(".", ",")
            tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2")
            return 'R$ ' + tmp
        },
        handleRegister(index, row) {
            this.$router.push('/forms/MovementForm')
        },
        handleMoviment(index, row) {
            this.$router.push('/forms/MovementFormAtualizacao')
        },
        handleEdit(index, row) {

            window.localStorage.setItem('movimentacao', row.id)
            this.$router.push('/forms/MovementFormEdit')
            // this.showUpdate = true
            // this.selected = row
            // window.localStorage.setItem('movimentacao', row.id)
            // this.$router.push('/forms/MovementFormEdit')
        },
        handleDelete(index, row) {
            /*
              let empresa = {
                  ativo: false
              }
              axios.put(process.env.VUE_APP_ROOT_API + '/empresa/' + row.id, empresa)
                  .then(response => {
                      this.results = response.data
                      axios.get(process.env.VUE_APP_ROOT_API + '/empresa?where={"ativo": 1}').then(response => {
                          this.tableData = response.data
                          swal('Bom trabalho!', `Empresa ${row.nome} excluída com sucesso!`, 'success')
                          this.$router.push('/forms/companyList')
                      })
                      //this.$router.push('/forms/companyList')
                  })
                  .catch(error => {
                      alert(error.response)
                      console.log(error.response.data)
                  })
            */
        }
    }
}
</script>

<style lang="scss">
.el-table .td-actions {
    button.btn {
        margin-right: 5px;
    }
}
</style>
