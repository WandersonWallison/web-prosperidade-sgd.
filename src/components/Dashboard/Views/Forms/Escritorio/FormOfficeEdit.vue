<template>
<div class="card">
    <form>
        <div class="card-header">
            <h4 class="card-title">
                Editar Escritório
            </h4>
        </div>
        <div class="card-body">
            <div class="form-group">
                <div class="col-lg-6">
                    <label>Central</label>
                    <fg-input :error="getError('central')">
                        <el-select multiple class="select-default" v-model="selectCentrais" name="central" v-validate="modelValidations.central" placeholder="Selecione...">
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
                <fg-input type="text" v-mask="'(##)#####-####'" name="telefone" v-validate="modelValidations.telefone" :error="getError('telefone')" v-model="model.telefone">
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
                <label>Complemento</label>
                <fg-input type="text" name="complemento" v-validate="modelValidations.complemento" :error="getError('complemento')" v-model="model.complemento">
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
    name: 'FormOfficeEdit',
    data() {
        return {
            model: {
                // Empresa --------------
                nome: '',
                razao_social: '',
                cnpj: '',
                telefone: '',
                email: '',
                central: '',
                iss: '',
                // Endereço --------------
                cep: '',
                logradouro: '',
                complemento: '',
                numero: '',
                bairro: '',
                cidade: '',
                estado: ''
            },
            selectCentrais: [],
            centralOffice: [],
            centralEscritorio: [],
            officeEdit: {},
            enderecoEdit: {},
            endereco: [],
            results: [],
            resultAdress: [],
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
                logradouro: {
                    required: true
                },
                complemento: {
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
                iss: {
                    required: true
                },
                central: {
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
                    label: 'Paraí­ba'
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
    created() {

        axios.get(process.env.VUE_APP_ROOT_API + '/escritorio/' + window.localStorage.getItem("escritorio")).then(response => {
            this.officeEdit = response.data
            this.model.nome = this.officeEdit.nome
            this.model.razao_social = this.officeEdit.razao_social
            this.model.cnpj = this.officeEdit.cnpj
            this.model.telefone = this.officeEdit.telefone
            this.model.celular = this.officeEdit.celular
            this.model.email = this.officeEdit.email
            this.model.iss = this.officeEdit.iss

            for (let index = 0; index < this.officeEdit.centrais.length; index++) {
                this.centralEscritorio.push(this.officeEdit.centrais[index].id)
            }
            this.selectCentrais = this.centralEscritorio
            
            if (this.officeEdit.endereco.length > 0) {
                this.model.cep = this.officeEdit.endereco[0].cep
                this.model.logradouro = this.officeEdit.endereco[0].logradouro
                this.model.complemento = this.officeEdit.endereco[0].complemento
                this.model.numero = this.officeEdit.endereco[0].numero
                this.model.bairro = this.officeEdit.endereco[0].bairro
                this.model.cidade = this.officeEdit.endereco[0].cidade
                this.model.estado = this.officeEdit.endereco[0].uf
            }
            window.localStorage.removeItem("escritorio")
        })
    },
    mounted() {
        axios.get(process.env.VUE_APP_ROOT_API + '/central?where={"ativo": 1}&sort=nome').then(response => {
            this.centralOffice = response.data
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
                swal('Por favor verificar os dados solicitados no formulario!', '', 'info')
            })
        },
        buscarEndereco() {
            this.model.bairro = ''
            this.model.logradouro = ''
            this.model.cidade = ''
            this.model.estado = ''
            this.model.numero = ''

            axios.get('https://api.postmon.com.br/v1/cep/' + this.model.cep)
                .then(response => {

                    this.endereco = response.data

                    if (this.endereco.cep) {
                        this.model.cep = this.endereco.cep
                    }
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
                    console.log(error.response.data)
                })
        },
        salvar() {
            const authUser = JSON.parse(window.localStorage.getItem('usuario'))
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
                complemento: this.model.complemento,
                cep: this.model.cep,
                uf: this.model.estado,
                bairro: this.model.bairro,
                cidade: this.model.cidade,
                numero: this.model.numero,
                tipo: 'Comercial'
            }

            axios.put(process.env.VUE_APP_ROOT_API + '/escritorio/' + this.officeEdit.id, escritorio)
                .then(response => {
                    this.results = response.data
                    endereco.id_escritorio = response.data.id
                    // Cadastro de Endereço
                    axios.put(process.env.VUE_APP_ROOT_API + '/endereco/' + this.officeEdit.endereco[0].id, endereco)
                        .then(response => {
                            this.resultAdress = response.data
                            swal('Bom trabalho!', 'Escritório Atualizado com sucesso!', 'success')
                            this.$router.push('/forms/OfficeList')
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
