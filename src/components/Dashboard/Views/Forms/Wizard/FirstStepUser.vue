<template>
  <div>
    <h5 class="info-text"> Cadastro de Usuário</h5>
    <div class="row justify-content-center">
      <!--
      <div class="col-sm-4">
        <div class="picture-container">
          <el-upload class="picture"
                     action="https://jsonplaceholder.typicode.com/posts/"
                     :on-change="handlePreview"
                     :auto-upload="false"
                     :show-file-list="false">
            <img v-if="model.imageUrl" :src="model.imageUrl" class="picture-src">
          </el-upload>
          <h6 class="description">Choose Picture</h6>
        </div>
      </div> -->
      <div class="col-12 col-sm-10 mt-3">
        <fg-input name="firstName"
            placeholder="Nome"
            v-model="model.firstName"
            v-validate="modelValidations.firstName"
            :error="getError('firstName')"
            addon-left-icon="nc-icon nc-single-02">
        </fg-input>
        <fg-input 
            type="email"
            name="email"
            placeholder="E-mail"
            v-model="model.email"
            v-validate="modelValidations.email"
            :error="getError('email')"
            addon-left-icon="nc-icon nc-email-85">
        </fg-input>
        <fg-input 
            name="senha"
            placeholder="Senha"
            v-model="model.senha"
            v-validate="modelValidations.senha"
            :error="getError('senha')"
            addon-left-icon="nc-icon nc-key-25">
        </fg-input>
        <fg-input 
            name="cvm"
            placeholder="cvm"
            v-model="model.cvm"
            v-validate="modelValidations.cvm"
            :error="getError('cvm')"
            addon-left-icon="nc-icon nc-hat-3">
        </fg-input>
        <fg-input 
            name="cpf"
            placeholder="cpf"
            v-model="model.cpf"
            v-validate="modelValidations.cpf"
            :error="getError('cpf')"
            addon-left-icon="nc-icon nc-badge">
        </fg-input>
        <fg-input 
            name="cnh"
            placeholder="cnh"
            v-model="model.cnh"
            v-validate="modelValidations.cnh"
            :error="getError('cnh')"
            addon-left-icon="nc-icon nc-badge">
        </fg-input>
        <fg-input 
            name="rg"
            placeholder="rg"
            v-model="model.rg"
            v-validate="modelValidations.rg"
            :error="getError('rg')"
            addon-left-icon="nc-icon nc-badge">
        </fg-input>
        <fg-input 
            name="telefone"
            placeholder="telefone"
            v-model="model.telefone"
            v-validate="modelValidations.telefone"
            :error="getError('telefone')"
            addon-left-icon="nc-icon nc-headphones">
        </fg-input>
        <fg-input 
            name="celular"
            placeholder="celular"
            v-model="model.celular"
            v-validate="modelValidations.celular"
            :error="getError('celular')"
            addon-left-icon="nc-icon nc-headphones">
        </fg-input>
            <div class="form-group">
              <el-date-picker v-model="model.datePicker" type="date" placeholder="Data Nascimento"
                              :picker-options="pickerOptions1">
              </el-date-picker>
          </div>
        <el-select class="select-default"
          v-model="model.tipo"
          name="tipo_user"
          placeholder="Tipos de Usuario">
          <el-option
              class="select-default"
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>
<script>
  import {DatePicker, TimeSelect, Slider, Tag, Input, Button, Select, Option,Upload} from 'element-ui'

  export default {
    components: {
      [DatePicker.name]: DatePicker,
      [Upload.name]: Upload
    },
    data() {
      return {
        pickerOptions1: {
          shortcuts: [{
            text: 'Today',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: 'Yesterday',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: 'A week ago',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        },
        datePicker: '',
        model: {
          firstName: '',
          email: '',
          senha: '',
          cvm: '',
          cpf: '',
          cnh: '',
          rg: '',
          tipo: '',
          telefone: '',
          celular: '',
          datePicker: '',
          imageUrl: 'static/img/default-avatar.png'
        },
        modelValidations: {
          firstName: {
            required: true,
            min: 5
          },
          senha: {
            required: true
          },
          cpf: {
            required: true
          },
          cnh: {
            required: true
          },
          rg: {
            required: true
          },
          telefone: {
            required: true
          },
          celular: {
            required: true
          },
          email: {
            required: true,
            email: true
          }
        },
        options: [
          {
            value: 1,
            label: 'Administrador'
          },
          {
            value: 2,
            label: 'Operador'
          },
          {
            value: 3,
            label: 'Assessor'
          }
        ]
      }
    },
    methods: {
      handlePreview(file) {
        this.model.imageUrl = URL.createObjectURL(file.raw);
      },
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
<style lang="scss">
  .card-wizard .picture-container .picture {
    input[type="file"] {
      display: none;
    }
  }
</style>
