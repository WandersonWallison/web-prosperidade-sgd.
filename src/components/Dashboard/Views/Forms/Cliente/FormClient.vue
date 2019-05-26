<template>
<div class="card">
    <form>
        <div class="card-header">
            <h4 class="card-title">
                Cadastro de Cliente
            </h4>
        </div>
        <div class="card-body row justify-content-center">

            <br/>
            <div class="form-group col-md-6">
                <el-card class="box-card">
                    <div class="form-group col-md-10">
                        <el-switch v-model="model.value1" active-color="#20B2AA" inactive-color="#00BFFF" active-text="Pessoa Jurídica" inactive-text="Pessoa Física">
                        </el-switch>
                    </div>
                    <div slot="header" class="clearfix">
                        <span>Dados</span>
                    </div>
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
                <br>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Endereço</span>
                    </div>
                    <label>Tipo Endereço</label>
                    <fg-input :error="getError('tipo')" v-validate="modelValidations.tipo">
                        <el-select class="select-default" v-model="model.tipo" name="estado" placeholder="Selecione...">
                            <el-option class="select-default" v-for="item in optionsTipo" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </fg-input>
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
            <div class="form-group col-md-6">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Dados Conta</span>
                    </div>
                    <div>
                        <el-checkbox v-model="model.habilitado_bovespa">Habilitado bovespa</el-checkbox>
                    </div>
                    <label>Numero XP</label>
                    <fg-input type="text" name="numero_xp" v-validate="modelValidations.numero_xp" :error="getError('numero_xp')" v-model="model.numero_xp">
                    </fg-input>
                    <label>Operador</label>
                    <fg-input :error="getError('operador')" v-validate="modelValidations.operador">
                        <el-select no-data-text="Sem informações" class="select-default" v-model="model.operador" name="operador" placeholder="Selecione...">
                            <el-option class="select-default" v-for="item in this.dataOperadores" :key="item.id" :label="item.username" :value="item.id">
                            </el-option>
                        </el-select>
                    </fg-input>
                    <label>Assessor</label>
                    <fg-input :error="getError('assessor')" v-validate="modelValidations.assessor">
                        <el-select no-data-text="Sem informações" class="select-default" v-model="model.assessor" name="assessor" placeholder="Selecione...">
                            <el-option class="select-default" v-for="item in this.dataAssessores" :key="item.id" :label="item.username" :value="item.id">
                            </el-option>
                        </el-select>
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
    name: 'FormClient',
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
            },
            optionsTipo: [{
                    value: 'Comercial',
                    label: 'Comercial'
                },
                {
                    value: 'Residencial',
                    label: 'Residencial'
                }
            ],
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
    mounted() {
        axios.get(process.env.VUE_APP_ROOT_API + '/user?where={"ativo": 1,"id_grupo":2}').then(response => {
            this.dataOperadores = response.data
        })
        axios.get(process.env.VUE_APP_ROOT_API + '/user?where={"ativo": 1,"id_grupo":3}').then(response => {
            this.dataAssessores = response.data
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
                    endereco.id_user = response.data.id
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
