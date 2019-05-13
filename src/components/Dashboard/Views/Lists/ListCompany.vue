<template>
<div>
    <div class="card">
        <div class="card-header">
            <div class="row">
                <!-- ------------------------ -->
                <div class="col-sm-10">
                    <div class="card-body text-left">
                        <div>
                            <h5 class="card-title">Empresas</h5>
                        </div>
                    </div>
                </div>
                <!-- ------------------------- -->
                <div>
                    <div class="col-sm-1">
                        <div class="iten-center">
                            <p-button type="primary" @click="handleLike()">Cadastro</p-button>
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
                    <el-table-column prop="nome" label="Nome">
                    </el-table-column>
                   <!-- <el-table-column prop="razao_social" label="Razão Social">
                    </el-table-column>
                    <el-table-column prop="cnpj" label="CNPJ">
                    </el-table-column>
                    <el-table-column prop="telefone" label="Telefone">
                    </el-table-column>-->
                    <el-table-column prop="email" label="E-mail">
                    </el-table-column>
                    <el-table-column prop="status" label="Status">
                    </el-table-column>
                    <el-table-column class-name="action-buttons td-actions" align="right" label="Ações">
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
        </div>
    </div>
</div>
</template>

<script>
import swal from 'sweetalert2'
import axios from 'axios'
import Vue from 'vue'
import {
    Table,
    TableColumn
} from 'element-ui'
import PSwitch from 'src/components/UIComponents/Switch.vue'
Vue.use(Table)
Vue.use(TableColumn)
export default {
    components: {
        PSwitch
    },
    data() {
        return {
            tableData: [],
            productsTable: []
        }
    },
    mounted() {
        axios.get(process.env.VUE_APP_ROOT_API + '/empresa?where={"ativo": 1}').then(response => {
            this.tableData = response.data
        })
    },
    methods: {
        handleLike() {
            this.$router.push('/forms/company')
        },
        handleEdit(index, row) {
            window.localStorage.setItem('empresa', row.id)
            this.$router.push('/forms/companyEdit')
            alert(`Your want to edit ${row.name}`)
        },
        handleDelete(index, row) {
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

        },
        getSummaries(param) {
            const {
                columns
            } = param
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
                    sums[index] = `â‚¬ ${sum}`
                }
            })
            return sums
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
