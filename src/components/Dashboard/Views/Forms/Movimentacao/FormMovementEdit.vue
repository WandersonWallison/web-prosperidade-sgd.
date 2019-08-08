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
            <div class="form-group col-md-6">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Cliente</span>
                    </div>
                    <label>Cliente</label>
                    <fg-input type="text" name="cliente" disabled v-model="model.cliente">
                    </fg-input>
                    <label>Numero XP</label>
                    <fg-input type="text" name="id_xp" disabled v-model="model.id_xp">
                    </fg-input>
                    <label>Telefone</label>
                    <fg-input type="text" v-mask="'(##)#####-####'" disabled name="telefone" v-model="model.telefone">
                    </fg-input>
                    <label>E-mail</label>
                    <fg-input type="email" name="email" disabled v-model="model.email">
                    </fg-input>
                </el-card>
            </div>
            <!--
            <div class="form-group col-md-4">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Assessor</span>
                    </div>
                    <label>Nome</label>
                    <fg-input type="text" name="nome_assessor" disabled v-model="model.nome_assessor">
                    </fg-input>
                    <label>Telefone</label>
                    <fg-input type="text" name="telefone_assessor" disabled v-model="model.telefone_assessor">
                    </fg-input>
                    <label>CPF</label>
                    <fg-input type="text" name="cpf_assessor" disabled v-model="model.cpf_assessor">
                    </fg-input>
                </el-card>
            </div>
            -->
            <div class="form-group col-md-6">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Movimentação</span>
                    </div>
                    <div class="block">
                        <div class="form-group">
                            <label>Data de Registro</label>
                            <el-date-picker v-model="model.data_registro" disabled :disabledDates="disabledDates" type="date" format="dd/MM/yyyy">
                            </el-date-picker>
                        </div>
                    </div>
                    <label>Valor movimentado</label>
                    <fg-input type="text" v-model="model.valor" name="valor" disabled>
                    </fg-input>
                    <label>Observação</label>
                    <fg-input type="text" name="observacao" disabled v-model="model.observacao">
                    </fg-input>
                    <label>Status Atual</label>
                    <fg-input type="text" name="statusAtual" disabled v-model="model.statusAtual">
                    </fg-input>
                    <label>Status Novo</label>
                    <fg-input>
                        <el-select no-data-text="Carregando..." class="select-default" v-model="model.status" name="status" placeholder="Selecione...">
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
            movimentacaoEdit: '',
            price: null,
            model: {
                nome: '',
                data_registro: '',
                cnpj: '',
                telefone: '',
                email: '',
                id_xp: '',
                cliente: '',
                observacao: '',
                valor: ''
            },
            disabledDates: {
                to: new Date(Date.now() - 8640000)
            },
            money: {
                decimal: ',',
                thousands: '.',
                prefix: 'R$ ',
                suffix: '',
                precision: 2,
                masked: false /* doesn't work with directive */
            },
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
    created() {
        axios.get(process.env.VUE_APP_ROOT_API + '/tipo_situacao_movimento?where={"ativo": 1}').then(response => {
            this.dataSituacao = response.data
        })
        axios.get(process.env.VUE_APP_ROOT_API + '/movimentacao/' + window.localStorage.getItem("movimentacao")).then(response => {

            this.movimentacaoEdit = response.data
            this.model.cliente = this.movimentacaoEdit.id_cliente.nome
            this.model.nome = this.movimentacaoEdit.id_cliente.nome
            this.model.id_xp = this.movimentacaoEdit.id_cliente.id_xp
            this.model.nome = this.movimentacaoEdit.id_cliente.nome
            this.model.email = this.movimentacaoEdit.id_cliente.email
            this.model.telefone = this.movimentacaoEdit.id_cliente.telefone
            this.model.valor = this.movimentacaoEdit.valor
            this.model.observacao = this.movimentacaoEdit.observacao
            this.model.data_registro = this.movimentacaoEdit.data_registro
            this.model.statusAtual = this.movimentacaoEdit.id_situacao_movimento.descricao

            window.localStorage.removeItem("movimentacao")
        })
    },
    methods: {
        getError(fieldName) {
            return this.errors.first(fieldName)
        },
        validate() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.$emit('on-submit', this.salvar(), result)
                    return
                }
                swal('Por favor verificar os dados solicitados no formulario!','', 'info')
            })
        },
        retiraMascara(campo) {
            campo = campo.replace('.', '') // Remove tudo o que não é dígito
            campo = campo.replace(',', '.') // Remove tudo o que não é dígito
            return campo
        },
        // TODO - melhorar essa função de mascara
        /*
        mascaraMonetaria(i) {
            i = i.value.replace(/\D/g, '')
            i = (i / 100).toFixed(2) + ''
            i = i.replace(".", ",")
            i = i.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,")
            i = i.replace(/(\d)(\d{3}),/g, "$1.$2,")
            // i.value = v
            return i
        },
        */
        salvar() {

            const authUser = JSON.parse(window.localStorage.getItem("usuario"))
            // console.log('valor Tela: ',this.model.valor)
            let movimentacao = {

                id_situacao_movimento: this.model.status,
                id_responsavel: authUser.id
            }
            // console.log('valor Tela2 : ',movimentacao.valor)
            axios.put(process.env.VUE_APP_ROOT_API + '/movimentacao/' + this.movimentacaoEdit.id, movimentacao)
                .then(response => {
                    this.results = response.data
                    swal('Bom trabalho!', 'Movimentação Alterada com sucesso!', 'success')
                    this.$router.push('/forms/MovementList')
                })
                .catch(error => {
                    swal('Algo de errado!', 'Verifique os campos da alteração!', 'error')
                    console.log(error.response.data)
                })
        }
    }
}
</script>

<style>
</style>
