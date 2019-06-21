<template>
<div class="card">
    <form>
        <div class="card-header">
            <h4 class="card-title">
                Editar Grupo
            </h4>
        </div>
        <div class="card-body">
            <div class="form-group">
                <label>Nome</label>
                <fg-input type="text" name="descricao" v-validate="modelValidations.descricao" :error="getError('descricao')" v-model="model.descricao">
                </fg-input>
            </div>
        </div>
        <div class="card-body">
            <div class="form-group">
                <label>Links</label>
                <el-select multiple no-data-text="Sem Informações" class="select-primary" collapse-tags v-model="groupLinks" placeholder="Multiple Select">
                    <el-option v-for="option in selects.links" class="select-primary" :value="option.id" :label="option.link" :key="option.id">
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
import {
    mask
} from 'vue-the-mask'
export default {
    name: 'FormGroupEdit',
    data() {
        return {
            groupEdit: {},
            groupLinks: [],
            selectLinks: [],
            model: {
                nome: ''
            },
            selects: {
                links: [],
                multiple: 'ARS'
            },
            modelValidations: {
                descricao: {
                    required: true
                }
            }
        }
    },
    created() {
        axios.get(process.env.VUE_APP_ROOT_API + '/grupo/' + window.localStorage.getItem("grupo")).then(response => {
            this.model = response.data
            axios.get(process.env.VUE_APP_ROOT_API + '/grupo/' + window.localStorage.getItem("grupo") + '/links?limit=200').then(response => {
                this.groupEdit = response.data
                console.log('tamanho: ', this.groupEdit.length)
                for (let index = 0; index < this.groupEdit.length; index++) {
                    this.groupLinks.push(this.groupEdit[index].id)
                }
                this.selectLinks = this.groupLinks
                window.localStorage.removeItem("grupo")
            })
        })
    },
    mounted() {
        axios.get(process.env.VUE_APP_ROOT_API + '/link?limit=200&where={"ativo":1}').then(response => {
            this.selects.links = response.data
        })
    },
    directives: {
        mask
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
            const authUser = JSON.parse(window.localStorage.getItem('usuario'))
            let Grupo = {
                descricao: this.model.descricao,
                id_responsavel: authUser.id,
                links: this.groupLinks
            }
            axios.put(process.env.VUE_APP_ROOT_API + '/grupo/' + this.groupEdit.id, Grupo)
                .then(response => {
                    this.results = response.data
                    swal('Bom trabalho!', 'Grupo Alterado com sucesso!', 'success')
                    this.$router.push('/forms/GroupList')
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
