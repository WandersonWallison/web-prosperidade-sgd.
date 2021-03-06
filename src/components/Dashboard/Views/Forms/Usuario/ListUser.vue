<template>
<div class="row">

    <div class="col-md-12 card">
        <div class="card-body row">
            <!-- ***************************************************  -->
            <div class="col-sm-6">
                <div class="card-body text-left">
                    <div>
                        <h5 class="card-title">Usuários</h5>
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
                <el-table class="table-striped" empty-text="Carregando..." :data="queriedData" border style="width: 100%">
                    <el-table-column v-for="column in tableColumns" :key="column.label" :min-width="column.minWidth" :prop="column.prop" sortable :label="column.label">
                    </el-table-column>
                    <el-table-column prop="id_grupo.descricao" label="Grupo" :min-width="60" :filters="[{ text: 'ADMINISTRADOR', value: 'ADMINISTRADOR' },
                               { text: 'ASSESSOR', value: 'ASSESSOR' },
                               { text: 'OPERADOR', value: 'OPERADOR' },
                               { text: 'ESCRITORIO', value: 'ESCRITORIO' }]" sortable :filter-method="filterTag" filter-placement="bottom-end">
                    </el-table-column>
                    <el-table-column :min-width="60" fixed="right" class-name="td-actions" label="Ações">
                        <template slot-scope="props">
                            <el-tooltip class="item" effect="dark" content="Detalhar" placement="top">
                                <p-button type="error" size="sm" icon @click="handleDetails(props.$index, props.row)">
                                    <i class="fa fa-search"></i>
                                </p-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="Alterar Senha" placement="top">
                                <p-button type="error" size="sm" icon @click="handleAlterPassword(props.$index, props.row)">
                                    <i class="fas fa-user-lock"></i>
                                </p-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="Editar" placement="top">
                                <p-button type="success" size="sm" icon @click="handleEdit(props.$index, props.row)">
                                    <i class="fa fa-edit"></i>
                                </p-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="Excluir" placement="top">
                                <p-button type="danger" size="sm" icon @click="open(props.$index, props.row)">
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
        </div>
    </div>
    <md-dialog :md-active.sync="dialogFormVisibleDetail">
        <senha :selected="selected" />
    </md-dialog>
    <md-dialog :md-active.sync="showDetails">
        <div class="div">
            <user-details :selected="selected"></user-details>
        </div>
    </md-dialog>
    <md-dialog :md-active.sync="showUpdate">
        <div class="div">
            <user-edit :selected="selected"></user-edit>
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
import PPagination from 'src/components/UIComponents/Pagination.vue'
import PSwitch from 'src/components/UIComponents/Switch.vue'
import UserEdit from './FormUserEdit'
import UserDetails from './FormUserDetails.vue'
import senha from './AlterPassword'
import mixinPadrao from '../../../../../mixins/mixinPadrao'
Vue.use(Table)
Vue.use(TableColumn)
export default {
    name: 'ListUser',
    mixins: [mixinPadrao],
    props: {
        selected: {
            type: Object
        }
    },
    components: {
        PPagination,
        PSwitch,
        UserEdit,
        UserDetails,
        senha
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
            mutableList: this.selected,
            showDetails: false,
            showUpdate: false,
            dialogFormVisibleDetail: false,
            pagination: {
                perPage: 10,
                currentPage: 1,
                perPageOptions: [10, 25, 50, 75],
                total: 0
            },
            searchQuery: '',
            newRow: '',
            propsToSearch: ['username', 'email'], //, 'telefone'],
            tableColumns: [{
                    prop: 'username',
                    label: 'Nome',
                    minWidth: 100
                },
                /* {
                     prop: 'id_grupo.descricao',
                     label: 'Grupo',
                     minWidth: 80
                 },*/
                {
                    prop: 'email',
                    label: 'E-mail',
                    minWidth: 100
                } //,
                //{
                //    prop: 'telefone',
                //    label: 'Telefone',
                //    minWidth: 70
                //}
            ],
            tableData: []
        }
    },
    mounted() {
        axios.get(process.env.VUE_APP_ROOT_API + '/user?where={"ativo": 1}&sort=username&limit=2000').then(response => {
            this.tableData = response.data
        })
    },
    methods: {
        // ------------ Confirmação de Deletar
        open(index, row) {
            if (this.validaRota('/forms/userDelete')) {
                this.$confirm('Deseja realmente excluir esse registro?', 'Atenção', {
                    confirmButtonText: 'Sim',
                    cancelButtonText: 'Não',
                    type: 'warning'
                }).then(() => {
                    this.handleDelete(index, row)
                    // this.$message({type: 'success', message: 'Registro Excluido!!'})
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Operação Cancelada'
                    })
                });
            } else {
                swal('Você não tem permissão!', '', 'info')
            }
        },
        filterTag(value, row) {
            return row.id_grupo.descricao === value;
        },
        // ----------------------------------
        handleDetails(index, row) {
            this.showDetails = true
            this.selected = row
        },
        handleAlterPassword(index, row) {
            this.dialogFormVisibleDetail = true
            this.selected = row
        },
        handleRegister(index, row) {
            this.$router.push('/forms/user')
        },
        handleEdit(index, row) {
            this.showUpdate = true
            this.selected = row
            // this.$router.push('/forms/userEdit')
            // alert(`Your want to edit ${row.name}`)
        },
        handleDelete(index, row) {

                let user = {
                    ativo: false
                    /*razao_social: this.model.nome,
                    site: this.form.site,
                    telefone: this.form.telefone,
                    email: this.form.email,
                    cnpj: this.form.cnpj*/
                }
                axios.put(process.env.VUE_APP_ROOT_API + '/user/' + row.id, user)
                    .then(response => {
                        this.results = response.data
                        axios.get(process.env.VUE_APP_ROOT_API + '/user?where={"ativo": 1}').then(response => {
                            this.tableData = response.data
                            swal('Bom trabalho!', `Usuario ${row.username} deletado com sucesso!`, 'success')
                            // this.$router.push('/forms/UserList')
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
</style>
