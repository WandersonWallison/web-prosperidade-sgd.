<template>
<div class="row">

    <div class="col-md-12 card">
        <div class="card-body row">
            <!-- ***************************************************  -->
            <div class="col-sm-6">
                <div class="card-body text-left">
                    <div>
                        <h5 class="card-title">Itens</h5>
                    </div>
                </div>
            </div>
            <!-- ------------------------- -->
            <div class="col-sm-6">
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
                    <el-table-column v-for="column in tableColumns" :key="column.label" :min-width="column.minWidth" :prop="column.prop" :label="column.label">
                    </el-table-column>
                    <el-table-column :min-width="80" fixed="right" class-name="td-actions" prop="comissao_escritorio_r" :formatter="formatReal" label="Comissão Esc.">
                    </el-table-column>
                    <el-table-column :min-width="80" fixed="right" class-name="td-actions" prop="calculo_comissao_assessor" :formatter="formatReal" label="Comissão Asses.">
                    </el-table-column>
                    <el-table-column :min-width="50" fixed="right" class-name="td-actions" label="Ações">
                        <template slot-scope="props">
                            <!--<p-button type="success" size="sm" icon @click="handleEdit(props.$index, props.row)">
                                <i class="fa fa-edit"></i>
                            </p-button>-->
                            <p-button type="danger" size="sm" icon @click="handleDelete(props.$index, props.row)">
                                <i class="fa fa-trash-o"></i>
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
import {
    Table,
    TableColumn,
    Select,
    Option
} from 'element-ui'
import PSwitch from 'src/components/UIComponents/Switch.vue'
import axios from 'axios'
import swal from 'sweetalert2'
import PPagination from 'src/components/UIComponents/Pagination.vue'
import {
    mask
} from 'vue-the-mask'
export default {
    name: 'ListItens',
    props: ['selected'],
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
                perPage: 25,
                currentPage: 1,
                perPageOptions: [5, 10, 25, 50, 100, 150],
                total: 0
            },
            results: [],
            searchQuery: '',
            propsToSearch: ['codigo_cliente','produto_categoria','mensagem'],
            tableColumns: [{
                prop: 'codigo_cliente',
                label: 'Codigo',
                minWidth: 70
            },
            {
                prop: 'produto_categoria',
                label: 'Produto',
                minWidth: 100
            },
            {
                prop: 'mensagem',
                label: 'Status',
                minWidth: 200
            }],
            showcadastrar: false,
            showDetails: false,
            showUpdate: false,
            tableData: [],
            productsTable: [],
            qtd: null
        }
    },
    mounted() {
        axios.get(process.env.VUE_APP_ROOT_API + '/comissionamento_item?where={"ativo": 1,"id_comissionamento":'+window.localStorage.getItem('comissionamento')+'}&limit=1000').then(response => {
            this.tableData = response.data
        })
        window.localStorage.removeItem("comissionamento")
    },
    methods: {
        formatReal (row,column)
        {
            /*var numero = row[column.property]+''
            var tmp = row[column.property].toFixed(2)
            tmp = tmp.replace(/([0-9]{2})$/g, ",$1")
            if( tmp.length > 6 )
            tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2")*/
            var tmp = row[column.property]
            if(tmp == null || tmp == ""){
                tmp = 0,0
            }
            tmp = tmp.toFixed(2).replace(".",",")
            tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2")
            return 'R$ '+ tmp
        },
        handleDetails(index, row) {
            // this.showDetails = true
            // this.selected = row
        },
        handleRegister() {
            //this.$router.push('/forms/GroupForm')
            //this.showcadastrar = true
        },
        handleEdit(index, row) {
            //window.localStorage.setItem('grupo', row.id)
            //this.$router.push('/forms/GroupFormEdit')
        },
        handleDelete(index, row) {
            let comissionamentoItem = {
                ativo: false
            };
            axios
                .put(process.env.VUE_APP_ROOT_API + "/comissionamento_item/" + row.id, comissionamentoItem)
                .then(response => {
                    this.results = response.data
                            swal('Bom trabalho!',`Item ${row.nome_arquivo} Excluído com sucesso!`,'success')
                            axios.get(process.env.VUE_APP_ROOT_API + '/comissionamento_item?where={"ativo": 1,"id_comissionamento":'+this.results.id_comissionamento.id+'}').then(response => {
                                  this.tableData = response.data
                            })
                            //this.$router.push("/forms/CentralList");
                            //this.atualilarLista()
                        })
                .catch(error => {
                    alert(error.response);
                    console.log(error.response.data);
                });
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
