<template>
<div class="card">
    <form>
        <div class="card-header">
            <h4 class="card-title">
                Cadastro de Escritório
            </h4>
        </div>
        <div class="card-body">
            <div class="form-group">
                <div class="col-lg-6">
                    <label>Central</label>
                    <fg-input :error="getError('central')">
                        <el-select no-data-text="Sem Informações" class="select-default" v-model="selectCentrais" name="central" v-validate="modelValidations.central" placeholder="Selecione...">
                            <el-option class="select-default" v-for="item in centralOffice" :key="item.value" :label="item.nome" :value="item.id">
                            </el-option>
                        </el-select>
                    </fg-input>
                </div>
                <label>Nome</label>
                <fg-input type="text" name="nome" v-validate="modelValidations.nome" :error="getError('nome')" v-model="model.nome">
                </fg-input>
                <label>Razão Social</label>
                <fg-input type="text" name="razao_social" v-validate="modelValidations.razao_social" :error="getError('razao_social')" v-model="model.razao_social">
                </fg-input>
                <label>CNPJ</label>
                <fg-input type="text" v-mask="'##.###.###/####-##'" name="cnpj" v-validate="modelValidations.cnpj" :error="getError('cnpj')" v-model="model.cnpj">
                </fg-input>
                <label>Telefone</label>
                <fg-input type="text" v-mask="'(##)####-####'" name="telefone" v-validate="modelValidations.telefone" :error="getError('telefone')" v-model="model.telefone">
                </fg-input>
                <label>E-mail</label>
                <fg-input type="email" name="email" v-validate="modelValidations.email" :error="getError('email')" v-model="model.email">
                </fg-input>
                <label>ISS %</label>
                <fg-input name="iss" v-mask="'##.##'" v-validate="modelValidations.iss" :error="getError('iss')" v-model="model.iss">
                </fg-input>
            </div>
            <div class="form-group">
                <label>CEP</label>
                <fg-input type="text" v-mask="'#####-###'" name="cep" v-validate="modelValidations.cep" :error="getError('cep')" @change="buscarEndereco($event)" v-model="model.cep">
                </fg-input>
                <label>Logradouro</label>
                <fg-input type="text" name="logradouro" v-validate="modelValidations.logradouro" :error="getError('logradouro')" v-model="model.logradouro">
                </fg-input>
                <label>Número</label>
                <fg-input type="text" name="numero" v-validate="modelValidations.numero" :error="getError('numero')" v-model="model.numero">
                </fg-input>
                <label>Bairro</label>
                <fg-input type="text" name="bairro" v-validate="modelValidations.bairro" :error="getError('bairro')" v-model="model.bairro">
                </fg-input>
                <label>Cidade</label>
                <fg-input type="text" name="cidade" v-validate="modelValidations.cidade" :error="getError('cidade')" v-model="model.cidade">
                </fg-input>
                <div class="col-lg-6">
                    <label>Estado</label>
                    <fg-input :error="getError('estado')">
                        <el-select class="select-default" v-model="model.estado" name="estado" v-validate="modelValidations.estado" placeholder="Selecione...">
                            <el-option class="select-default" v-for="item in optionsStade" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </fg-input>
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
    name: 'FormOffice',
    data() {
        return {
            model: {
                nome: '',
                cnpj: '',
                telefone: '',
                razao_social: '',
                email: '',
                cep: '',
                logradouro: '',
                numero: '',
                bairro: '',
                cidade: '',
                estado: '',
                central: '',
                iss: ''
            },
            selectCentrais: [],
            centralOffice: [],
            enderecoBuscado: [],
            modelValidations: {
                nome: {
                    required: true
                },
                razao_social: {
                    required: true
                },
                cnpj: {
                    required: true
                },
                telefone: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                cep: {
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
                estado: {
                    required: true
                },
                iss: {
                    required: true
                },
                central:{
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
                    label: 'Espí­rito Santo'
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
                    label: 'Parána'
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
        axios.get(process.env.VUE_APP_ROOT_API + '/central?where={"ativo": 1}').then(response => {
            this.centralOffice = response.data
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
                swal('Por favor verificar os dados solicitados no formulario!','', 'info')
            })
        },
        buscarEndereco() {
            this.model.bairro = ''
            this.model.logradouro = ''
            this.model.cidade = ''
            this.model.estado = ''

            axios.get('https://api.postmon.com.br/v1/cep/' + this.model.cep)
                .then(response => {
                    this.enderecoBuscado = response.data
                    if (this.enderecoBuscado.cidade) {
                        this.model.cidade = this.enderecoBuscado.cidade
                    }
                    if (this.enderecoBuscado.bairro) {
                        this.model.bairro = this.enderecoBuscado.bairro
                    }
                    if (this.enderecoBuscado.logradouro) {
                        this.model.logradouro = this.enderecoBuscado.logradouro
                    }
                    if (this.enderecoBuscado.complemento) {
                        this.model.complemento = this.enderecoBuscado.complemento
                    }
                    if (this.enderecoBuscado.estado) {
                        this.model.estado = this.enderecoBuscado.estado
                    }
                })
                .catch(error => {
                    // alert('Erro no cadastro do Endereço
                    console.log(error.response.data)
                })
        },
        salvar() {
            const authUser = JSON.parse(window.localStorage.getItem('usuario'))
            this.model.iss = this.model.iss.replace('$','')
            console.log('ISS:',this.model.iss)
            let escritorio = {
                nome: this.model.nome,
                razao_social: this.model.razao_social,
                telefone: this.model.telefone,
                email: this.model.email,
                cnpj: this.model.cnpj,
                centrais: this.selectCentrais,
                iss: this.model.iss,
                id_responsavel: authUser.id
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
            axios.post(process.env.VUE_APP_ROOT_API + '/escritorio', escritorio)
                .then(response => {
                    this.results = response.data
                    endereco.id_escritorio = this.results.id
                    // Cadastro de Endereço
                    axios.post(process.env.VUE_APP_ROOT_API + '/endereco', endereco)
                        .then(response => {
                            this.resultAdress = response.data
                            swal('Bom trabalho!', 'Escritório Cadastrado com sucesso!', 'success')
                            this.$router.push('/forms/OfficeList')
                        })
                        .catch(error => {
                            swal('Algo de errado!', 'Verifique os campos do cadastro de endereço!', 'error')
                            console.log(error.response.data)
                        })
                })
                .catch(error => {
                    swal('Algo de errado!', 'Verifique os campos do cadastro de escritorio!', 'error')
                    console.log(error.response.data)
                })
        }
    }
}
</script>

<style>
</style>
