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
                        Endereço
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
import FirstStep from '../Wizard/FirstStepUser.vue'
import SecondStep from '../Wizard/SecondStepUser.vue'
import ThirdStep from '../Wizard/ThirdStepUser.vue'
import swal from 'sweetalert2'
import {
    Wizard,
    WizardTab
} from 'src/components/UIComponents'

export default {
    name: 'FormUser',
    data() {
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
            this.wizardModel = { ...this.wizardModel,
                ...model
            }
        },
        wizardComplete() {
            const authUser = JSON.parse(window.localStorage.getItem('usuario'))
            let user = {
                username: this.wizardModel.firstName,
                email: this.wizardModel.email,
                password: this.wizardModel.senha,
                cpf: this.wizardModel.cpf,
                cnh: this.wizardModel.cnh,
                rg: this.wizardModel.rg,
                data_nascimento: this.wizardModel.datePicker,
                telefone: this.wizardModel.telefone,
                celular: this.wizardModel.celular,
                id_grupo: this.wizardModel.tipo,
                id_comissionamento_faixa: this.wizardModel.comissionamento,
                id_escritorio: this.wizardModel.escritorio,
                id_empresa: this.wizardModel.empresa,
                cvn: this.wizardModel.cvn,
                id_responsavel: authUser.id
            }
            let endereco = {
                logradouro: this.wizardModel.logradouro,
                cep: this.wizardModel.cep,
                bairro: this.wizardModel.bairro,
                cidade: this.wizardModel.cidade,
                uf: this.wizardModel.country,
                numero: this.wizardModel.numero,
                id_user: ''
            }
            axios.post(process.env.VUE_APP_ROOT_API + '/user', user)
                .then(response => {
                    this.results = response.data
                    endereco.id_user = response.data.id
                    axios.post(process.env.VUE_APP_ROOT_API + '/endereco', endereco)
                        .then(response => {
                            swal('Bom trabalho!', 'Usuario Cadastrado com sucesso!', 'success')
                            this.$router.push('/forms/UserList')
                        })
                })
                .catch(error => {
                    // alert(error.response.data)
                    swal('Algo de errado!', 'Email invalido!', 'error')
                    console.log(error.response.data)
                })
        }
        //swal('Good job!', 'You clicked the finish button!', 'success')

    }
}
</script>
