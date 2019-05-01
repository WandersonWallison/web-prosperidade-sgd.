<template>
  <div class="card">
    <form>
      <div class="card-header">
        <h4 class="card-title">
          Cadastro de Escritório
        </h4>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label>Nome</label>
          <fg-input  type="text"
                     name="nome"
                     v-validate="modelValidations.nome"
                     :error="getError('nome')"
                     v-model="model.nome">
          </fg-input>
          <label>CNPJ</label>
          <fg-input  type="text"
                     name="cnpj"
                     v-validate="modelValidations.cnpj"
                     :error="getError('cnpj')"
                     v-model="model.cnpj">
          </fg-input>
          <label>Telefone</label>
          <fg-input  type="text"
                     name="telefone"
                     v-validate="modelValidations.telefone"
                     :error="getError('telefone')"
                     v-model="model.telefone">
          </fg-input>
          <label>E-mail</label>
          <fg-input  type="email"
                     name="email"
                     v-validate="modelValidations.email"
                     :error="getError('email')"
                     v-model="model.email">
          </fg-input>
        </div>
        <div class="form-group">
          <label>Logradouro</label>
          <fg-input  type="text"
                     name="logradouro"
                     v-validate="modelValidations.logradouro"
                     :error="getError('logradouro')"
                     v-model="model.logradouro">
          </fg-input>
          <label>Número</label>
          <fg-input  type="text"
                     name="numero"
                     v-validate="modelValidations.numero"
                     :error="getError('numero')"
                     v-model="model.numero">
          </fg-input>
          <label>Bairro</label>
          <fg-input  type="text"
                     name="bairro"
                     v-validate="modelValidations.bairro"
                     :error="getError('bairro')"
                     v-model="model.bairro">
          </fg-input>
          <label>Cidade</label>
          <fg-input  type="text"
                     name="cidade"
                     v-validate="modelValidations.cidade"
                     :error="getError('cidade')"
                     v-model="model.cidade">
          </fg-input>
          <label>Estado</label>
          <fg-input  type="text"
                     name="estado"
                     v-validate="modelValidations.estado"
                     :error="getError('estado')"
                     v-model="model.estado">
          </fg-input>
        </div>
      </div>
      <div class="card-footer text-right">
        <p-button type="info" @click.prevent="validate">Salvar</p-button>
      </div>
    </form>

  </div>
</template>
<script>
  export default {
    data () {
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
          },

        }
      }
    },
    methods: {
      getError (fieldName) {
        return this.errors.first(fieldName)
      },
      validate () {
        this.$validator.validateAll().then(isValid => {
          this.$emit('on-submit', this.registerForm, isValid)
        })
      }
    }
  }
</script>
<style>
</style>
