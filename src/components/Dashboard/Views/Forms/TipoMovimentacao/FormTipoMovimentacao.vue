<template>
<div class="card">
    <form>
        <div class="card-header">
            <h4 class="card-title">
                Cadastro de Tipo de Movimentação
            </h4>
        </div>
        <div class="card-body">
            <div class="form-group">
                <label>Nome</label>
                <fg-input type="text" name="descricao" v-validate="modelValidations.descricao" :error="getError('descricao')" v-model="model.descricao">
                </fg-input>
                <label>Sigla</label>
                <fg-input type="text" name="sigla" v-validate="modelValidations.sigla" :error="getError('sigla')" v-model="model.sigla">
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
    name: 'FormOffice',
    data() {
        return {
            model: {
                descricao: '',
                sigla: ''
            },
            enderecoBuscado: [],
            modelValidations: {
                descricao: {
                    required: true
                },
                sigla: {
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
            let tipoMovimentacao = {
                descricao: this.model.descricao,
                sigla: this.model.sigla,
                id_responsavel: authUser.id
            }
            axios.post(process.env.VUE_APP_ROOT_API + '/tipo_movimentacao', tipoMovimentacao)
                .then(response => {
                    this.results = response.data
                    swal('Bom trabalho!', 'Tipo de Movimentação Cadastrado com sucesso!', 'success')
                    this.$router.push('/forms/TipoMovimentacaoList')
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
