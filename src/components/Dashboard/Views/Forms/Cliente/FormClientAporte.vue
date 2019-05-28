<template>
<div class="card">
    <form>
        <div class="card-header">
            <br/>
            <div class="form-group col-md-6">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Aporte</span>
                    </div>
                    <label>Valor</label>
                    <fg-input type="text" name="valor" v-validate="modelValidations.valor" :error="getError('valor')" v-model="model.valor">
                    </fg-input>
                    <div class="card-footer text-right">
                        <p-button type="info" @click.prevent="validate">Salvar</p-button>
                    </div>
                </el-card>
            </div>
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
    name: 'FormClient',
    data() {
        return {
            model: {
                valor: ''
            },
            results: [],
            resultAdress: [],
            modelValidations: {
                valor: {
                    required: true
                }
            }
        }
    },
    directives: {
        mask
    },
    mounted() {

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
            let cliente = {

                valor: this.model.numero_xp,
                id_responsavel: authUser.id
            }
            axios.put(process.env.VUE_APP_ROOT_API + '/cliente', cliente)
                .then(response => {
                    this.results = response.data
                })
                .catch(error => {
                    swal('Algo de errado!', 'Verifique os campos do cadastro de cliente!', 'error')
                    console.log(error.response.data)
                })
        }
    }
}
</script>

<style>
</style>
