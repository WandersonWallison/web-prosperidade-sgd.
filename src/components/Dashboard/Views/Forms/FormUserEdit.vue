<template>
  <div class="card">
    <div class="card-header">
      <h4 class="title">Editar Usuário</h4>
    </div>
    <div class="card-body">
      <form>
        <div class="row">
          <div class="col-md-5">
            <fg-input type="text"
                      label="Nome"
                      v-model="user.username">
            </fg-input>
          </div>
          <div class="col-md-7">
            <fg-input type="text"
                      label="Email"
                      v-model="user.email">
            </fg-input>
          </div>
          <div class="col-md-5">
            <fg-input type="text"
                      label="Telefone"
                      v-model="user.telefone">
            </fg-input>
          </div>
          <div class="col-md-5">
            <fg-input type="text"
                      label="Celular"
                      v-model="user.celular">
            </fg-input>
          </div>
          <div class="col-md-3">
            <fg-input type="text"
                      label="Cpf"
                      v-model="user.cpf">
            </fg-input>
          </div>
          <div class="col-md-3">
            <fg-input type="text"
                      label="Cnh"
                      v-model="user.cnh">
            </fg-input>
          </div>
          <div class="col-md-3">
            <fg-input type="text"
                      label="Rg"
                      v-model="user.rg">
            </fg-input>
          </div>
        </div>
        <h5 class="title">Endereço</h5>
        <div class="row">
          <div class="col-md-4">
            <fg-input type="text"
                      label="Cep"
                      v-model="user.endereco[0].cep">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      label="Logradouro"
                      v-model="user.endereco[0].logradouro">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      label="Estado"
                      v-model="user.endereco[0].uf">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <fg-input type="text"
                      label="Cidade"
                      v-model="user.endereco[0].cidade">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      label="Bairro"
                      v-model="user.endereco[0].bairro">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="number"
                      label="Numero"
                      v-model="user.endereco[0].numero">
            </fg-input>
          </div>
          
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="updateProfile">
            Atualizar Usuário
          </button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </div>
  
</template>
<script>
  export default {
      name: 'UserEdit',
      props: ['selected'],
    data () {
      return {
        user: this.selected
      }
    },
    methods: {
      updateProfile () {
        alert('Your data: ' + JSON.stringify(this.user))
      }
    }
  }

</script>
<style>

</style>
