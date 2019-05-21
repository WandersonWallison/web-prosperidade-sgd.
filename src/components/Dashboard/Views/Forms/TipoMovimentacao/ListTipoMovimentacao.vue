<template>
<div class="row">

    <div class="col-md-12 card">
        <div class="card-body row">
            <!-- ***************************************************  -->
            <div class="col-sm-6">
                <div class="card-body text-left">
                    <div>
                        <h5 class="card-title">Tipos de Movimentações </h5>
                    </div>
                </div>
            </div>
            <!-- ------------------------- -->
            <div class="col-sm-6">
                <div class="pull-right">
                    <p-button type="primary" @click="handleLike()">Cadastro</p-button>
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
                    <fg-input class="input-sm" placeholder="Search" v-model="searchQuery" addon-right-icon="nc-icon nc-zoom-split">
                    </fg-input>
                </div>
            </div>
            <div class="col-sm-12 mt-2">
                <el-table class="table-striped" :data="queriedData" border style="width: 100%">
                    <el-table-column v-for="column in tableColumns" :key="column.label" :min-width="column.minWidth" :prop="column.prop" :label="column.label">
                    </el-table-column>
                    <el-table-column :min-width="90" fixed="right" class-name="td-actions" label="Ações">
                        <template slot-scope="props">
                            <p-button type="success" size="sm" icon @click="handleEdit(props.$index, props.row)">
                                <i class="fa fa-edit"></i>
                            </p-button>
                            <p-button type="danger" size="sm" icon @click="handleDelete(props.$index, props.row)">
                                <i class="fa fa-times"></i>
                            </p-button>
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
    name: 'ListCompany',
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
            propsToSearch: ['descricao', 'sigla'],
            tableColumns: [{
                    prop: 'descricao',
                    label: 'Nome',
                    minWidth: 250
                },
                {
                    prop: 'sigla',
                    label: 'Sigla',
                    minWidth: 250
                }
            ],
            tableData: []
        }
    },
    mounted() {
        axios.get(process.env.VUE_APP_ROOT_API + '/tipo_central?where={"ativo": 1}').then(response => {
            this.tableData = response.data
        })
    },
    methods: {
        handleLike() {
            this.$router.push('/forms/TipoMovimentacaoForms')
        },
        handleEdit(index, row) {
            window.localStorage.setItem('tipo_central', row.id)
            this.$router.push('/forms/TipoMovimentacaoEdit')
        },
        handleDelete(index, row) {

            let Tipocentral = {
                ativo: false
            }
            axios.put(process.env.VUE_APP_ROOT_API + '/tipo_central/' + row.id, Tipocentral)
                .then(response => {
                    this.results = response.data
                    axios.get(process.env.VUE_APP_ROOT_API + '/tipo_central?where={"ativo": 1}').then(response => {
                        this.tableData = response.data
                        swal('Bom trabalho!', 'Registro excluída com sucesso!', 'success')
                        this.$router.push('/forms/TipoCentralList')
                    })
                })
                .catch(error => {
                    swal('Algo de errado!', 'Verifique o registro selecionado!', 'error')
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
