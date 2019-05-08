<template>
  <div class="row justify-content-center">
    <div class="col-sm-12">
      <h5 class="info-text"> Complete seu cadastro! </h5>
    </div>
    <div class="col-sm-7">
      <fg-input label="Cep"
                name="cep"
                v-model="model.cep"
                :error="getError('cep')"
                v-validate="modelValidations.cep">
      </fg-input>
    </div>
    <div class="col-sm-3">
      <fg-input label="Logradouro"
                name="logradouro"
                v-model="model.logradouro"
                :error="getError('logradouro')"
                v-validate="modelValidations.logradouro">
      </fg-input>
    </div>
    <div class="col-sm-5">
      <fg-input label="Cidade"
                name="cidade"
                v-model="model.cidade"
                :error="getError('cidade')"
                v-validate="modelValidations.cidade">
      </fg-input>
    </div>
     <div class="col-sm-5">
      <fg-input label="Bairro"
                name="bairro"
                v-model="model.bairro"
                :error="getError('bairro')"
                v-validate="modelValidations.bairro">
      </fg-input>
    </div>      
    <div class="col-sm-5">
      <fg-input type="number"
                label="Numero"
                name="numero"
                v-model="model.numero"
                :error="getError('numero')"
                v-validate="modelValidations.numero">
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
                       :label="country"
                       :value="country"
                       :key="country"></el-option>
          </el-select>
        </fg-input>
    </div>
  </div>
</template>
<script>
  import {Select, Option} from 'element-ui'
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
          cidade: '',
          bairro: '',
          country: ''
        },
        countryOptions: ['PE', 'RJ', 'SP', 'BH', 'MG', 'PB'],
        modelValidations: {
          cep: {
            required: true
          },
          logradouro: {
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
    methods: {
      getError(fieldName) {
        return this.errors.first(fieldName)
      },
      validate() {
        return this.$validator.validateAll().then(res => {
          this.$emit('on-validated', res, this.model)
          return res
        })
      }
    }

  }
</script>
<style>
</style>
