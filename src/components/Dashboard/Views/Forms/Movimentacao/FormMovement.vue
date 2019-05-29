<template>
<div class="card">
    <form>
        <div class="card-header">
            <h4 class="card-title">
                Cadastro de Movimentação
            </h4>
        </div>
        <div class="card-body row justify-content-center">

            <br/>
            <div class="form-group col-md-4">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Cliente</span>
                    </div>
                    <label>Clientes</label>
                    <fg-input>
                        <el-select no-data-text="Sem informações" class="select-default" v-model="model.cliente" name="cliente" placeholder="Selecione...">
                            <el-option class="select-default" v-for="item in this.dataCliente" :key="item.id" :label="item.nome" :value="[item.id,item.nome]">
                            </el-option>
                        </el-select>
                    </fg-input>
                    <label>Numero XP</label>
                    <fg-input type="text" name="numero_xp" v-model="model.cliente.item">
                    </fg-input>
                    <label>Nome</label>
                    <fg-input type="text" name="nome" v-model="model.nome">
                    </fg-input>
                    <label>Telefone</label>
                    <fg-input type="text" v-mask="'(##)#####-####'" name="telefone" v-model="model.telefone">
                    </fg-input>
                    <label>E-mail</label>
                    <fg-input type="email" name="email" v-model="model.email">
                    </fg-input>
                </el-card>
            </div>
            <div class="form-group col-md-4">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Assessor</span>
                    </div>
                    <label>CVN</label>
                    <fg-input type="text" name="cvn" v-model="model.cvn">
                    </fg-input>
                    <label>Nome</label>
                    <fg-input type="text" name="nome_assessor" v-model="model.nome_assessor">
                    </fg-input>
                    <label>Escritorio</label>
                    <fg-input type="text" name="escritorio" v-model="model.escritorio">
                    </fg-input>
                </el-card>
            </div>
            <div class="form-group col-md-4">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Movimentação</span>
                    </div>
                    <div class="block">
                        <div class="form-group">
                            <label>Data de Registro</label>
                            <el-date-picker v-model="model.data_registro" :disabledDates="disabledDates" type="date" format="dd/MM/yyyy">
                            </el-date-picker>
                        </div>
                    </div>
                    <label>Valor movimentado</label>
                    <fg-input type="text" v-mask="'###.###.###-##'" name="valor" v-model="model.valor">
                    </fg-input>
                    <label>Status</label>
                    <fg-input>
                        <el-select no-data-text="Sem informações" class="select-default" v-model="model.status" name="cliente" placeholder="Selecione...">
                            <el-option class="select-default" v-for="item in this.dataSituacao" :key="item.id" :label="item.descricao" :value="item.id">
                            </el-option>
                        </el-select>
                    </fg-input>
                </el-card>
            </div>
        </div>
        <div class="card-footer text-right">
            <p-button type="info" @click.prevent="validate">Salvar</p-button>
        </div>
    </form>
</div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'
import {
    mask
} from 'vue-the-mask'
import {
    DatePicker
} from 'element-ui'
export default {
    components: {
        [DatePicker.name]: DatePicker
    },
    name: 'FormMovimentacao',
    data() {
        return {
            datePicker: '',
            model: {
                nome: '',
                data_registro: '',
                cnpj: '',
                telefone: '',
                email: '',
                numero_xp: '',
                cliente: '',
                numero_xp: '',
            },
            disabledDates: {
                to: new Date(Date.now() - 8640000)
            },
            dataCliente: [],
            dataSituacao: [],
            results: [],
            modelValidations: {
                data: {
                    required: true
                },
                valor: {
                    required: true
                },
                status: {
                    required: true
                }
            }
        }
    },
    directives: {
        mask
    },
    mounted() {
        axios.get(process.env.VUE_APP_ROOT_API + '/cliente?where={"ativo": 1}').then(response => {
            this.dataCliente = response.data
        })
        axios.get(process.env.VUE_APP_ROOT_API + '/tipo_situacao_movimento?where={"ativo": 1}').then(response => {
            this.dataSituacao = response.data
        })
    },
    methods: {
        getError(fieldName) {
            return this.errors.first(fieldName)
        },
        validate() {
            this.$validator.validateAll().then(isValid => {
                this.$emit('on-submit', this.salvar(), isValid)
            })
        },
        buscarCliente() {
            alert('teste')
        },
        salvar() {

            const authUser = JSON.parse(window.localStorage.getItem("usuario"))

            let movimentacao = {
                /*
                id_cliente: this.model.numero_xp,
                data_registro: this.model.data_registro,
                status: this.model.razao_social,
                id_responsavel: authUser.id
                */

            }

            axios.post(process.env.VUE_APP_ROOT_API + '/movimentacao', movimentacao)
                .then(response => {
                    this.results = response.data
                    swal('Bom trabalho!', 'Cliente Cadastrada com sucesso!', 'success')
                    this.$router.push('/forms/ClientList')

                })
                .catch(error => {
                    swal('Algo de errado!', 'Verifique os campos do cadastro de cliente!', 'error')
                    console.log(error.response.data)
                })
        }
    }
}
</script>

<style>
</style>
