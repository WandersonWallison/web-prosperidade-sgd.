<template>
<div class="card">
    <form disabled="disabled">
        <div class="card-body row justify-content-center">

            <br/>
            <div class="form-group col-md-6">
                <el-card class="box-card" disabled>
                    <div class="form-group col-md-10">
                        <el-switch disabled v-model="model.value1" name="value1" active-color="#20B2AA" inactive-color="#00BFFF" active-text="Pessoa Jurídica" inactive-text="Pessoa Física">
                        </el-switch>
                    </div>
                    <div slot="header" class="clearfix">
                        <span>Dados</span>
                    </div>
                    <label>Nome</label>
                    <fg-input disabled type="text" name="nome" v-validate="modelValidations.nome" :error="getError('nome')" v-model="model.nome">
                    </fg-input>
                    <label>Telefone</label>
                    <fg-input disabled type="text" v-mask="'(##)#####-####'" name="telefone" v-validate="modelValidations.telefone" :error="getError('telefone')" v-model="model.telefone">
                    </fg-input>
                    <label>E-mail</label>
                    <fg-input disabled type="email" name="email" v-validate="modelValidations.email" :error="getError('email')" v-model="model.email">
                    </fg-input>
                </el-card>
                <br>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Endereço</span>
                    </div>
                    <label>Tipo Endereço</label>
                    <fg-input>
                        <el-select disabled class="select-default" v-model="model.tipo" name="estado" placeholder="Selecione...">
                            <el-option class="select-default" v-for="item in optionsTipo" :key="item.id" :label="item.label" :value="item.id">
                            </el-option>
                        </el-select>
                    </fg-input>
                    <label>CEP</label>
                    <fg-input disabled type="text" v-mask="'#####-###'" name="cep" v-model="modelEndereco.cep">
                    </fg-input>
                    <label>Logradouro</label>
                    <fg-input disabled type="text" name="logradouro" v-model="modelEndereco.logradouro">
                    </fg-input>
                    <label>Número</label>
                    <fg-input disabled type="text" v-mask="'######'" name="numero" v-model="modelEndereco.numero">
                    </fg-input>
                    <label>Bairro</label>
                    <fg-input disabled  type="text" name="bairro" v-model="modelEndereco.bairro">
                    </fg-input>
                    <label>Cidade</label>
                    <fg-input disabled type="text" name="cidade" v-model="modelEndereco.cidade">
                    </fg-input>
                    <label>Estado</label>
                    <fg-input>
                        <el-select  disabled class="select-default" v-model="modelEndereco.uf" name="uf" placeholder="Selecione...">
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
                        <el-checkbox disabled name="habilitado_bovespa" v-model="model.habilitado_bovespa">Habilitado bovespa</el-checkbox>
                    </div>
                    <label>Numero XP</label>
                    <fg-input type="text" name="id_xp" v-validate="modelValidations.id_xp" :error="getError('id_xp')" v-model="model.id_xp">
                    </fg-input>
                    <!--
                    <label>Operador</label>
                    <fg-input>
                        <el-select  no-data-text="Sem informações" class="select-default" v-model="model.operador" name="operador" placeholder="Selecione...">
                            <el-option class="select-default" v-for="item in this.dataOperadores" :key="item.id" :label="item.username" :value="item.id">
                            </el-option>
                        </el-select>
                    </fg-input>
                    -->
                    <label>Assessor</label>
                    <fg-input>
                        <el-select disabled no-data-text="Sem informações" class="select-default" v-model="model.assessor" name="assessor" placeholder="Selecione...">
                            <el-option class="select-default" v-for="item in this.dataAssessores" :key="item.id" :label="item.username" :value="item.id">
                            </el-option>
                        </el-select>
                    </fg-input>
                    <label>Investimento Inicial</label>
                    <fg-input type="text" disabled  name="investimento_inicial" v-model="model.investimento_inicial">
                    </fg-input>
                    <label>Potencial de Investimento</label>
                    <fg-input type="text" disabled name="potencial_investimento" v-model="model.potencial_investimento">
                    </fg-input>
                </el-card>
                <br>
                <div name="fisica" v-if="!this.model.value1">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>Pessoa Física</span>
                        </div>
                        <label>RG</label>
                        <fg-input type="text" disabled v-mask="'###############'" name="rg" v-model="model.rg">
                        </fg-input>
                        <label>CPF</label>
                        <fg-input type="text" disabled v-mask="'###.###.###-##'" name="cpf_cnpj"  v-model="model.cpf_cnpj">
                        </fg-input>
                    </el-card>
                </div>
                <div name="juridica" v-if="this.model.value1">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>Pessoa Jurídica</span>
                        </div>
                        <label>Razão Social</label>
                        <fg-input type="text" disabled name="razao_social" v-model="model.razao_social">
                        </fg-input>
                        <label>CNPJ</label>
                        <fg-input type="text" disabled v-mask="'##.###.###/####-##'" name="cpf_cnpj" v-model="model.cpf_cnpj">
                        </fg-input>
                    </el-card>
                </div>
            </div>
        </div>
    </form>
</div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'
import {
    VMoney
} from 'v-money'
import {
    mask
} from 'vue-the-mask'
export default {
    name: 'FormClientDetail',
    props: ['cliente'],
    data() {
        return {
            money: {
                decimal: ',',
                thousands: '.',
                prefix: 'R$ ',
                precision: 2,
                masked: false /* doesn't work with directive */
            },
            model: this.cliente,
            modelEndereco: (this.cliente.endereco[0])?this.cliente.endereco[0]:'',
            dataOperadores: [],
            dataAssessores: [],
            dataCliente: [],
            endereco: [],
            enderecoCliente: [],
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
                id_xp: {
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
        mask,
        money: VMoney
    },
    mounted() {

        axios.get(process.env.VUE_APP_ROOT_API + '/user?where={"ativo": 1,"id_grupo":2}').then(response => {
            this.dataOperadores = response.data
        })
        axios.get(process.env.VUE_APP_ROOT_API + '/user?where={"ativo": 1,"id_grupo":3}').then(response => {
            this.dataAssessores = response.data
        })

        this.model.assessor = this.cliente.id_assessor.id
    },
    methods: {
        getError(fieldName) {
            return this.errors.first(fieldName)
        },
        validate() {
            this.$validator.validateAll().then(isValid => {
                this.$emit('on-submit', this.salvar(), isValid)
            })
        }

    }
}
</script>

<style>
.exemplo {
    overflow: scroll;
}
</style>
