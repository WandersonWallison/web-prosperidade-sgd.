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
                    <p-button type="primary" @click="handleRegister()">Atualizar Movimentações</p-button>
                </div>
            </div>
        </div>
        <div class="card-body row">
            <el-table ref="multipleTable" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                 <el-table-column label="CÓDIGO" width="90">
                    <template slot-scope="scope">{{ scope.row.id }}</template>
                </el-table-column>
                <el-table-column label="CLIENTE" width="200">
                    <template slot-scope="scope">{{ scope.row.id_cliente.nome }}</template>
                </el-table-column>
                <el-table-column label="SITUAÇÃO" width="120">
                    <template slot-scope="scope">{{ scope.row.id_situacao_movimento.descricao }}</template>
                </el-table-column>
                 <el-table-column label="VALOR" width="120">
                    <template slot-scope="scope">{{ scope.row.valor | formatarMoeda }}</template>
                </el-table-column>
                 <el-table-column label="DATA REGISTRO" width="150">
                    <template slot-scope="scope">{{ scope.row.dthr_registro | maskData }}</template>
                </el-table-column>
                 <el-table-column label="OBSERVAÇÃO" width="200">
                    <template slot-scope="scope">{{ scope.row.observacao }}</template>
                </el-table-column>
            </el-table>
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
import {
    Money
} from 'v-money'
import moment from 'moment'
export default {
    name: 'FormAtualizaMovimentacao2',
    data() {
        return {
            tableData: [
            /*
            {
                date: '2016-05-03',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles'
            }, {
                date: '2016-05-02',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles'
            }, {
                date: '2016-05-04',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles'
            }, {
                date: '2016-05-01',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles'
            }, {
                date: '2016-05-08',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles'
            }, {
                date: '2016-05-06',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles'
            }, {
                date: '2016-05-07',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles'
            } */
            ],
            multipleSelection: []
        }
    },
    filters: {
        maskData: function (v) {
            v = moment(v).format('DD/MM/YYYY')
            return v
        },
        formatarMoeda: function (valor) {

            valor = valor + '00'
            valor = parseInt(valor.replace(/[\D]+/g, ''))
            valor = valor + ''
            valor = valor.replace(/([0-9]{2})$/g, ",$1")

            if (valor.length > 6) {
                valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2")
            }
            return 'R$ ' + valor
        }
    },
    created() {
        axios.get(process.env.VUE_APP_ROOT_API + '/movimentacao?where={"ativo": 1}').then(response => {
            this.tableData = response.data
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
        }
    }
}
</script>
