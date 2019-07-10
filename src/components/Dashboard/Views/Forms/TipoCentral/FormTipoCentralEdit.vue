<template>
<div class="card">
    <form>
        <div class="card-header">
            <h4 class="card-title">
                Editar Tipo de Central
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
            tipoCentralEdit: {},
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

        axios.get(process.env.VUE_APP_ROOT_API + '/tipo_central/' + window.localStorage.getItem("tipo_central")).then(response => {
            this.tipoCentralEdit = response.data
            this.model.descricao = this.tipoCentralEdit.descricao
            this.model.sigla = this.tipoCentralEdit.sigla
            window.localStorage.removeItem("tipo_central")

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
            let tipoCentral = {
                descricao: this.model.descricao,
                sigla: this.model.sigla,
                id_responsavel: authUser.id
            }
            axios.put(process.env.VUE_APP_ROOT_API + '/tipo_central/' + this.tipoCentralEdit.id, tipoCentral)
                .then(response => {
                    this.results = response.data
                    swal('Bom trabalho!', 'Tipo de Central Alterado com sucesso!', 'success')
                    this.$router.push('/forms/TipoCentralList')
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
