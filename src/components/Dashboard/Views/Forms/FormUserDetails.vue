<template>
  <div class="card">
    <div class="card-header">
      <h4 class="title">Detalhes do Usuário</h4>
    </div>
    <div class="card-body">
      <form>
        <div class="row">
          <div class="col-md-5">
            <fg-input type="text"
                      :disabled="true"
                      label="Nome"
                      v-model="user.username">
            </fg-input>
          </div>
          <div class="col-md-7">
            <fg-input type="text"
                      :disabled="true"
                      label="Email"
                      v-model="user.email">
            </fg-input>
          </div>
          <div class="col-md-5">
            <fg-input type="text"
                      :disabled="true"
                      label="Telefone"
                      v-model="user.telefone">
            </fg-input>
          </div>
          <div class="col-md-5">
            <fg-input type="text"
                      :disabled="true"
                      label="Celular"
                      v-model="user.celular">
            </fg-input>
          </div>
          <div class="col-md-3">
            <fg-input type="text"
                      :disabled="true"
                      label="Cpf"
                      v-model="user.cpf">
            </fg-input>
          </div>
          <div class="col-md-3">
            <fg-input type="text"
                      :disabled="true"
                      label="Cnh"
                      v-model="user.cnh">
            </fg-input>
          </div>
          <div class="col-md-3">
            <fg-input type="text"
                      :disabled="true"
                      label="Rg"
                      v-model="user.rg">
            </fg-input>
          </div>
        </div>
        <h5 class="title">Endereço</h5>
        <div class="row">
          <div class="col-md-4">
            <fg-input type="text"
                      :disabled="true"
                      label="Cep"
                      v-model="user.endereco[0].cep">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      :disabled="true"
                      label="Logradouro"
                      v-model="user.endereco[0].logradouro">
            </fg-input>
          </div>
          <div class="col-md-4">
                    <fg-input>
                        <el-select class="select-default" v-model="user.endereco[0].uf" name="tipo_user" :disabled="true" placeholder="Selecione...">
                            <el-option class="select-default" v-for="item in optionsStade" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </fg-input>
                </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <fg-input type="text"
                      :disabled="true"
                      label="Cidade"
                      v-model="user.endereco[0].cidade">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      :disabled="true"
                      label="Bairro"
                      v-model="user.endereco[0].bairro">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="number"
                      :disabled="true"
                      label="Numero"
                      v-model="user.endereco[0].numero">
            </fg-input>
          </div>
          
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </div>
  
</template>
<script>
import axios from 'axios'
import {Select, Option} from 'element-ui'
import swal from 'sweetalert2'
import { setInterval } from 'timers';
  export default {
      name: 'UserEdit',
      props: ['selected'],
      components: {
      [Select.name]: Select,
      [Option.name]: Option
    },
    data () {
      return {
        user: this.selected,
        optionsStade: [{
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
                    label: 'Cear?'
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
                    label: 'Par?'
                },
                {
                    value: 'PB',
                    label: 'Paraiba'
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
                    label: 'S?o Paulo'
                },
                {
                    value: 'SE',
                    label: 'Sergipe'
                },
                {
                    value: 'TO',
                    label: 'Tocantins'
                }
            ]
      }
    },
    methods: {
      updateProfile () {
        let userEdit= {
                username: this.user.firstName,
                email: this.user.email,
                password: this.user.senha,
                cpf: this.user.cpf,
                cnh: this.user.cnh,
                rg: this.user.rg,
                data_nascimento: this.user.datePicker,
                telefone: this.user.telefone,
                celular: this.user.celular,
                id_grupo: this.user.tipo
                }
        let endereco = {
                logradouro: this.user.logradouro,
                cep: this.user.cep,
                bairro: this.user.bairro,
                cidade: this.user.cidade,
                uf: this.user.estado,
                numero: this.user.numero,
                // id_user: ''
      }
                axios.put(process.env.VUE_APP_ROOT_API  + '/user/'+ this.user.id, userEdit)
                .then(response => {
                    this.results = response.data
                    // endereco.id_user = response.data.id
                      axios.put(process.env.VUE_APP_ROOT_API + '/endereco/'+ this.user.endereco[0].id, endereco)
                        .then(response => {
                    swal('Bom trabalho!', 'Usuario Cadastrado com sucesso!', 'success')
                    window.location.reload()
                    // this.$router.push('/forms/UserList')
                    })
                  })
                    .catch(error => {
                        // alert(error.response.data)
                        swal('Algo de errado!', 'Email invalido!', 'error')
                        console.log(error.response.data)
                        })
        // alert('Your data: ' + JSON.stringify(this.user))
      }
    }
  }

</script>
<style>

</style>
