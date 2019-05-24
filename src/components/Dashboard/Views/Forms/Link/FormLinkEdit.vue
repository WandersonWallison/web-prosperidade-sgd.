<template>
<div class="card">
    <form>
        <div class="card-header">
            <h4 class="card-title">
                Editar Link
            </h4>
        </div>
        <div class="card-body">
            <div class="form-group">
                <label>Descrição</label>
                <fg-input type="text" name="descricao" v-validate="modelValidations.descricao" :error="getError('descricao')" v-model="model.descricao">
                </fg-input>
                <label>Link</label>
                <fg-input type="text" name="link" v-validate="modelValidations.link" :error="getError('link')" v-model="model.link">
                </fg-input>
                <label>URL imagem</label>
                <fg-input type="imagem" name="imagem" v-validate="modelValidations.imagem" :error="getError('imagem')" v-model="model.imagem">
                </fg-input>
            </div>
            <div class="form-group">
                <div class="col-lg-6">
                    <label>Tipo</label>
                    <fg-input :error="getError('id_tipo_link')">
                        <el-select class="select-default" v-model="model.id_tipo_link" name="id_tipo_link" v-validate="modelValidations.id_tipo_link" placeholder="Selecione...">
                            <el-option class="select-default" v-for="item in optionsStade" :key="item.id" :label="item.descricao" :value="item.id">
                            </el-option>
                        </el-select>
                    </fg-input>
                </div>
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
    name: 'FormLinkEdit',
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
            id_link: null,
            resultAdress: [],
            modelValidations: {
                descricao: {
                    required: true
                },
                link: {
                    required: true
                },
                imagem: {
                    required: true
                },
                id_tipo_link: {
                    required: true
                }
            },
            optionsStade: []
        }
    },
    mounted() {
        axios.get(process.env.VUE_APP_ROOT_API + '/link/' + window.localStorage.getItem("link")).then(response => {
            this.model = response.data
            this.id_link = response.data.id
            this.model.id_tipo_link  = this.model.id_tipo_link.id
            window.localStorage.removeItem("link")
        })
        axios.get(process.env.VUE_APP_ROOT_API + '/tipo_link?where={"ativo": 1}').then(response => {
            this.optionsStade = response.data
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
            let link = {
                descricao: this.model.descricao,
                link: this.model.link,
                id_tipo_link: this.model.id_tipo_link,
                imagem: this.model.imagem
            }
            // axios.put(process.env.VUE_APP_ROOT_API + '/grupo/' + this.groupEdit.id, Grupo)
            axios.put(process.env.VUE_APP_ROOT_API + '/link/' + this.id_link, link)
                .then(response => {
                    this.results = response.data
                    swal('Bom trabalho!', 'Link Editado com sucesso!', 'success')
                            this.$router.push('/forms/LinkList')
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
