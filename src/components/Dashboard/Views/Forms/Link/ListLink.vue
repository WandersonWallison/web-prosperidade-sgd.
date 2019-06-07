<template>
<div class="row">

    <div class="col-md-12 card">
        <div class="card-body row">
            <!-- ***************************************************  -->
            <div class="col-sm-6">
                <div class="card-body text-left">
                    <div>
                        <h5 class="card-title">Links</h5>
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
                    <fg-input class="input-sm" placeholder="Pesquisar" v-model="searchQuery" addon-right-icon="nc-icon nc-zoom-split">
                    </fg-input>
                </div>
            </div>
            <div class="col-sm-12 mt-2">
                <el-table class="table-striped" empty-text="Sem Informações" :data="queriedData" border style="width: 100%">
                    <el-table-column v-for="column in tableColumns" :key="column.label" :min-width="column.minWidth" :prop="column.prop" :label="column.label">
                    </el-table-column>
                    <el-table-column :min-width="90" fixed="right" class-name="td-actions" label="Ações">
                        <template slot-scope="props">
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
        </div>
    </div>
</div>
</template>

<script>
import Vue from 'vue'
import swal from 'sweetalert2'
import {
    Table,
    TableColumn,
    Select,
    Option
} from 'element-ui'
import axios from 'axios'
import PPagination from 'src/components/UIComponents/Pagination.vue'
export default {
    name: 'ListLink',
    components: {
        PPagination
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
            pagination: {
                perPage: 5,
                currentPage: 1,
                perPageOptions: [5, 10, 25, 50],
                total: 0
            },
            searchQuery: '',
            propsToSearch: ['descricao', 'link'],
            tableColumns: [{
                    prop: 'descricao',
                    label: 'Nome',
                    minWidth: 150
                },
                {
                    prop: 'link',
                    label: 'Link',
                    minWidth: 150
                },
                {
                    prop: 'id_tipo_link.descricao',
                    label: 'Tipo',
                    minWidth: 150
                }
            ],
            tableData: []
        }
    },
    mounted() {
        axios.get(process.env.VUE_APP_ROOT_API + '/link?where={"ativo": 1}&limit=200').then(response => {
            this.tableData = response.data
        })
    },
    methods: {
        handleDetails(index, row) {
            // window.localStorage.setItem('link', row.id)
            // this.$router.push('/forms/LinkFormsEdit')
            // this.showDetails = true
            // this.selected = row
        },
        handleRegister() {
            this.$router.push('/forms/LinkForms')
        },
        handleEdit(index, row) {
            window.localStorage.setItem('link', row.id)
            this.$router.push('/forms/LinkFormsEdit')
            //this.showUpdate = true
            //this.selected = row
        },
        handleDelete(index, row) {

            let link = {
                ativo: false
            }
            axios.put(process.env.VUE_APP_ROOT_API + '/link/' + row.id, link)
                .then(response => {
                    this.results = response.data
                    axios.get(process.env.VUE_APP_ROOT_API + '/link?where={"ativo": 1}').then(response => {
                        this.tableData = response.data
                        swal('Bom trabalho!', `Link ${row.descricao} deletado com sucesso!`, 'success')
                        // this.$router.push('/forms/UserList')
                    })
                })
                .catch(error => {
                    swal('Algo de errado!', 'Verifique os campos!', 'error')
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
