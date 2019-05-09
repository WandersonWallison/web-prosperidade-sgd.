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
<<<<<<< HEAD
import axios from 'axios'
// import state from '../util/state'
export default {
=======
  import axios from 'axios'
  import FirstStep from '../Wizard/FirstStepEmpresa.vue'
  import SecondStep from '../Wizard/SecondStepEmpresa.vue'
  import ThirdStep from '../Wizard/ThirdStepEmpresa.vue'
  import swal from 'sweetalert2'
  import {Wizard, WizardTab} from 'src/components/UIComponents'
>>>>>>> 01fe8ab433a10f222a55919aed4de4d9da7451e8

  export default {
    data() {
<<<<<<< HEAD
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
=======
      return {
        wizardModel: {}
      }
    },
    components: {
      FirstStep,
      SecondStep,
      ThirdStep,
      Wizard,
      WizardTab
    },
    methods: {
      validateStep(ref) {
        return this.$refs[ref].validate()
      },
      onStepValidated(validated, model) {
        this.wizardModel = {...this.wizardModel, ...model}
      },
      wizardComplete() {
        let empresa = {
                nome: this.wizardModel.firstName,
                email: this.wizardModel.email,
                cnpj: this.wizardModel.cnpj,
                // id_grupo: this.wizardModel.tipo
                }
        let endereco = {
                logradouro: this.wizardModel.logradouro,
                cep: this.wizardModel.cep,
                bairro: this.wizardModel.bairro,
                cidade: this.wizardModel.cidade,
                uf: this.wizardModel.estado,
                numero: this.wizardModel.numero,
                id_user: ''
      }
                axios.post(process.env.VUE_APP_ROOT_API  + '/empresa', empresa)
                .then(response => {
                    this.results = response.data
                    endereco.id_empresa = response.data.id
                      axios.post(process.env.VUE_APP_ROOT_API + '/endereco', endereco)
                        .then(response => {
                    swal('Bom trabalho!', 'Empresa Cadastrado com sucesso!', 'success')
                    this.$router.push('/forms/UserList')
                    })
                  })
                    .catch(error => {
                        alert(error.response)
                        console.log(error.response.data)
                        })
                    }
        //swal('Good job!', 'You clicked the finish button!', 'success')

      }
  }
</script>
>>>>>>> 01fe8ab433a10f222a55919aed4de4d9da7451e8
