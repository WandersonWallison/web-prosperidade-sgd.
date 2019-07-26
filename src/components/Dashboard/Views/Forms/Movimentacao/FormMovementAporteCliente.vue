<template>
<div class="card">
    <form>
        <div class="card-header">
            <h4 class="card-title">
                Aporte Cliente
            </h4>
        </div>
        <div class="card-body row justify-content-center">
            <br />
            <div class="form-group col-md-6">
                <el-card class="box-card new-card">
                    <div slot="header" class="clearfix">
                        <span>Cliente</span>
                    </div>
                    <div class="form-group col-md-10">
                        <el-switch v-model="model.tipo_movimentacao" data-vv-name=" tipo_movimentacao " data-vv-as=" Confirmação de tipo de pessoa " name="tipo_movimentacao" active-color="#ff0000" inactive-color="#00BFFF" active-text="Retirada" inactive-text="Aporte">
                        </el-switch>
                    </div>
                    <br>
                    <div>
                        <label>Nome - Numero XP</label>
                        <fg-input>
                            <el-select no-data-text="Sem informações" @change="validaRetirada(model.cliente[0])" class="select-default" 
                            v-model="model.cliente" 
                            name="cliente" 
                            filterable 
                            allow-create
                            default-first-option 
                            placeholder="Selecione...">
                                <el-option class="select-default" v-for="item in this.dataCliente" :key="item.id" :label="item.nome + ' - ' + item.id_xp" :value="[item.id,item.id_xp,item.nome,item.telefone,item.email,item.investimento_inicial,item.potencial_investimento]">
                                </el-option>
                            </el-select>
                        </fg-input>
                    </div>
                </el-card>
            </div>
            <div class="form-group col-md-6">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Aporte Inicial</span>
                    </div>
                    <div>
                        <div class="new-label">
                            <label>{{model.cliente[5] | formatarMoedaFilter}}</label>
                        </div>
                    </div>
                </el-card>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Potencial do Cliente</span>
                    </div>
                    <div>
                        <div class="new-label">
                            <label>{{model.cliente[6] | formatarMoedaFilter}}</label>
                        </div>
                    </div>
                </el-card>
            </div>
            <div class="form-group col-md-6">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Dados</span>
                    </div>
                    <label>Numero XP</label>
                    <fg-input type="text" name="numero_xp" disabled v-model="model.cliente[1]">
                    </fg-input>
                    <label>Nome</label>
                    <fg-input type="text" name="nome" disabled v-model="model.cliente[2]">
                    </fg-input>
                    <label>Telefone</label>
                    <fg-input type="text" v-mask="'(##)#####-####'" disabled name="telefone" v-model="model.cliente[3]">
                    </fg-input>
                    <label>E-mail</label>
                    <fg-input type="email" name="email" disabled v-model="model.cliente[4]">
                    </fg-input>
                </el-card>
            </div>
            <!-- APORTE DE CLIENTE -->
            <div class="form-group col-md-6">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Aporte</span>
                    </div>
                    <div v-if="!this.model.tipo_movimentacao">
                        <label>Saldo para Aporte</label>
                        <fg-input type="text" name="saldo_movimento" disabled v-model=this.valorAporte>
                        </fg-input>
                    </div>
                    <div v-if="!this.model.tipo_movimentacao">
                        <label>Status</label>
                        <fg-input type="text" name="status" disabled placeholder="Aporte Cliente">
                        </fg-input>
                    </div>
                    <div v-if="this.model.tipo_movimentacao">
                        <label>Saldo Retirada</label>
                        <fg-input type="text" name="saldo_movimento" disabled v-model=this.valorRetirada>
                        </fg-input>
                    </div>
                    <div v-if="this.model.tipo_movimentacao">
                        <label>Status</label>
                        <fg-input type="text" name="status" disabled placeholder="Retirada Aporte Cliente">
                        </fg-input>
                    </div>
                    <div class="block">
                        <div class="form-group">
                            <label>Data de Registro</label>
                            <el-date-picker v-model="model.data_registro" :disabledDates="disabledDates" type="date" format="dd/MM/yyyy">
                            </el-date-picker>
                        </div>
                    </div>
                    <label>Valor movimentado</label>
                    <fg-input type="text" v-money="money" name="valor" v-validate="modelValidations.valor" :error="getError('valor')" v-model="model.valor">
                    </fg-input>
                    <label>Observação</label>
                    <fg-input type="text" name="observacao" v-model="model.observacao">
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
    name: 'FormMovimentacaoAporteCliente',
    mixins: [state],
    data() {
        return {
            datePicker: '',
            selected: [],
            money: {
                decimal: ',',
                thousands: '.',
                prefix: 'R$ ',
                precision: 2,
                masked: false /* doesn't work with directive */
            },
            model: {
                nome: '',
                data_registro: '',
                cnpj: '',
                telefone: '',
                email: '',
                numero_xp: '',
                cliente: '',
                numero_xp: '',
                observacao: '',
                tipo_movimentacao: false
            },
            disabledDates: {
                to: new Date(Date.now() - 8640000)
            },
            valorAporte: '0,00',
            valorRetirada: 0,
            valor_cliente: 0,
            dataCliente: [],
            results: [],
            modelValidations: {
                data: {
                    required: true
                },
                valor: {
                    required: true
                }

            }
        }
    },
    filters: {

        // TODO - Formatação de moeda via filter
        formatarMoedaFilter(valor) {

            if (valor) {
                var numero = valor.toFixed(2).split('.')
                numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.')
                return numero.join(',')
            }
        }
    },
    directives: {
        mask,
        money: VMoney
    },
    mounted() {

        axios.get(process.env.VUE_APP_ROOT_API + '/cliente?where={"ativo": 1}&sort=nome&limit=100000').then(response => {
            this.dataCliente = response.data
        })

    },
    methods: {
        getError(fieldName) {
            return this.errors.first(fieldName)
        },
        validate() {
            /*
              this.$validator.validateAll().then(isValid => {
                  this.$emit('on-submit', this.salvar(), isValid)
              })
            */
            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.$emit('on-submit', this.salvar(), result)
                    return
                }
                swal('Por favor verificar os dados solicitados no formulario!', '', 'info')
            })
        },
        formatarMoeda(valor) {

            if (valor) {
                var numero = valor.toFixed(2).split('.')
                numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.')
                return numero.join(',')
            }
        },
        retiraMascara(campo) {

          for (let index = 0; index < campo.length; index++) {
            campo = campo.replace('.', '') // Remove tudo o que não é dígito
          }
            campo = campo.replace('R$', '')
            campo = campo.replace(',', '.') // Remove tudo o que não é dígito
            campo = campo.trim()
            return campo
        },
        salvar() {

            if (!this.model.tipo_movimentacao) {

                if(this.validaValorAporte(this.model.valor)){
                  swal('Valor solicitado é maior que o \nPotencial Acumulado do Cliente ' + this.valorAporte, 'Verifique o campo no cadastro de cliente!', 'info')
                } else {
                  this.salvarDados()
                }

            } else {

                if (this.validaValorRetirada(this.retiraMascara(this.model.valor))) {
                    this.salvarDados()
                } else {
                    swal('Valor solicitado maior que o saldo do cliente \n' + this.valorRetirada, 'Verifique o campo no cadastro de cliente!', 'info')
                }
            }

        },
        salvarDados() {

            const authUser = JSON.parse(window.localStorage.getItem("usuario"))
            let situacaoMovimento = this.model.tipo_movimentacao ? 3 : 1

            let movimentacao = {

                id_cliente: this.model.cliente[0],
                data_registro: moment(this.model.data_registro, "DD/MM/YYYY"),
                id_situacao_movimento: 1,
                id_tipo_movimentacao: situacaoMovimento,
                valor: this.retiraMascara(this.model.valor),
                observacao: (this.model.observacao) ? this.model.observacao: 'Aporte/Retirada',
                id_responsavel: authUser.id
            }
            // console.log('valor Tela2 : ',movimentacao.valor)
            axios.post(process.env.VUE_APP_ROOT_API + '/movimentacao', movimentacao)
                .then(response => {
                    this.results = response.data
                    swal('Bom trabalho!', 'Movimentação cadastrada com sucesso!', 'success')
                    this.$router.push('/forms/MovementListAporteCliente')

                })
                .catch(error => {
                    swal('Algo de errado!', 'Verifique os campos do cadastro de cliente!', 'error')
                    console.log(error.response.data)
                })
        },
        validaRetirada(id) {
            axios.get(process.env.VUE_APP_ROOT_API + '/calcula_movimentacao?user_id=' + id).then(response => {
                this.valor_cliente = (response.data) ? response.data : '0,00'
                this.valorRetirada = response.data ? this.formatarMoeda(response.data) : '0,00'
            })
            axios.get(process.env.VUE_APP_ROOT_API + '/calcula_aporte?user_id=' + id).then(response => {
                this.valor_cliente = (response.data) ? response.data : '0,00'
                this.valorAporte = response.data ? this.formatarMoeda(response.data) : '0,00'
            })
        },
        validaValorRetirada(valor) {

            if (valor > this.valor_cliente) {
                return false
            }
            return true
        },
        validaValorAporte(valor){

          let v1 = this.retiraMascara(valor)
          let v2 = this.retiraMascara(this.valorAporte)
          if (parseInt(v1) > parseInt(v2)){
              return true
          }
          return false
        }
    }
}
</script>

<style lang="scss">
.new-card {
    padding: 26px;
}

.new-card-aporte {
    padding: 63px;
}

.new-label {
    font-size: x-large;
    color-adjust: red;
}
.color-aporte-inicial {
    background: lightgrey;
}
</style>
