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

        <fg-input name="lastName"
          placeholder="Sobrenome"
          v-model="model.lastName"
          v-validate="modelValidations.lastName"
          :error="getError('lastName')"
          addon-left-icon="nc-icon nc-circle-10">
        </fg-input>

        <fg-input name="telefone"
          placeholder="Telefone"
          v-model="model.email"
          v-validate="modelValidations.telefone"
          :error="getError('telefone')"
          addon-left-icon="nc-icon nc-send">
        </fg-input>

        <fg-input name="celular"
          placeholder="Celular"
          v-model="model.celular"
          v-validate="modelValidations.celular"
          :error="getError('celular')"
          addon-left-icon="nc-icon nc-send">
        </fg-input>

        <fg-input name="email"
            placeholder="E-mail"
            v-model="model.email"
            v-validate="modelValidations.email"
            :error="getError('email')"
            addon-left-icon="nc-icon nc-send">
        </fg-input>
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
  import {Upload} from 'element-ui';

  export default {
    components: {
      [Upload.name]: Upload
    },
    data() {
      return {
        model: {
          firstName: '',
          lastName: '',
          email: '',
          telefone: '',
          celular: '',
          imageUrl: 'static/img/default-avatar.png'
        },
        modelValidations: {
          firstName: {
            required: true,
            min: 5
          },
          lastName: {
            required: true,
            min: 5
          },
          email: {
            required: true,
            email: true
          }
        },
        options: [
          {
            value: 'adm',
            label: 'Administrador'
          },
          {
            value: 'ope',
            label: 'Operador'
          },
          {
            value: 'ass',
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
