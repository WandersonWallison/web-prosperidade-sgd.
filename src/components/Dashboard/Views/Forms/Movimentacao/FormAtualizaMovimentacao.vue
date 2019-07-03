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
            <div class="col-lg-6">
                <label>status</label>
                <fg-input>
                    <el-select no-data-text="Sem Informações" class="select-default" v-model="model.status" name="status" placeholder="Selecione uma Status.">
                        <el-option class="select-default" v-for="item in status_movimentacao" :key="item.id" :label="item.descricao" :value="item.id">
                        </el-option>
                    </el-select>
                </fg-input>
            </div>
        </div>
        <div class="card-body row">
            <el-table ref="multipleTable" no-data-text="Sem Informações" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
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
            tableData: [],
            status_movimentacao: [],
            multipleSelection: [],
            results: [],
            model: {
                status: ''
            }
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
        axios.get(process.env.VUE_APP_ROOT_API + '/tipo_situacao_movimento?where={"ativo": 1}').then(response => {
            this.status_movimentacao = response.data
        })
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
        }
    }
}
</script>
