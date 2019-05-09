<template>
  <div>
    <h5 class="info-text">Cadastro de Empresa</h5>
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
            placeholder="cnpj"
            v-model="model.cnpj"
            v-validate="modelValidations.cnpj"
            :error="getError('cnpj')"
            addon-left-icon="nc-icon nc-send">
        </fg-input>
        <fg-input 
            placeholder="telefone"
            v-model="model.telefone"
            v-validate="modelValidations.telefone"
            :error="getError('telefone')"
            addon-left-icon="nc-icon nc-headphones">
        </fg-input>
        <!--<el-select class="select-default"
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
        </el-select>-->
      </div>
    </div>
  </div>
</template>
<script>
  import {Upload} from 'element-ui';

  export default {
    components: {
      [Upload.name]: Upload
    },
    data() {
      return {
        model: {
          firstName: '',
          email: '',
          cnpj: '',
          tipo: '',
          imageUrl: 'static/img/default-avatar.png'
        },
        modelValidations: {
          firstName: {
            required: true,
            min: 5
          },
          cnpj: {
            required: true
          },
          email: {
            required: true,
            email: true
          },
          telefone: {
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
