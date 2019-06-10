<template>
<div class="card">
    <form>
        <div class="card-header">
            <h4 class="card-title">
                Alterar Senha
            </h4>
        </div>
        <div class="card-body row justify-content">
            <div class="form-group col-md-12">
                <el-card class="box-card">
                    <label>Nova Senha</label>
                    <fg-input type="password" name="senha" v-validate="modelValidations.senha" :error="getError('senha')" v-model="model.senha">
                    </fg-input>
                    <label>Redigite Senha</label>
                    <fg-input type="password" name="confirmacao" v-validate="modelValidations.confirmacao" :error="getError('confirmacao')" v-model="model.confirmacao">
                    </fg-input>
                </el-card>
            </div>
        </div>
        <div class="card-footer text-right">
            <p-button type="info" @click.prevent="validate">Alterar</p-button>
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
    mask
} from 'vue-the-mask'

export default {
    components: {},
    name: 'AlterarPassword',
    props: ['selected'],
    data() {
        return {
            model: {
                senha: '',
                confirmacao: ''
            },
            results: [],
            modelValidations: {
                senha: {
                    required: true
                },
                confirmacao: {
                    required: true
                }
            }
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
        },
        salvar() {
            const authUser = JSON.parse(window.localStorage.getItem("usuario"))
            let idUsuario = ''

            idUsuario = authUser.id
            // console.log('usuario do local: ', idUsuario)

            if (this.selected) {
                idUsuario = this.selected.id
                // console.log('usuario do listar: ', idUsuario)
            }

            if (this.model.senha !== '' || this.model.confirmacao !== '') {

                if ((this.model.senha === this.model.confirmacao)) {
                    // const authUser = JSON.parse(window.localStorage.getItem("usuario"))
                    let user = {
                        password: this.model.senha,
                        id_responsavel: authUser.id
                    }
                    axios.put(process.env.VUE_APP_ROOT_API + '/user/' + idUsuario, user)
                        .then(response => {
                            this.results = response.data
                            this.model.senha = ''
                            this.model.confirmacao = ''
                            swal('Bom trabalho!', 'Senha Alterada com sucesso!', 'success')
                            this.$router.push('/forms/UserList')
                        })
                        .catch(error => {
                            swal('Algo de errado!', 'Verifique os campos para alteração!', 'error')
                            console.log(error.response.data)
                        })

                } else {
                    swal('Senhas não conferem!', 'Verifique os campos digitados!', 'error')
                }
            }

        }
    }
}
</script>

<style>
</style>
