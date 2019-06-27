<template>
  <div class="row justify-content-center">
    <div class="col-sm-12">
      <h5 class="info-text"> Complete seu cadastro! </h5>
    </div>
    <div class="col-sm-3">
      <fg-input label="Cep"
                name="cep"
                v-mask="'#####-###'"
                v-model="model.cep"
                :error="getError('cep')"
                v-validate="modelValidations.cep"
                @change="buscarEndereco($event)">
      </fg-input>
    </div>
    <div class="col-sm-8">
      <fg-input label="Logradouro"
                name="logradouro"
                v-model="model.logradouro"
                :error="getError('logradouro')"
                v-validate="modelValidations.logradouro">
      </fg-input>
    </div>
    <div class="col-sm-3">
      <fg-input label="Numero"
                name="numero"
                v-model="model.numero"
                :error="getError('numero')"
                v-validate="modelValidations.numero">
      </fg-input>
    </div>
     <div class="col-sm-8">
      <fg-input label="Bairro"
                name="bairro"
                v-model="model.bairro"
                :error="getError('bairro')"
                v-validate="modelValidations.bairro">
      </fg-input>
    </div>
    <div class="col-sm-11">
      <fg-input label="Complemento"
                name="complemento"
                v-model="model.complemento"
                :error="getError('complemento')"
                v-validate="modelValidations.complemento">
      </fg-input>
    </div>
    <div class="col-sm-6">
      <fg-input label="Cidade"
                name="cidade"
                v-model="model.cidade"
                :error="getError('cidade')"
                v-validate="modelValidations.cidade">
      </fg-input>
    </div>
    <div class="col-sm-5">
        <label>Estado</label>
        <fg-input :error="getError('estado')">
          <el-select v-model="model.country"
                     class="select-primary"
                     name="estado"
                     v-validate="modelValidations.estado">
            <el-option v-for="country in countryOptions"
                       class="select-primary"
                       :label="country.label"
                       :value="country.value"
                       :key="country.value"></el-option>
          </el-select>
        </fg-input>
    </div>
  </div>
</template>
<script>
  import {Select, Option} from 'element-ui'
  import {mask} from 'vue-the-mask'
  import axios from 'axios'
  export default {
    components: {
      [Select.name]: Select,
      [Option.name]: Option
    },
    data() {
      return {
        model: {
          cep: '',
          logradouro: '',
          complemento: '',
          cidade: '',
          bairro: '',
          country: ''
        },
        countryOptions: [{
                    value: 'AC',
                    label: 'Acre'
                },
                {
                    value: 'AL',
                    label: 'Alagoas'
                },
                {
                    value: 'AP',
                    label: 'Amapá'
                },
                {
                    value: 'AM',
                    label: 'Amazonas'
                },
                {
                    value: 'BA',
                    label: 'Bahia'
                },
                {
                    value: 'CE',
                    label: 'Ceará'
                },
                {
                    value: 'DF',
                    label: 'Distrito Federal'
                },
                {
                    value: 'ES',
                    label: 'Espírito Santo'
                },
                {
                    value: 'GO',
                    label: 'Goiás'
                },
                {
                    value: 'MA',
                    label: 'Maranhão'
                },
                {
                    value: 'MT',
                    label: 'Mato Grosso'
                },
                {
                    value: 'MS',
                    label: 'Mato Grosso do Sul'
                },
                {
                    value: 'MG',
                    label: 'Minas Gerais'
                },
                {
                    value: 'PA',
                    label: 'Pará'
                },
                {
                    value: 'PB',
                    label: 'Paraíba'
                },
                {
                    value: 'PR',
                    label: 'Paraná'
                },
                {
                    value: 'PE',
                    label: 'Pernambuco'
                },
                {
                    value: 'PI',
                    label: 'Piauí'
                },
                {
                    value: 'RJ',
                    label: 'Rio de Janeiro'
                },
                {
                    value: 'RN',
                    label: 'Rio Grande do Norte'
                },
                {
                    value: 'RS',
                    label: 'Rio Grande do Sul'
                },
                {
                    value: 'RO',
                    label: 'Rondônia'
                },
                {
                    value: 'RR',
                    label: 'Roraima'
                },
                {
                    value: 'SC',
                    label: 'Santa Catarina'
                },
                {
                    value: 'SP',
                    label: 'São Paulo'
                },
                {
                    value: 'SE',
                    label: 'Sergipe'
                },
                {
                    value: 'TO',
                    label: 'Tocantins'
                }
            ],
        modelValidations: {
          cep: {
            required: true
          },
          logradouro: {
            required: true
          },
          complemento: {
            required: true
          },
          cidade: {
            required: true
          },
          bairro:{
            required: true
          },
          estado: {
            required: true
          }
        }
      }
    },
    directives: {mask},
    methods: {
      getError(fieldName) {
        return this.errors.first(fieldName)
      },
      validate() {
        return this.$validator.validateAll().then(res => {
          this.$emit('on-validated', res, this.model)
          return res
        })
      },
      buscarEndereco() {
            this.model.bairro = ''
            this.model.logradouro = ''
            this.model.cidade = ''
            this.model.country = ''

            axios.get('https://api.postmon.com.br/v1/cep/' + this.model.cep)
                .then(response => {
                    this.endereco = response.data
                    if (this.endereco.cidade) {
                        this.model.cidade = this.endereco.cidade
                    }
                    if (this.endereco.bairro) {
                        this.model.bairro = this.endereco.bairro
                    }
                    if (this.endereco.logradouro) {
                        this.model.logradouro = this.endereco.logradouro
                    }
                    if (this.endereco.complemento) {
                        this.model.complemento = this.endereco.complemento
                    }
                    if (this.endereco.estado) {
                        this.model.country = this.endereco.estado
                    }
                })
                .catch(error => {
                    // alert('Erro no cadastro do Endereço')
                    console.log(error.response.data)
                })
        },
    }

  }
</script>
<style>
</style>
