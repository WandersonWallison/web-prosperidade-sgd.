<template>
<div class="card">
    <form>
        <div class="card-header">
            <h4 class="card-title">
                Editar de Tipo de Movimentação
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
            tipoMovimentacaoEdit: {},
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
    created() {

        axios.get(process.env.VUE_APP_ROOT_API + '/tipo_movimentacao/' + window.localStorage.getItem("tipo_movimentacao")).then(response => {
            this.tipoMovimentacaoEdit = response.data
            this.model.descricao = this.tipoMovimentacaoEdit.descricao
            this.model.sigla = this.tipoMovimentacaoEdit.sigla
            window.localStorage.removeItem("tipo_movimentacao")

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
            axios.put(process.env.VUE_APP_ROOT_API + '/tipo_movimentacao/' + this.tipoMovimentacaoEdit.id, tipoMovimentacao)
                .then(response => {
                    this.results = response.data
                    swal('Bom trabalho!', 'Tipo de Movimentação Alterado com sucesso!', 'success')
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
