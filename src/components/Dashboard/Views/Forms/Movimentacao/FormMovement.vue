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
                    <fg-input :error="getError('cliente')" v-validate="modelValidations.cliente">
                        <el-select no-data-text="Sem informações" class="select-default" v-model="model.cliente" name="cliente" placeholder="Selecione...">
                            <el-option class="select-default" v-for="item in this.dataCliente" :key="item.id" :label="item.nome" :value="item.id">
                            </el-option>
                        </el-select>
                    </fg-input>
                    <label>Numero XP</label>
                    <fg-input type="text" name="nome" v-validate="modelValidations.nome" :error="getError('nome')" v-model="model.nome">
                    </fg-input>
                    <label>Nome</label>
                    <fg-input type="text" name="nome" v-validate="modelValidations.nome" :error="getError('nome')" v-model="model.nome">
                    </fg-input>
                    <label>Telefone</label>
                    <fg-input type="text" v-mask="'(##)#####-####'" name="telefone" v-validate="modelValidations.telefone" :error="getError('telefone')" v-model="model.telefone">
                    </fg-input>
                    <label>E-mail</label>
                    <fg-input type="email" name="email" v-validate="modelValidations.email" :error="getError('email')" v-model="model.email">
                    </fg-input>
                </el-card>
            </div>
            <div class="form-group col-md-4">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Assessor</span>
                    </div>
                    <label>CVN</label>
                    <fg-input type="text" name="cvn" v-validate="modelValidations.cvn" :error="getError('cvn')" v-model="model.cvn">
                    </fg-input>
                    <label>Nome</label>
                    <fg-input type="text" name="bairro" v-validate="modelValidations.bairro" :error="getError('bairro')" v-model="model.bairro">
                    </fg-input>
                    <label>Escritorio</label>
                    <fg-input type="text" name="bairro" v-validate="modelValidations.bairro" :error="getError('bairro')" v-model="model.bairro">
                    </fg-input>
                </el-card>
            </div>
            <div class="form-group col-md-4">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Valor Movimentado</span>
                    </div>
                    <div class="block">
                        <span class="demonstration">Default</span>
                        <el-date-picker v-model="value1" type="date" placeholder="Pick a day">
                        </el-date-picker>
                    </div>
                    <label>Valor movimentado</label>
                    <fg-input type="text" v-mask="'###.###.###-##'" name="cpf" v-validate="modelValidations.cpf" :error="getError('cpf')" v-model="model.cpf">
                    </fg-input>
                    <fg-input :error="getError('cliente')" v-validate="modelValidations.cliente">
                        <el-select no-data-text="Sem informações" class="select-default" v-model="model.cliente" name="cliente" placeholder="Selecione...">
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
export default {
    name: 'FormMovimentacao',
    data() {
        return {
            model: {
                // cliente --------------
                nome: '',
                razao_social: '',
                cnpj: '',
                telefone: '',
                email: '',
                numero_xp: '',
                investimento_inicial: '',
                potencial_investimento: '',
                // Física ----------------
                rg: '',
                cpf: '',
                // Jurídica --------------
                razao_social: '',
                cnpj: '',
                // Endereço --------------
                cep: '',
                logradouro: '',
                numero: '',
                bairro: '',
                cidade: '',
                estado: '',
                value1: false,
                habilitado_bovespa: true,
                tipo: '',
                operador: '',
                assessor: ''

            },
            dataOperadores: [],
            dataAssessores: [],
            dataCliente: [],
            dataSituacao: [],
            endereco: [],
            results: [],
            resultAdress: [],
            modelValidations: {
                nome: {
                    required: true
                },
                telefone: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                numero_xp: {
                    required: true
                },
                investimento_inicial: {
                    required: true
                },
                potencial_investimento: {
                    required: true
                },
                tipoAddress: {
                    required: true
                },
                logradouro: {
                    required: true
                },
                numero: {
                    required: true
                },
                bairro: {
                    required: true
                },
                cidade: {
                    required: true
                },
                cep: {
                    required: true
                },
                estado: {
                    required: true
                },
                operador: {
                    required: true
                },
                assessor: {
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
        buscarEndereco() {
            this.model.bairro = ''
            this.model.logradouro = ''
            this.model.cidade = ''
            this.model.estado = ''

            axios.get('https://api.postmon.com.br/v1/cep/' + this.model.cep)
                .then(response => {
                    this.endereco = response.data
                    if (this.endereco.cidade) {
                        this.model.cidade = this.endereco.cidade
                    }
                    if (this.endereco.bairro) {
                        this.model.bairro = this.endereco.bairro
                    }
                    if (this.endereco.logradouro) {
                        this.model.logradouro = this.endereco.logradouro
                    }
                    if (this.endereco.complemento) {
                        this.model.complemento = this.endereco.complemento
                    }
                    if (this.endereco.estado) {
                        this.model.estado = this.endereco.estado
                    }
                })
                .catch(error => {
                    // alert('Erro no cadastro do Endereço')
                    console.log(error.response.data)
                })
        },
        salvar() {

            const authUser = JSON.parse(window.localStorage.getItem("usuario"))

            let documento
            if (this.model.cnpj) {
                documento = this.model.cnpj
            } else if (this.model.cpf) {
                documento = this.model.cpf
            } else {
                documento = ''
            }

            let cliente = {

                id_xp: this.model.numero_xp,
                nome: this.model.nome,
                razao_social: this.model.razao_social,
                telefone: this.model.telefone,
                email: this.model.email,
                cpf_cnpj: documento,
                potencial_investimento: this.model.potencial_investimento,
                investimento_inicial: this.model.investimento_inicial,
                razao_social: this.model.razao_social,
                rg: this.model.rg,
                habilitado_bovespa: this.model.habilitado_bovespa,
                id_responsavel: authUser.id,
                id_operador: this.model.operador,
                id_assessor: this.model.assessor

            }
            let endereco = {
                logradouro: this.model.logradouro,
                cep: this.model.cep,
                uf: this.model.estado,
                bairro: this.model.bairro,
                cidade: this.model.cidade,
                numero: this.model.numero,
                tipo: this.model.tipo
            }
            axios.post(process.env.VUE_APP_ROOT_API + '/cliente', cliente)
                .then(response => {
                    this.results = response.data
                    endereco.id_cliente = response.data.id
                    // Cadastro de Endereço o cliente será referenciado no campo de id_user da tabela de endereço
                    axios.post(process.env.VUE_APP_ROOT_API + '/endereco', endereco)
                        .then(response => {
                            this.resultAdress = response.data
                            swal('Bom trabalho!', 'Cliente Cadastrada com sucesso!', 'success')
                            this.$router.push('/forms/ClientList')
                        })
                        .catch(error => {
                            swal('Algo de errado!', 'Verifique os campos do endereço cadastro!', 'error')
                            console.log(error.response.data)
                        })
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
