<template>
<div class="card">
    <div class="card-header">
        <h4 class="title">Editar Usuário</h4>
    </div>
    <div class="card-body">
        <form>
            <div class="row">
                <div class="col-md-5">
                    <fg-input type="text" label="Nome" v-model="user.username">
                    </fg-input>
                </div>
                <div class="col-md-7">
                    <fg-input type="text" label="Email" v-model="user.email">
                    </fg-input>
                </div>
                <div class="col-md-5">
                    <fg-input type="text" v-mask="'(##)####-####'" label="Telefone" v-model="user.telefone">
                    </fg-input>
                </div>
                <div class="col-md-5">
                    <fg-input type="text" v-mask="'(##)#####-####'" label="Celular" v-model="user.celular">
                    </fg-input>
                </div>
                <div class="col-md-3">
                    <fg-input type="text" v-mask="'###.###.###-##'" label="Cpf" v-model="user.cpf">
                    </fg-input>
                </div>
                <div class="col-md-3">
                    <fg-input type="text" v-mask="'#############'" label="Cnh" v-model="user.cnh">
                    </fg-input>
                </div>
                <div class="col-md-3">
                    <fg-input type="text" v-mask="'#############'" label="Rg" v-model="user.rg">
                    </fg-input>
                </div>
            </div>
            <h5 class="title">Endereço</h5>
            <div class="row">
                <div class="col-md-4">
                    <fg-input type="text" v-mask="'#####-###'" label="Cep" v-model="user.endereco[0].cep">
                    </fg-input>
                </div>
                <div class="col-md-4">
                    <fg-input type="text" label="Logradouro" v-model="user.endereco[0].logradouro">
                    </fg-input>
                </div>
                <div class="col-md-4">
                    <fg-input>
                        <el-select class="select-default" v-model="user.endereco[0].uf" name="tipo_user" placeholder="Selecione...">
                            <el-option class="select-default" v-for="item in optionsStade" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </fg-input>
                </div>
            </div>

            <div class="row">
                <div class="col-md-4">
                    <fg-input type="text" label="Cidade" v-model="user.endereco[0].cidade">
                    </fg-input>
                </div>
                <div class="col-md-4">
                    <fg-input type="text" label="Bairro" v-model="user.endereco[0].bairro">
                    </fg-input>
                </div>
                <div class="col-md-4">
                    <fg-input type="text" v-mask="'######'" label="Numero" v-model="user.endereco[0].numero">
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
import axios from 'axios'
import {
    mask
} from 'vue-the-mask'
import {
    Select,
    Option
} from 'element-ui'
import swal from 'sweetalert2'
import {
    setInterval
} from 'timers';
export default {
    name: 'FormUserEdit',
    props: ['selected'],
    components: {
        [Select.name]: Select,
        [Option.name]: Option
    },
    data() {
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
            ]
        }
    },
    directives: {
        mask
    },
    methods: {
        updateProfile() {
            const authUser = JSON.parse(window.localStorage.getItem('usuario'))
            let userEdit = {
                username: this.user.firstName,
                email: this.user.email,
                password: this.user.senha,
                cpf: this.user.cpf,
                cnh: this.user.cnh,
                rg: this.user.rg,
                data_nascimento: this.user.datePicker,
                telefone: this.user.telefone,
                celular: this.user.celular,
                id_grupo: this.user.tipo,
                id_responsavel: authUser.id
            }
            let endereco = {
                logradouro: this.user.endereco[0].logradouro,
                cep: this.user.endereco[0].cep,
                bairro: this.user.endereco[0].bairro,
                cidade: this.user.endereco[0].cidade,
                uf: this.user.endereco[0].uf,
                numero: this.user.endereco[0].numero,
                // id_user: ''
            }
            axios.put(process.env.VUE_APP_ROOT_API + '/user/' + this.user.id, userEdit)
                .then(response => {
                    this.results = response.data
                    //endereco.id_user = response.data.id
                    axios.put(process.env.VUE_APP_ROOT_API + '/endereco/' + this.user.endereco[0].id, endereco)
                        .then(response => {
                            swal('Bom trabalho!', 'Usuario Alterado com sucesso!', 'success')
                            this.$router.push('/forms/UserList')
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
