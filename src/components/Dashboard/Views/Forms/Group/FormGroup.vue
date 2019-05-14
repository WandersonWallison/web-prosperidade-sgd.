<template>
<div class="card">
    <form>
        <div class="card-header">
            <h4 class="card-title">
                Cadastro de Grupo
            </h4>
        </div>
        <div class="card-body">
            <div class="form-group">
                <label>Nome</label>
                <fg-input type="text" name="nome" v-validate="modelValidations.nome" :error="getError('nome')" v-model="model.nome">
                </fg-input>                
            </div>
        </div>
        <div class="card-body">
            <div class="form-group">
                <label>Links</label>
                <el-select multiple
                 class="select-primary"
                 collapse-tags
                 v-model="selects.multiple"
                 placeholder="Multiple Select">
                 <el-option v-for="option in selects.links"
                 class="select-primary"
                 :value="option.id"
                 :label="option.link"
                 :key="option.id">
                 </el-option>
                 </el-select>              
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
    data() {
        return {
            model: {
                nome: ''
            },
             selects: {
            links: [],
            multiple: 'ARS'
          },
            modelValidations: {
                nome: {
                    required: true
                      }
            },
        }      
    },
    mounted() {
        axios.get(process.env.VUE_APP_ROOT_API + '/link?where={"ativo": 1}').then(response => {
            this.selects.links = response.data
        })
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
                links: this.selects.multiple
            }
            axios.post(process.env.VUE_APP_ROOT_API + '/grupo', Grupo)
                .then(response => {
                    this.results = response.data
                            swal('Bom trabalho!', 'Grupo Cadastrado com sucesso!', 'success')
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
