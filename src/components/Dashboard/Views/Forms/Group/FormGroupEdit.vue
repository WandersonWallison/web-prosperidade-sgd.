<template>
<div class="card">
    <form>
        <div class="card-header">
            <h4 class="card-title">
                Detalhes do Grupo
            </h4>
        </div>
        <div class="card-body">
            <div class="form-group">
                <label>Nome</label>
                <fg-input type="text" name="nome" v-validate="modelValidations.nome" :error="getError('nome')" v-model="model.nome">
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
import {mask} from 'vue-the-mask'
export default {
    name: 'FormGroupDetails',
    props: ['selected'],
    data() {
        return {
            model: {
                nome: this.selected.descricao
            },
            modelValidations: {
                nome: {
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

            let Grupo = {
                descricao: this.model.nome,
            }
            axios.put(process.env.VUE_APP_ROOT_API + '/grupo/'+ this.selected.id, Grupo)
                .then(response => {
                    this.results = response.data
                            swal('Bom trabalho!', 'Grupo A com sucesso!', 'success')
                            this.$router.push('/forms/GroupList')
                        })
                        .catch(error => {
                            swal('Algo de errado!', 'Verifique os campos do cadastros!', 'error')
                            console.log(error.response.data)
                        })
        }
    },

}
</script>

<style>
</style>
