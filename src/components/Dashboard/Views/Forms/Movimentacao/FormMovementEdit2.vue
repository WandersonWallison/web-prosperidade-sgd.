<template>
<div class="card">
    <form>
        <div class="card-header">
            <h4 class="card-title">
                Editar Movimentação
            </h4>
        </div>
        <div class="card-body row justify-content">
            <div class="form-group col-md-12">
                <el-card class="box-card">
                    <!--
                    <label>Observação</label>
                    <fg-input type="text" name="observacao" v-model="model.observacao">
                    </fg-input>
                    -->
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
    props: ['selected'],
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
                observacao: '',
                status: ''
            },
            modelAssessor: {
                nome: '',
                telefone: '',
                cpf: ''
            },
            disabledDates: {
                to: new Date(Date.now() - 8640000)
            },
            dataMovimentacao: [],
            dataSituacao: [],
            results: [],
            modelValidations: {
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
        salvar() {

            const authUser = JSON.parse(window.localStorage.getItem("usuario"))
            // console.log('valor Tela: ',this.model.valor)
            let movimentacao = {
                id_situacao_movimento: this.model.status,
                id_responsavel: authUser.id
            }
            // console.log('valor Tela2 : ',movimentacao.valor)
            axios.put(process.env.VUE_APP_ROOT_API + '/movimentacao/' + this.selected.id, movimentacao)
                .then(response => {
                    this.results = response.data
                    swal('Bom trabalho!', 'Movimentação Alterada com sucesso!', 'success')
                    this.$router.push('/forms/MovementList')
                })
                .catch(error => {
                    swal('Algo de errado!', 'Verifique os campos da alteração da movimentação!', 'error')
                    console.log(error.response.data)
                })
        }
    }
}
</script>

<style>
</style>
