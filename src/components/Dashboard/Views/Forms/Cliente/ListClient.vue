<template>
<div class="row">

    <div class="col-md-12 card">
        <div class="card-body row">
            <!-- ***************************************************  -->
            <div class="col-sm-6">
                <div class="card-body text-left">
                    <div>
                        <h5 class="card-title">Clientes</h5>
                    </div>
                </div>
            </div>
            <!-- ------------------------- -->
            <div class="col-sm-6">
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
                    <fg-input class="input-sm" placeholder="Pesquisar" v-model="searchQuery">
                    </fg-input>
                </div>
            </div>
            <div class="col-sm-12 mt-2">
                <el-table class="table-striped" empty-text="Sem Informações" :data="queriedData" border style="width: 100%">
                    <el-table-column v-for="column in tableColumns" :key="column.label" :min-width="column.minWidth" :prop="column.prop" :label="column.label">
                    </el-table-column>
                    <el-table-column :min-width="50" fixed="right" class-name="td-actions" label="Ações">
                        <template slot-scope="props">
                            <!--
                            <el-tooltip class="item" effect="dark" content="Aporte" placement="top">
                                <p-button type="info" size="sm" icon @click="handleAdd(props.$index, props.row)">
                                    <i class="fas fa-donate"></i>
                                </p-button>
                            </el-tooltip>

                            <el-tooltip class="item" effect="dark" content="Detalhar" placement="top">
                                <p-button type="error" size="sm" icon @click="handleDetails(props.$index, props.row)">
                                    <i class="fa fa-search"></i>
                                </p-button>
                            </el-tooltip>-->
                            <el-tooltip class="item" effect="dark" content="Editar" placement="top">
                                <p-button type="success" size="sm" icon @click="handleEdit(props.$index, props.row)">
                                    <i class="fa fa-edit"></i>
                                </p-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="Excluir" placement="top">
                                <p-button type="danger" size="sm" icon @click="handleDelete(props.$index, props.row)">
                                    <i class="fa fa-trash-o"></i>
                                </p-button>
                            </el-tooltip>
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
            <el-dialog title="Aporte Cliente" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="Valor R$" :label-width="formLabelWidth">
                        <el-input v-model="form.valor" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancelar</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">Adicionar</el-button>
              </span>
            </el-dialog>
            <md-dialog class="dialog" title="Detalhamento" :md-active.sync="dialogFormVisibleDetail">
                <cliente-details :cliente="cliente" />
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleDetail = false">Cancelar</el-button>
              </span>
            </md-dialog>
        </div>
    </div>
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
import clienteDetails from './FormClientDetail.vue'
import PPagination from 'src/components/UIComponents/Pagination.vue'
export default {
    name: 'ListClient',
    components: {
        PPagination,
        clienteDetails
    },
    props: {
        type: Object,
        name: 'cliente'
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
                        row[key] = '' + row[key]
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
            dialogFormVisible: false,
            dialogFormVisibleDetail: false,
            formLabelWidth: '60px',
            form: {
                valor: '',
                valorLinha: ''
            },
            pagination: {
                perPage: 10,
                currentPage: 1,
                perPageOptions: [10, 25, 50, 75],
                total: 0
            },
            searchQuery: '',
            newRow: '',
            cliente: null,
            propsToSearch: ['nome','id_xp', 'email', 'telefone'],
            tableColumns: [{
                    prop: 'nome',
                    label: 'Nome',
                    minWidth: 100
                },
                {
                    prop: 'id_xp',
                    label: 'Numero XP',
                    minWidth: 60
                },
                {
                    prop: 'email',
                    label: 'E-mail',
                    minWidth: 100
                },
                {
                    prop: 'telefone',
                    label: 'Telefone',
                    minWidth: 80
                }
            ],
            tableData: []
        }
    },
    created() {
        axios.get(process.env.VUE_APP_ROOT_API + '/cliente?where={"ativo": 1}&limit=1000').then(response => {
            this.tableData = response.data
        })
    },
    methods: {
        handleRegister() {
            this.$router.push('/forms/ClientForm')
        },
        handleEdit(index, row) {
          window.localStorage.setItem('cliente', row.id)
          this.$router.push('/forms/ClientFormEdit')
        },
        handleDetails(index, row) {
            this.cliente = row
            this.dialogFormVisibleDetail = true
        },
        handleAdd(index, row) {
            this.newRow = row.id
            // window.localStorage.setItem('cliente', row.id)
            // this.$router.push('/forms/ClientFormAporte')
            this.dialogFormVisible = true
        },
        handleDelete(index, row) {
            let empresa = {
                ativo: false
            }
            axios.put(process.env.VUE_APP_ROOT_API + '/cliente/' + row.id, empresa)
                .then(response => {
                    this.results = response.data
                    axios.get(process.env.VUE_APP_ROOT_API + '/cliente?where={"ativo": 1}').then(response => {
                        this.tableData = response.data
                        swal('Bom trabalho!', `Cliente ${row.nome} excluído com sucesso!`, 'success')
                        this.$router.push('/forms/ClientList')
                    })
                })
                .catch(error => {
                    alert(error.response)
                    console.log(error.response.data)
                })
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

.top {
    text-align: center;
}

.dialog {
    width: 57%;
    overflow: scroll;
}
</style>
