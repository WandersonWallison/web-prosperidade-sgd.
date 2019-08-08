<template>
<div class="row">
    <div class="col-md-12 card">
        <div class="card-body row">
            <div class="col-sm-9">
                <div class="card-body text-left">
                    <div>
                        <h5 class="card-title">Atualizações de Movimentações</h5>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="pull-right">
                    <p-button type="primary" @click="salvar()">Atualizar Movimentações</p-button>
                </div>
            </div>
            <div class="col-lg-4">
                <label>Status</label>
                <fg-input>
                    <el-select no-data-text="Carregando..." class="select-default" v-model="model.status" name="status" @change="filtrarStatus()" placeholder="Selecione um status.">
                        <el-option class="select-default" v-for="item in status_movimentacao" :key="item.id" :label="item.descricao" :value="item.id">
                        </el-option>
                    </el-select>
                </fg-input>
            </div>
            <div class="col-lg-4">
               <label>Data Registro</label>
                <el-date-picker
                    v-model="value1"
                    type="daterange"
                    format="dd/MM/yyyy"
                    range-separator="|"
                    start-placeholder="Data Inicial"
                    end-placeholder="Data Final">
                </el-date-picker>
            </div>
        </div>
        <div class="col-sm-12 mt-2">
            <el-table ref="multipleTable" empty-text="Carregando..." :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column   type="selection" width="50">
                </el-table-column>
                <el-table-column  align="center" label="CÓDIGO" width="88">
                    <template slot-scope="scope">{{ scope.row.id }}</template>
                </el-table-column>
                <el-table-column  label="CLIENTE" width="250">
                    <template slot-scope="scope">{{ scope.row.id_cliente.nome }}</template>
                </el-table-column>
                <el-table-column  label="SITUAÇÃO" width="190">
                    <template slot-scope="scope">{{ scope.row.id_situacao_movimento.descricao }}</template>
                </el-table-column>
                <el-table-column  label="VALOR" width="150">
                    <template slot-scope="scope">{{ scope.row.valor | formatarMoeda }}</template>
                </el-table-column>
                <el-table-column  align="center" label="DATA REGISTRO" width="150">
                    <template slot-scope="scope">{{ scope.row.dthr_registro | maskData }}</template>
                </el-table-column>
                <el-table-column  align="left" label="OBSERVAÇÃO" width="200">
                    <template slot-scope="scope">{{ scope.row.observacao }}</template>
                </el-table-column>
            </el-table>
            <div class="col-sm-12 pagination-info">
                <p class="category">Mostrando {{from + 1}} de {{to}} de {{total}} Entradas</p>
            </div>
            <div class="col-sm-14">
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
import PPagination from 'src/components/UIComponents/Pagination.vue'
import moment from 'moment'
import MovementEdit from './FormMovementEdit'
export default {
    name: 'FormAtualizaMovimentacao2',
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
            tableData: [],
            status_movimentacao: [],
            multipleSelection: [],
            results: [],
            model: {
                status: ''
            },
            qtd: null,
            pickerOptions: {
            shortcuts: [
                {
                    text: 'Last week',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, 
                {
                    text: 'Last month',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, 
                {
                    text: 'Last 3 months',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }
            ]
            },
            value1: '',
            value2: ''
        }
    },
    filters: {
        maskData: function (v) {
            v = moment(v).format('DD/MM/YYYY')
            return v
        },
        formatarMoeda: function (valor) {

            var numero = valor.toFixed(2).split('.')
            numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.')
            return numero.join(',')

        }
    },
    mounted() {
        
        axios.get(process.env.VUE_APP_ROOT_API + '/tipo_situacao_movimento?where={"ativo": 1}').then(response => {
            this.status_movimentacao = response.data
        })
        axios.get(process.env.VUE_APP_ROOT_API + '/movimentacao?where={"ativo": 1}').then(response => {
            this.tableData = response.data
            this.qtd = this.tableData.length
        })
    },
    methods: {
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        salvar() {

            const authUser = JSON.parse(window.localStorage.getItem('usuario'))
            let movimentacao = {
                id_situacao_movimento: this.model.status,
                id_responsavel: authUser.id
            }
            for (let i = 0; i < this.multipleSelection.length; i++) {

                axios.put(process.env.VUE_APP_ROOT_API + "/movimentacao/" + this.multipleSelection[i].id, movimentacao)
                    .then(response => {
                        this.results = response.data
                        console.log('teste', i)
                    })
                    .catch(error => {
                        swal("Algo de errado!", "Verifique os campos!", "error")
                        console.log(error.response.data)
                    })
            }
            this.atualizaMovimentacao()
        },
        atualizaMovimentacao() {
            axios.get(process.env.VUE_APP_ROOT_API + '/movimentacao?where={"ativo": 1}').then(response => {
                this.tableData = response.data
                swal('Bom trabalho!', 'A(s) Movimentações foram alterada(s) com sucesso!', 'success')
                this.$router.push('/forms/MovementList')
            })
        },
        filtrarStatus() {
            axios.get(process.env.VUE_APP_ROOT_API + '/movimentacao?id_situacao_movimento='+this.model.status).then(response => {
                this.tableData = response.data                
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
