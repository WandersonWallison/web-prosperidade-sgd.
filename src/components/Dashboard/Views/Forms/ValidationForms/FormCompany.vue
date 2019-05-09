<template>
<div class="card">
    <form>
        <div class="card-header">
            <h4 class="card-title">
                Cadastro de Empresa
            </h4>
        </div>
        <div class="card-body">
            <div class="form-group">
                <label>Nome</label>
                <fg-input type="text" name="nome" v-validate="modelValidations.nome" :error="getError('nome')" v-model="model.nome">
                </fg-input>
                <label>Razão Social</label>
                <fg-input type="text" name="razao_social" v-validate="modelValidations.razao_social" :error="getError('razao_social')" v-model="model.razao_social">
                </fg-input>
                <label>CNPJ</label>
                <fg-input type="text" name="cnpj" v-validate="modelValidations.cnpj" :error="getError('cnpj')" v-model="model.cnpj">
                </fg-input>
                <label>Telefone</label>
                <fg-input type="text" name="telefone" v-validate="modelValidations.telefone" :error="getError('telefone')" v-model="model.telefone">
                </fg-input>
                <label>E-mail</label>
                <fg-input type="email" name="email" v-validate="modelValidations.email" :error="getError('email')" v-model="model.email">
                </fg-input>
            </div>
            <div class="form-group">

                <label>Tipo de Endereço</label>
                <div>
                  <el-select class="select-default" v-model="model.tipoAddress" name="tipoAddress" placeholder="">
                    <el-option class="select-default" v-for="item in optionsAddres" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                </div>
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
                        <el-select class="select-default" v-model="model.estado" name="tipo_user" v-validate="modelValidations.estado" placeholder="">
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
export default {

    data() {
        return {
            model: {
                nome: '',
                razao_social: '',
                cnpj: '',
                telefone: '',
                email: '',

                logradouro: '',
                numero: '',
                bairro: '',
                cidade: '',
                estado: ''
            },
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
                estado: {
                    required: true
                }
            },
            optionsAddres: [
                {
                    value: '',
                    label: 'Selecione..'
                },
                {
                    value: 'Comercial',
                    label: 'Comercial'
                },
                {
                    value: 'Residencial',
                    label: 'Residencial'
                }
            ],
            optionsStade: [
                {
                    value: '',
                    label: 'Selecione...'
                },
                {
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
    methods: {
        getError(fieldName) {
            return this.errors.first(fieldName)
        },
        validate() {
            this.$validator.validateAll().then(isValid => {
                this.$emit('on-submit', this.salvar(), isValid)
            })
        } // TODO - wellingon - teste essa fun��o
    },
    salvar() {
        let empresa = {
            nome: this.model.nome,
            razao_social: this.model.nome,
            telefone: this.form.telefone,
            email: this.form.email,
            cnpj: this.form.cnpj
        }
        let endereco = {
            logradouro: this.model.nome,
            cep: this.model.logradouro,
            uf: this.model.uf,
            bairro: this.model.bairro,
            cidade: this.model.cidade,
            numero: this.model.numero
        }
        axios.post(process.env.VUE_APP_ROOT_API + '/empresa', empresa)
            .then(response => {
                this.results = response.data
                this.endereco.id_empresa = response.data.id
                // Cadastro de Endereço
                axios.post(process.env.VUE_APP_ROOT_API + '/endereco', endereco)
                    .then(response => {
                        this.resultAdress = response.data
                        alert('Empresa cadastrada com sucesso')
                    })
                    .catch(error => {
                        console.log(error.response.data)
                    })
            })
            .catch(error => {
                alert(error.response)
                console.log(error.response.data)
            })
    }
}
</script>

<style>
</style>
