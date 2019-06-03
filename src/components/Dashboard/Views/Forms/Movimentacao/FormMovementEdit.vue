<template>
<div class="card">
    <form>
        <div class="card-header">
            <h4 class="card-title">
                Editar Movimentação
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
                            <el-option class="select-default" v-for="item in this.dataMovimentacao" :key="item.id" :label="item.nome" :value="item.id">
                            </el-option>
                        </el-select>
                    </fg-input>
                    <label>Numero XP</label>
                    <fg-input type="text" name="id_xp" disabled v-model="model.id_xp">
                    </fg-input>
                    <label>Nome</label>
                    <fg-input type="text" name="nome" disabled v-model="model.nome">
                    </fg-input>
                    <label>Telefone</label>
                    <fg-input type="text" v-mask="'(##)#####-####'" disabled name="telefone" v-model="model.telefone">
                    </fg-input>
                    <label>E-mail</label>
                    <fg-input type="email" name="email" disabled v-model="model.email">
                    </fg-input>
                </el-card>
            </div>
            <div class="form-group col-md-4">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Assessor</span>
                    </div>
                    <label>Nome</label>
                    <fg-input type="text" name="nome" disabled v-model="modelAssessor.nome">
                    </fg-input>
                    <label>Telefone</label>
                    <fg-input type="text" name="telefone" disabled v-model="modelAssessor.telefone">
                    </fg-input>
                    <label>CPF</label>
                    <fg-input type="text" name="cpf" disabled v-model="modelAssessor.cpf">
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
                    <fg-input type="text" v-money="money" name="valor" v-model="model.valor">
                    </fg-input>
                    <label>Observação</label>
                    <fg-input type="text"  name="observacao" v-model="model.observacao">
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
import moment from 'moment'
import state from '../../UtilProject/state'
import {
    VMoney
} from 'v-money'
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
    name: 'FormMovimentacaoEdit',
    mixins: [state],
    data() {
        return {
            datePicker: '',
            selected: [],
            money: {
                decimal: ',',
                thousands: '.',
                precision: 2,
                masked: false /* doesn't work with directive */
            },
            model: {
                nome: '',
                data_registro: '',
                cnpj: '',
                telefone: '',
                email: '',
                id_xp: '',
                cliente: '',
                observacao: ''
            },
            modelAssessor: {
              nome: '',
              telefone:'',
              cpf:''
            },
            disabledDates: {
                to: new Date(Date.now() - 8640000)
            },
            dataMovimentacao: [],
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
        mask,
        money: VMoney
    },
    mounted() {

        axios.get(process.env.VUE_APP_ROOT_API + '/cliente?where={"ativo": 1}').then(response => {
            this.dataMovimentacao = response.data
        })
        axios.get(process.env.VUE_APP_ROOT_API + '/tipo_situacao_movimento?where={"ativo": 1}').then(response => {
            this.dataSituacao = response.data
        })
        axios.get(process.env.VUE_APP_ROOT_API + '/movimentacao/' + window.localStorage.getItem('movimentacao')).then(response => {
            this.dataMovimentacao = response.data
            this.model = this.dataMovimentacao
            this.modelAssessor = this.dataMovimentacao.id


            // window.localStorage.removeItem("movimentacao")
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
        retiraMascara(campo) {
            campo = campo.replace('.', '') // Remove tudo o que não é dígito
            campo = campo.replace(',', '.') // Remove tudo o que não é dígito
            return campo
        },
        salvar() {

            const authUser = JSON.parse(window.localStorage.getItem("usuario"))
            // console.log('valor Tela: ',this.model.valor)
            let movimentacao = {

                id_cliente: this.model.cliente[0],
                data_registro: moment(this.model.data_registro,"DD/MM/YYYY"),
                id_situacao_movimento: this.model.status,
                valor: this.retiraMascara(this.model.valor),
                observacao: this.model.observacao,
                id_responsavel: authUser.id
            }
            // console.log('valor Tela2 : ',movimentacao.valor)
            axios.post(process.env.VUE_APP_ROOT_API + '/movimentacao', movimentacao)
                .then(response => {
                    this.results = response.data
                    swal('Bom trabalho!', 'Movimentação cadastrada com sucesso!', 'success')
                    this.$router.push('/forms/MovementList')

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
