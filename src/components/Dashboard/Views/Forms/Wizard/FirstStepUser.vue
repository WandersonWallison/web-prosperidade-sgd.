<template>
<div>
    <h5 class="info-text"> Cadastro de Usuário</h5>
    <div class="row justify-content-left">
        <div class="form-group col-md-6">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>Dados</span>
                </div>
                <fg-input name="firstName" placeholder="Nome" v-model="model.firstName" v-validate="modelValidations.firstName" :error="getError('firstName')">
                </fg-input>
                <fg-input type="email" name="email" placeholder="E-mail" v-model="model.email" v-validate="modelValidations.email" :error="getError('email')">
                </fg-input>
                <fg-input name="senha" type="password" placeholder="Senha" v-model="model.senha" v-validate="modelValidations.senha" :error="getError('senha')">
                </fg-input>
                <fg-input name="telefone" placeholder="telefone" v-model="model.telefone" v-validate="modelValidations.telefone" :error="getError('telefone')" v-mask="'(##) ####-####'">
                </fg-input>
                <fg-input name="celular" placeholder="celular" v-model="model.celular" v-validate="modelValidations.celular" :error="getError('celular')" v-mask="'(##) #####-####'">
                </fg-input>
                <div class="block">
                    <fg-input v-validate="modelValidations.datePicker" :error="getError('datePicker')">
                        <el-date-picker v-model="model.datePicker" format="dd/MM/yyyy" type="date" placeholder="Data Nascimento">
                        </el-date-picker>
                    </fg-input>
                    <br>
                    <fg-input :error="getError('comissionamento')">
                    <el-select no-data-text="Carregando..." v-validate="modelValidations.comissionamento" class="select-default" v-model="model.comissionamento" name="Comissionamento" placeholder="Comissionamento">
                        <el-option class="select-default" v-for="item in optionsComissionamento" :key="item.id" :label="item.descricao" :value="item.id">
                        </el-option>
                    </el-select>
                </fg-input>
                </div>
            </el-card>
        </div>
        <div class="form-group col-md-6">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>Documentação</span>
                </div>
                <fg-input name="cvm" placeholder="cvm" v-model="model.cvm" v-validate="modelValidations.cvm" :error="getError('cvm')">
                </fg-input>
                <div v-if="model.tipo == 3">
                <fg-input name="id_xp" placeholder="código XP" v-model="model.id_xp">
                </fg-input>
                </div>
                <fg-input name="cpf" placeholder="cpf" v-model="model.cpf" v-validate="modelValidations.cpf" :error="getError('cpf')" v-mask="'###.###.###-##'">
                </fg-input>
                <fg-input name="cnh" placeholder="cnh" v-model="model.cnh" v-validate="modelValidations.cnh" :error="getError('cnh')" v-mask="'##############'">
                </fg-input>
                <fg-input name="rg" placeholder="rg" v-model="model.rg" v-validate="modelValidations.rg" :error="getError('rg')" v-mask="'#########'">
                </fg-input>
                <br>
                <fg-input :error="getError('tipo')">
                    <el-select no-data-text="Carregando..." v-validate="modelValidations.tipo" class="select-default" v-model="model.tipo" name="tipo" placeholder="Tipos de Usuario">
                        <el-option class="select-default" v-for="item in options" :key="item.id" :label="item.descricao" :value="item.id">
                        </el-option>
                    </el-select>
                </fg-input>
                <br>
                <fg-input :error="getError('empresa')" v-if="model.tipo != 3">
                    <el-select no-data-text="Carregando..." class="select-default" v-validate="modelValidations.empresa" v-model="model.empresa" name="empresa" placeholder="Empresa">
                        <el-option class="select-default" v-for="item in optionsEmpresa" :key="item.id" :label="item.nome" :value="item.id">
                        </el-option>
                    </el-select>
                </fg-input>
                <br>
                <fg-input :error="getError('escritorio')" v-if="model.tipo == 3">
                    <el-select no-data-text="Carregando..." class="select-default" v-validate="modelValidations.escritorio" v-model="model.escritorio" name="escritorio" placeholder="Escritorio">
                        <el-option class="select-default" v-for="item in optionsEscritorio" :key="item.id" :label="item.nome" :value="item.id">
                        </el-option>
                    </el-select>
                </fg-input>

            </el-card>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import {
    DatePicker,
    TimeSelect,
    Slider,
    Tag,
    Input,
    Button,
    Select,
    Option,
    Upload
} from 'element-ui'
import {
    mask
} from 'vue-the-mask'
import { truncate } from 'fs';
export default {
    components: {
        [DatePicker.name]: DatePicker,
        [Upload.name]: Upload
    },
    data() {
        return {
            pickerOptions1: {
                shortcuts: [{
                        text: 'Today',
                        onClick(picker) {
                            picker.$emit('pick', new Date())
                        }
                    },
                    {
                        text: 'Yesterday',
                        onClick(picker) {
                            const date = new Date()
                            date.setTime(date.getTime() - 3600 * 1000 * 24)
                            picker.$emit('pick', date)
                        }
                    },
                    {
                        text: 'A week ago',
                        onClick(picker) {
                            const date = new Date()
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                            picker.$emit('pick', date)
                        }
                    }
                ]
            },
            datePicker: '',
            model: {
                firstName: '',
                email: '',
                senha: '',
                cvm: '',
                id_xp: '',
                cpf: '',
                cnh: '',
                rg: '',
                tipo: '',
                telefone: '',
                celular: '',
                datePicker: '',
                escritorio: null,
                empresa: null,
                imageUrl: 'static/img/default-avatar.png',
                comissionamento: ''
            },
            modelValidations: {
                firstName: {
                    required: true,
                    min: 5
                },
                senha: {
                    required: () => 'Senha é uma campo obrigatorio'
                },
                cpf: {
                    required: true
                },
                cnh: {
                    required: true
                },
                rg: {
                    required: true
                },
                telefone: {
                    required: true
                },
                celular: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                tipo: {
                    required: true
                },
                comissionamento:{
                    required: true
                }
            },
            options: [],
            optionsEmpresa: [],
            optionsEscritorio: [],
            optionsComissionamento: []
        }
    },
    directives: {
        mask
    },
    mounted() {
        axios.get(process.env.VUE_APP_ROOT_API + '/grupo?where={"ativo": 1}').then(response => {
            this.options = response.data
        })
        axios.get(process.env.VUE_APP_ROOT_API + '/empresa?where={"ativo": 1}').then(response => {
            this.optionsEmpresa = response.data
        })
        axios.get(process.env.VUE_APP_ROOT_API + '/escritorio?where={"ativo": 1}').then(response => {
            this.optionsEscritorio = response.data
        })
         axios.get(process.env.VUE_APP_ROOT_API + '/comissionamento_faixa?where={"ativo": 1}').then(response => {
            this.optionsComissionamento = response.data
        })

    },
    methods: {
        handlePreview(file) {
            this.model.imageUrl = URL.createObjectURL(file.raw);
        },
        getError(fieldName) {
            return this.errors.first(fieldName)
        },
        validate() {
            return this.$validator.validateAll().then(res => {
                this.$emit('on-validated', res, this.model)
                return res
            })
        }
    }
}
</script>

<style lang="scss">
.card-wizard .picture-container .picture {
    input[type="file"] {
        display: none;
    }
}
</style>
