<template>
<div class="card">
    <form>
        <div class="card-header">
            <h4 class="card-title">
                Cadastro de Tipo de Situação Tributária
            </h4>
        </div>
        <div class="card-body">
            <div class="form-group">
                <label>Descrição</label>
                <fg-input type="text" name="descricao" v-validate="modelValidations.descricao" :error="getError('descricao')" v-model="model.descricao">
                </fg-input>
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
    name: 'FormTipoSituacaoTributaria',
    data() {
        return {
            model: {
                descricao: ''
            },
            modelValidations: {
                descricao: {
                    required: true
                }
            }
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
            /*
            this.$validator.validateAll().then(isValid => {
                this.$emit('on-submit', this.salvar(), isValid)
            }) */
            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.$emit('on-submit', this.salvar(), result)
                    return
                }
                swal('Por favor verificar os dados solicitados no formulario!','', 'info')
            })
        },
        salvar() {
            const authUser = JSON.parse(window.localStorage.getItem('usuario'))
            let tipoSituacaoTributaria = {
                descricao: this.model.descricao,
                id_responsavel: authUser.id
            }
            axios.post(process.env.VUE_APP_ROOT_API + '/tipo_situacao_tributaria', tipoSituacaoTributaria)
                .then(response => {
                    this.results = response.data
                    swal('Bom trabalho!', 'Tipo de Situação Tributária Cadastrado com sucesso!', 'success')
                    this.$router.push('/forms/TipoSituacaoTributariaList')
                })
                .catch(error => {
                    swal('Algo de errado!', 'Verifique os campos do cadastro!', 'error')
                    console.log(error.response)
                })
        }
    },

}
</script>

<style>
</style>
