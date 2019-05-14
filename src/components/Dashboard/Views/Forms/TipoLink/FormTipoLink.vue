<template>
<div class="card">
    <form>
        <div class="card-header">
            <h4 class="card-title">
                Cadastro de Tipo do Link
            </h4>
        </div>
        <div class="card-body">
            <div class="form-group">
                <label>Descrição</label>
                <fg-input type="text" name="descricao" v-validate="modelValidations.descricao" :error="getError('descricao')" v-model="model.descricao">
                </fg-input>
                <!--
                <label>Complemento</label>
                <fg-input type="text" name="complemento" v-validate="modelValidations.complemento" :error="getError('complemento')" v-model="model.complemento">
                </fg-input>
                -->
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
import {mask} from 'vue-the-mask'
export default {
    name: 'FormLink',
    data() {
        return {
            model: {
                // link --------------
                descricao: '',
                link: '',
                imagem: '',
                id_tipo_link: ''
            },
            results: [],
            resultAdress: [],
            modelValidations: {
                descricao: {
                    required: true
                }
            },
        }
    },
    directives: {mask},
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
            let link = {
                descricao: this.model.descricao
            }
            axios.post(process.env.VUE_APP_ROOT_API + '/tipo_link', link)
                .then(response => {
                    this.results = response.data
                    swal('Bom trabalho!', 'Tipo link Cadastrada com sucesso!', 'success')
                            this.$router.push('/forms/TipoLinkList')
                })
                .catch(error => {
                    swal('Algo de errado!', 'Verifique os campos do cadastros!', 'error')
                    console.log(error.response.data)
                })
        }
    }
}
</script>

<style>
</style>
