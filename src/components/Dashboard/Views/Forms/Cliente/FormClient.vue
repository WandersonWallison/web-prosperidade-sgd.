<template>
<div class="card">
    <form>
        <div class="card-header">
            <h4 class="card-title">
                Cadastro de Cliente
            </h4>
        </div>
        <div class="card-body row justify-content-center">

            <div class="form-group col-md-10">
                <el-switch v-model="model.value1" active-color="#20B2AA" inactive-color="#00BFFF" active-text="Pessoa Jurídica" inactive-text="Pessoa Física">
                </el-switch>
            </div>
            <br/>
            <div class="form-group col-md-6">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Dados</span>
                    </div>
                    <label>Numero XP</label>
                    <fg-input type="text" name="numero_xp" v-validate="modelValidations.numero_xp" :error="getError('numero_xp')" v-model="model.numero_xp">
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
                    <label>Investimento Inicial</label>
                    <fg-input type="text" v-mask="'########,##'" name="investimento_inicial" v-validate="modelValidations.investimento_inicial" :error="getError('investimento_inicial')" v-model="model.investimento_inicial">
                    </fg-input>
                    <label>Potencial de Investimento</label>
                    <fg-input type="text" v-mask="'########,##'" name="potencial_investimento" v-validate="modelValidations.potencial_investimento" :error="getError('potencial_investimento')" v-model="model.potencial_investimento">
                    </fg-input>
                </el-card>
                <br>
                <div name="fisica" v-if="!this.model.value1">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>Pessoa Física</span>
                        </div>
                        <label>RG</label>
                        <fg-input type="text" v-mask="'###############'" name="rg" v-validate="modelValidations.rg" :error="getError('rg')" v-model="model.rg">
                        </fg-input>
                        <label>CPF</label>
                        <fg-input type="text" v-mask="'###.###.###-##'" name="cpf" v-validate="modelValidations.cpf" :error="getError('cpf')" v-model="model.cpf">
                        </fg-input>
                    </el-card>
                </div>
                <div name="juridica" v-if="this.model.value1">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>Pessoa Jurídica</span>
                        </div>
                        <label>Razão Social</label>
                        <fg-input type="text" name="razao_social" v-validate="modelValidations.razao_social" :error="getError('razao_social')" v-model="model.razao_social">
                        </fg-input>
                        <label>CNPJ</label>
                        <fg-input type="text" v-mask="'##.###.###/####-##'" name="cnpj" v-validate="modelValidations.cnpj" :error="getError('cnpj')" v-model="model.cnpj">
                        </fg-input>
                    </el-card>
                </div>
            </div>
            <div class="form-group col-md-6">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Endereço</span>
                    </div>
                    <label>CEP</label>
                    <fg-input type="text" v-mask="'#####-###'" name="cep" v-validate="modelValidations.cep" :error="getError('numero')" @change="buscarEndereco($event)" v-model="model.cep">
                    </fg-input>
                    <label>Logradouro</label>
                    <fg-input type="text" name="logradouro" v-validate="modelValidations.logradouro" :error="getError('logradouro')" v-model="model.logradouro">
                    </fg-input>
                    <label>Número</label>
                    <fg-input type="text" v-mask="'######'" name="numero" v-validate="modelValidations.numero" :error="getError('numero')" v-model="model.numero">
                    </fg-input>
                    <label>Bairro</label>
                    <fg-input type="text" name="bairro" v-validate="modelValidations.bairro" :error="getError('bairro')" v-model="model.bairro">
                    </fg-input>
                    <label>Cidade</label>
                    <fg-input type="text" name="cidade" v-validate="modelValidations.cidade" :error="getError('cidade')" v-model="model.cidade">
                    </fg-input>
                    <label>Estado</label>
                    <fg-input :error="getError('estado')" v-validate="modelValidations.estado">
                        <el-select class="select-default" v-model="model.estado" name="estado" placeholder="Selecione...">
                            <el-option class="select-default" v-for="item in optionsStade" :key="item.value" :label="item.label" :value="item.value">
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
    name: 'FormCompany',
    data() {
        return {
            model: {
                // Empresa --------------
                nome: '',
                razao_social: '',
                cnpj: '',
                telefone: '',
                email: '',
                numero_xp: '',
                investimento_inicial: '',
                potencial_investimento: '',
                // Física ----------------
                rg:'',
                cpf:'',
                // Jurídica --------------
                razao_social: '',
                cnpj:'',
                // Endereço --------------
                cep: '',
                logradouro: '',
                numero: '',
                bairro: '',
                cidade: '',
                estado: '',
                value1: true
            },
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
                }
            },
            optionsStade: [{
                    value: 'AC',
                    label: 'Acre'
                },
                {
                    value: 'AL',
                    label: 'Alagoas'
                },
                {
                    value: 'AP',
                    label: 'Amapá'
                },
                {
                    value: 'AM',
                    label: 'Amazonas'
                },
                {
                    value: 'BA',
                    label: 'Bahia'
                },
                {
                    value: 'CE',
                    label: 'Ceará'
                },
                {
                    value: 'DF',
                    label: 'Distrito Federal'
                },
                {
                    value: 'ES',
                    label: 'Espírito Santo'
                },
                {
                    value: 'GO',
                    label: 'Goiás'
                },
                {
                    value: 'MA',
                    label: 'Maranhão'
                },
                {
                    value: 'MT',
                    label: 'Mato Grosso'
                },
                {
                    value: 'MS',
                    label: 'Mato Grosso do Sul'
                },
                {
                    value: 'MG',
                    label: 'Minas Gerais'
                },
                {
                    value: 'PA',
                    label: 'Pará'
                },
                {
                    value: 'PB',
                    label: 'Paraíba'
                },
                {
                    value: 'PR',
                    label: 'Paraná'
                },
                {
                    value: 'PE',
                    label: 'Pernambuco'
                },
                {
                    value: 'PI',
                    label: 'Piauí'
                },
                {
                    value: 'RJ',
                    label: 'Rio de Janeiro'
                },
                {
                    value: 'RN',
                    label: 'Rio Grande do Norte'
                },
                {
                    value: 'RS',
                    label: 'Rio Grande do Sul'
                },
                {
                    value: 'RO',
                    label: 'Rondônia'
                },
                {
                    value: 'RR',
                    label: 'Roraima'
                },
                {
                    value: 'SC',
                    label: 'Santa Catarina'
                },
                {
                    value: 'SP',
                    label: 'São Paulo'
                },
                {
                    value: 'SE',
                    label: 'Sergipe'
                },
                {
                    value: 'TO',
                    label: 'Tocantins'
                }
            ]
        }
    },
    directives: {
        mask
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
            let empresa = {
                nome: this.model.nome,
                razao_social: this.model.razao_social,
                telefone: this.model.telefone,
                email: this.model.email,
                cnpj: this.model.cnpj
            }
            let endereco = {
                logradouro: this.model.logradouro,
                cep: this.model.cep,
                uf: this.model.estado,
                bairro: this.model.bairro,
                cidade: this.model.cidade,
                numero: this.model.numero,
                tipo: 'Comercial'
            }
            axios.post(process.env.VUE_APP_ROOT_API + '/empresa', empresa)
                .then(response => {
                    this.results = response.data
                    endereco.id_empresa = response.data.id
                    // Cadastro de Endereço
                    axios.post(process.env.VUE_APP_ROOT_API + '/endereco', endereco)
                        .then(response => {
                            this.resultAdress = response.data
                            swal('Bom trabalho!', 'Empresa Cadastrada com sucesso!', 'success')
                            this.$router.push('/forms/companyList')
                        })
                        .catch(error => {
                            swal('Algo de errado!', 'Verifique os campos do cadastro!', 'error')
                            console.log(error.response.data)
                        })
                })
                .catch(error => {
                    swal('Algo de errado!', 'Verifique os campos do cadastro!', 'error')
                    console.log(error.response.data)
                })
        }
    }
}
</script>

<style>
</style>
