<template>
<div>
    <div class="card">
        <div class="card-header">
            <div class="row">
                <!-- ------------------------ -->
                <div class="col-sm-10">
                    <div class="card-body text-left">
                        <div>
                            <h5 class="card-title">Grupo</h5>
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
                    <el-table-column prop="descricao" label="Descrição">
                    </el-table-column>
                    <el-table-column class-name="action-buttons td-actions" align="right" label="Ações">
                        <template slot-scope="props">
                            <p-button type="error" size="sm" icon @click="handleDetails(props.$index, props.row)">
                                <i class="fa fa-send"></i>
                            </p-button>
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
    <md-dialog :md-active.sync="showcadastrar">
        <div class="div">
            <group-cadastrar></group-cadastrar>
        </div>
    </md-dialog>
    <md-dialog :md-active.sync="showDetails">
        <div class="div">
            <group-details :selected="selected"></group-details>
        </div>
    </md-dialog>
    <md-dialog :md-active.sync="showUpdate">
        <div class="div">
            <group-edit :selected="selected"></group-edit>
        </div>
    </md-dialog>
</div>
</template>

<script>
// TODO - Wanderson - Fazer - Colocar o campo tipoUsuario para idenrificar se � Adm, Operador,
import axios from 'axios'
import Vue from 'vue'
import swal from 'sweetalert2'
import {
    Table,
    TableColumn
} from 'element-ui'
import PSwitch from 'src/components/UIComponents/Switch.vue'
import GroupEdit from '../Forms/Group/FormGroupEdit.vue'
import GroupDetails from '../Forms/Group/FormGroupDetails.vue'
import GroupCadastrar from '../Forms/Group/FormGroup.vue'
Vue.use(Table)
Vue.use(TableColumn)
export default {
    name: 'ListGroup',
    props: {
        selected: {
            type: Object,
            default: []
        }
    },
    components: {
        PSwitch,
        GroupCadastrar,
        GroupDetails,
        GroupEdit
    },
    data() {
        return {
            showcadastrar: false,
            showDetails: false,
            showUpdate: false,
            tableData: [],
            productsTable: [],
            qtd: null
        }
    },
    /*updated (){
      axios.get(process.env.VUE_APP_ROOT_API +'/user?where={"ativo": 1}').then(response => {
        this.tableData = response.data
      })
    },*/
    mounted() {
        axios.get(process.env.VUE_APP_ROOT_API + '/grupo?where={"ativo": 1}').then(response => {
            this.tableData = response.data
        })
    },
    methods: {
        handleDetails(index, row) {
            this.showDetails = true
            this.selected = row
        },
        handleLike() {
            this.showcadastrar = true
        },
        handleEdit(index, row) {
            this.showUpdate = true
            this.selected = row
        },
        handleDelete(index, row) {
            this.qtd = row.usuario.length
            let user = {
                ativo: false
            }
            if (row.id > 3 || row.usuario.length == 0 ) {
                axios.put(process.env.VUE_APP_ROOT_API + '/grupo/' + row.id, user)
                .then(response => {
                    this.results = response.data
                    axios.get(process.env.VUE_APP_ROOT_API + '/grupo?where={"ativo": 1}').then(response => {
                        this.tableData = response.data
                        swal('Bom trabalho!', `Grupo ${row.descricao} deletado com sucesso!`, 'success')
                        // this.$router.push('/forms/UserList')
                    })
                })
                .catch(error => {
                    alert(error.response)
                    console.log(error.response.data)
                })
            } else {
              swal('Importante!', `Grupo ${row.descricao} não pode ser deletado!`, 'error')
            }

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
                    sums[index] = `€ ${sum}`
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

.div {
    overflow: auto;
}
</style>
