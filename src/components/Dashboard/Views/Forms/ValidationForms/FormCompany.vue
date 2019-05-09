<template>
  <div>
    <div class="row d-flex justify-content-center">
      <div class="col-md-10 mr-auto ml-auto">
          <wizard @complete="wizardComplete">
            <template slot="header">
              <h3 class="card-title">Build your profile</h3>
              <h3 class="description">This information will let us know more about you.</h3>
            </template>

            <wizard-tab :before-change="() => validateStep('step1')">
              <template slot="label">
                <i class="nc-icon nc-single-02"></i>
                Dados
              </template>
              <first-step ref="step1" @on-validated="onStepValidated"></first-step>
            </wizard-tab>

           <!-- <wizard-tab :before-change="() => validateStep('step2')">
              <template slot="label" >
                <i class="nc-icon nc-touch-id"></i>
                Account
              </template>
              <second-step ref="step2" @on-validated="onStepValidated"></second-step>
            </wizard-tab>-->

            <wizard-tab :before-change="() => validateStep('step3')">
              <template slot="label">
                <i class="nc-icon nc-pin-3"></i>
                Endereco
              </template>
              <third-step ref="step3" @on-validated="onStepValidated"></third-step>
            </wizard-tab>
          </wizard>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
// import state from '../util/state'
  export default {
    data() {
        return {
            model: {
                nome: '',
                razao_social: '',
                cnpj: '',
                telefone: '',
                email: '',

                logradouro: '',
                numero: '',
                bairro: '',
                cidade: '',
                estado: ''
            },
            results: [],
            modelValidations: {
                nome: {
                    required: true
                },
                razao_social: {
                    required: true
                },
                cnpj: {
                    required: true
                },
                telefone: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                logradouro: {
                    required: true
                },
                numero: {
                    required: true
                },
                bairro: {
                    required: true
                },
                cidade: {
                    required: true
                },
                estado: {
                    required: true
                }
            }
        }
    },
    methods: {
        getError(fieldName) {
            return this.errors.first(fieldName)
        },
        validate() {
            this.$validator.validateAll().then(isValid => {
                this.$emit('on-submit', this.salvar(), isValid)
            })
        }
    },
    salvar() {
        let empresa = {
            nome: this.model.nome
            /*razao_social: this.model.nome,
            site: this.form.site,
            telefone: this.form.telefone,
            email: this.form.email,
            cnpj: this.form.cnpj*/
        }
        axios.post(process.env.VUE_APP_ROOT_API + '/empresa', empresa)
            .then(response => {
                this.results = response.data
                alert('Empresa cadastrada com sucesso')
            })
            .catch(error => {
                alert(error.response)
                console.log(error.response.data)
            })
    }
}
</script>
<style>
</style>
