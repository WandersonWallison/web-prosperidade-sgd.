<template>
<div class="card">
    <form>
        <div class="card-header">
            <h4 class="card-title">
                Editar Cliente
            </h4>
        </div>
        <div class="card-body row justify-content-center">

            <br/>
            <div class="form-group col-md-6">
                <el-card class="box-card">
                    <div class="form-group col-md-10">
                        <el-switch v-model="model.tipo_pessoa" name="tipo_pessoa" active-color="#20B2AA" inactive-color="#00BFFF" active-text="Pessoa Jurídica" inactive-text="Pessoa Física">
                        </el-switch>
                    </div>
                    <div slot="header" class="clearfix">
                        <span>Dados</span>
                    </div>
                    <label>Nome</label>
                    <fg-input type="text" name="nome" v-validate="modelValidations.nome" :error="getError('nome')" v-model="model.nome">
                    </fg-input>
                    <label>Telefone</label>
                    <fg-input type="text" v-mask="'(##)#####-####'" name="telefone" v-validate="modelValidations.telefone" :error="getError('telefone')" v-model="model.telefone">
                    </fg-input>
                    <label>E-mail</label>
                    <fg-input type="email" name="email" v-validate="modelValidations.email" :error="getError('email')" v-model="model.email">
                    </fg-input>
                </el-card>
                <br>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Endereço</span>
                    </div>
                    <label>Tipo Endereço</label>
                    <div class="form-group col-md-10">
                        <el-radio v-model="model.tipo_endereco" label="Residencial">Residencial</el-radio>
                        <el-radio v-model="model.tipo_endereco" label="Comercial">Comercial</el-radio>
                    </div>
                    <label>CEP</label>
                    <fg-input type="text" v-mask="'#####-###'" data-vv-name="cep" v-validate="modelValidations.cep" :error="getError('cep')" @change="buscarEndereco($event)" v-model="model.cep">
                    </fg-input>
                    <label>Logradouro</label>
                    <fg-input type="text" data-vv-name="logradouro" v-validate="modelValidations.logradouro" :error="getError('logradouro')" v-model="model.logradouro">
                    </fg-input>
                    <label>Número</label>
                    <fg-input type="text" data-vv-name="numero" v-validate="modelValidations.numero" :error="getError('numero')" v-model="model.numero">
                    </fg-input>
                    <label>Complemento</label>
                    <fg-input type="text" data-vv-name="complemento" v-validate="modelValidations.complemento" :error="getError('complemento')" v-model="model.complemento">
                    </fg-input>
                    <label>Bairro</label>
                    <fg-input type="text" data-vv-name="bairro" v-validate="modelValidations.bairro" :error="getError('bairro')" v-model="model.bairro">
                    </fg-input>
                    <label>Cidade</label>
                    <fg-input type="text" data-vv-name="cidade" v-validate="modelValidations.cidade" :error="getError('cidade')" v-model="model.cidade">
                    </fg-input>
                    <label>Estado</label>
                    <fg-input :error="getError('estado')">
                        <el-select class="select-default" v-validate="modelValidations.estado" v-model="model.estado" data-vv-name="estado" placeholder="Selecione...">
                            <el-option class="select-default" v-for="item in optionsStade" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </fg-input>
                </el-card>
            </div>
            <div class="form-group col-md-6">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Dados Conta</span>
                    </div>
                    <div>
                        <el-checkbox name="habilitado_bovespa" v-model="model.habilitado_bovespa">Habilitado bovespa</el-checkbox>
                    </div>
                    <div>
                        <el-checkbox name="termo_push" v-model="model.termo_push">Termo Push</el-checkbox>
                    </div>
                    <label>Numero XP</label>
                    <fg-input type="text" name="id_xp" v-validate="modelValidations.id_xp" :error="getError('id_xp')" v-model="model.id_xp">
                    </fg-input>
                    <!--  SITUAÇÃO TRIBUTARIA  -->
                    <label>Situação Tributária</label>
                    <fg-input :error="getError('situacao_tributaria')" v-validate="modelValidations.situacao_tributaria" name="situacao_tributaria">
                        <el-select no-data-text="Sem informações" class="select-default" v-model="model.situacao_tributaria" name="situacao_tributaria" placeholder="Selecione...">
                            <el-option class="select-default" v-for="item in this.dataSituacao_tributaria" :key="item.id" :label="item.descricao" :value="item.id">
                            </el-option>
                        </el-select>
                    </fg-input>
                    <!--  OPERADOR  -->
                    <label>Operador</label>
                    <fg-input :error="getError('operador')" v-validate="modelValidations.operador" name="operador">
                        <!--<el-select no-data-text="Sem informações" class="select-default" v-model="model.operador" name="operador" placeholder="Selecione...">-->
                        <el-select no-data-text="Sem informações" class="select-default" 
                            v-model="model.operador" 
                            name="operador" 
                            filterable 
                            allow-create
                            default-first-option 
                            placeholder="Selecione...">     
                            <el-option class="select-default" v-for="item in this.dataOperadores" :key="item.id" :label="item.username" :value="item.id">
                            </el-option>
                        </el-select>
                    </fg-input>
                    <!--  ASSESSOR  -->
                    <label>Assessor</label>
                    <fg-input :error="getError('assessor')" v-validate="modelValidations.assessor" name="assessor">
                        <!--<el-select no-data-text="Sem informações" class="select-default" v-model="model.assessor" name="assessor" placeholder="Selecione...">-->
                        <el-select no-data-text="Sem informações" class="select-default"  
                            v-model="model.assessor" 
                            name="assessor" 
                            filterable 
                            allow-create
                            default-first-option 
                            placeholder="Selecione...">    
                            
                            <el-option class="select-default" v-for="item in this.dataAssessores" :key="item.id" :label="item.username + ' - ' + item.id_xp" :value="item.id">
                            </el-option>
                        </el-select>
                    </fg-input>
                    <div class="form-group col-md-6">

                    </div>
                    <label>Investimento Inicial Atual</label>
                    <fg-input type="text" :disabled="true" v-model="model.investimento_inicial_atual">
                    </fg-input>
                     <label>Potencial de Investimento Atual</label>
                    <fg-input type="text" :disabled="true" v-model="model.potencial_investimento_atual">
                    </fg-input>
                    <!--
                    <label>Investimento Inicial</label>
                    <fg-input type="text" v-money="money" name="investimento_inicial" v-validate="modelValidations.investimento_inicial" :error="getError('investimento_inicial')" v-model="model.investimento_inicial">
                    </fg-input>
                    -->
                    <label>Potencial de Investimento</label>
                    <fg-input type="text" v-money="money" name="potencial_investimento" v-validate="modelValidations.potencial_investimento" :error="getError('potencial_investimento')" v-model="model.potencial_investimento">
                    </fg-input>
                </el-card>
                <br>
                <div name="fisica" v-if="!this.model.tipo_pessoa">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>Pessoa Física</span>
                        </div>
                        <label>RG</label>
                        <fg-input type="text" name="rg" v-mask="'###########'" v-validate="modelValidations.rg" :error="getError('rg')" v-model="model.rg">
                        </fg-input>
                        <label>CPF</label>
                        <fg-input type="text" v-mask="'###.###.###-##'" name="cpf" v-validate="modelValidations.cpf" :error="getError('cpf')" v-model="model.cpf">
                        </fg-input>
                    </el-card>
                </div>
                <div name="juridica" v-if="this.model.tipo_pessoa">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>Pessoa Jurídica</span>
                        </div>
                        <div>
                          <label>Razão Social</label>
                          <fg-input type="text" name="razao_social" v-validate="modelValidations.razao_social" :error="getError('razao_social')" v-model="model.razao_social">
                          </fg-input>
                        </div>
                        <label>CNPJ</label>
                        <fg-input type="text" v-mask="'##.###.###/####-##'" name="cnpj" v-validate="modelValidations.cnpj" :error="getError('cnpj')" v-model="model.cnpj">
                        </fg-input>
                    </el-card>
                </div>
            </div>

        </div>
        <div class="card-footer text-right">
            <p-button type="info" @click.prevent="validate">Salvar</p-button>
        </div>
    </form>
</div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'
import {
    VMoney
} from 'v-money'
import {
    mask
} from 'vue-the-mask'
export default {
    name: 'FormClientEdit',
    data() {
        return {
            money: {
                decimal: ',',
                thousands: '.',
                prefix: 'R$ ',
                precision: 2,
                masked: true /* doesn't work with directive */
            },
            model: {
                // cliente --------------
                nome: '',
                telefone: '',
                email: '',
                id_xp: '',
                investimento_inicial: '',
                potencial_investimento: '',
                investimento_inicial_atual: '',
                potencial_investimento_atual: '',
                // Física ----------------
                rg: '',
                cpf: '',
                // Jurídica --------------
                razao_social: '',
                cnpj: '',
                // Endereço --------------
                cep: '',
                logradouro: '',
                complemento: '',
                numero: '',
                bairro: '',
                cidade: '',
                estado: '',
                tipo_pessoa: '',
                habilitado_bovespa: false,
                termo_push: false,
                tipo_endereco: '',
                operador: '',
                situacao_tributaria: '',
                assessor: ''

            },
            dataOperadores: [],
            dataSituacao_tributaria: [],
            dataAssessores: [],
            dataCliente: [],
            endereco: [],
            enderecoCliente: [],
            results: [],
            resultAdress: [],
            modelValidations: {
                nome: {
                    required: true
                },
                telefone: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                id_xp: {
                    required: true
                },
                logradouro: {
                    required: true
                },
                complemento: {
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
                cep: {
                    required: true
                },
                estado: {
                    required: true
                }

            },
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
        mask,
        money: VMoney
    },
    created() {

        axios.get(process.env.VUE_APP_ROOT_API + '/user?where={"ativo": 1,"id_grupo":2}&sort=username&limit=2000').then(response => {
            this.dataOperadores = response.data
        })
        axios.get(process.env.VUE_APP_ROOT_API + '/user?where={"ativo": 1,"id_grupo":3}&sort=username&limit=2000').then(response => {
            this.dataAssessores = response.data
        })
        axios.get(process.env.VUE_APP_ROOT_API + '/tipo_situacao_tributaria?where={"ativo": 1}').then(response => {
            this.dataSituacao_tributaria = response.data
        })

        axios.get(process.env.VUE_APP_ROOT_API + '/cliente/' + window.localStorage.getItem("cliente")).then(response => {
            this.dataCliente = response.data
            // this.model = response.data
            this.model.nome = this.dataCliente.nome
            this.model.telefone = this.dataCliente.telefone
            this.model.email = this.dataCliente.email
            this.model.assessor = this.dataCliente.id_assessor.id
            this.model.operador = this.dataCliente.id_operador
            this.model.situacao_tributaria = this.dataCliente.id_tipo_solucao_tributaria.id
            this.model.cpf = this.dataCliente.cpf_cnpj
            this.model.cnpj = this.dataCliente.cpf_cnpj
            this.model.potencial_investimento_atual = this.formatarMoeda(this.dataCliente.potencial_investimento)
            this.model.investimento_inicial_atual = this.formatarMoeda(this.dataCliente.investimento_inicial)
            this.model.id_xp = this.dataCliente.id_xp
            this.model.habilitado_bovespa = this.dataCliente.habilitado_bovespa
            this.model.termo_push = this.dataCliente.termo_push
            this.model.rg = this.dataCliente.rg
            this.model.razao_social = this.dataCliente.razao_social
            this.model.tipo_pessoa = this.dataCliente.tipo_pessoa

            if (this.dataCliente.endereco.length > 0) {
                this.model.cep = this.dataCliente.endereco[0].cep
                this.model.logradouro = this.dataCliente.endereco[0].logradouro
                this.model.numero = this.dataCliente.endereco[0].numero
                this.model.complemento = this.dataCliente.endereco[0].complemento
                this.model.bairro = this.dataCliente.endereco[0].bairro
                this.model.cidade = this.dataCliente.endereco[0].cidade
                this.model.estado = this.dataCliente.endereco[0].uf
                this.model.tipo_endereco = this.dataCliente.endereco[0].tipo

            }
            window.localStorage.removeItem("cliente")
        })
    },
    methods: {
        getError(fieldName) {
            return this.errors.first(fieldName)
        },
        validate() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.$emit('on-submit', this.salvar(), result)
                    return
                }
                swal('Por favor verificar os dados solicitados no formulario!', '', 'info')
            })
        },
        formatarMoeda(valor) {

            // console.log('valor 1 - ', valor)
            var numero = valor.toFixed(2).split('.')
            // console.log('valor 2 - ', numero)
            numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.')
            // console.log('valor 3 - ', numero[0])
            return numero.join(',')

        },
        retiraMascara(campo) {

          for (let index = 0; index < campo.length; index++) {
            campo = campo.replace('.', '') // Remove tudo o que não é dígito
          }
            campo = campo.replace('R$', '')
            campo = campo.replace(',', '.') // Remove tudo o que não é dígito
            campo = campo.trim()
            return campo
        },
        buscarEndereco() {
            this.model.bairro = ''
            this.model.logradouro = ''
            this.model.cidade = ''
            this.model.estado = ''

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
                        this.model.estado = this.endereco.estado
                    }
                })
                .catch(error => {
                    // alert('Erro no cadastro do Endereço')
                    console.log(error.response.data)
                })
        },
        salvar() {

            const authUser = JSON.parse(window.localStorage.getItem("usuario"))

            let documento
            if (this.model.cnpj) {
                documento = this.model.cnpj
            } else if (this.model.cpf) {
                documento = this.model.cpf
            } else {
                documento = ''
            }

            let cliente = {

                id_xp: this.model.id_xp,
                nome: this.model.nome,
                razao_social: this.model.razao_social,
                telefone: this.model.telefone,
                email: this.model.email,
                cpf_cnpj: documento,
                potencial_investimento: this.retiraMascara(this.model.potencial_investimento === 'R$ 0,00'? this.model.potencial_investimento = this.model.potencial_investimento_atual : this.model.potencial_investimento),
               // investimento_inicial: this.retiraMascara(this.model.investimento_inicial === 'R$ 0,00'? this.model.investimento_inicial = this.model.investimento_inicial_atual : this.model.investimento_inicial),
                rg: this.model.rg,
                habilitado_bovespa: this.model.habilitado_bovespa,
                termo_push: this.model.termo_push,
                id_responsavel: authUser.id,
                id_operador: this.model.operador,
                id_tipo_solucao_tributaria: this.model.situacao_tributaria,
                tipo_pessoa: this.model.tipo_pessoa,
                id_assessor: this.model.assessor
            }
            let endereco = {
                logradouro: this.model.logradouro,
                complemento: this.model.complemento,
                cep: this.model.cep,
                uf: this.model.estado,
                bairro: this.model.bairro,
                cidade: this.model.cidade,
                numero: this.model.numero,
                tipo: this.model.tipo_endereco
            }

            // -----------------------------------------------------------
            axios.put(process.env.VUE_APP_ROOT_API + '/cliente/' + this.dataCliente.id, cliente)
                .then(response => {
                    this.results = response.data
                    endereco.id_cliente = response.data.id

                    // Cadastro de Endereço
                    if (this.dataCliente.endereco.length > 0) {
                        axios.put(process.env.VUE_APP_ROOT_API + '/endereco/' + this.dataCliente.endereco[0].id, endereco)
                            .then(response => {
                                this.resultAdress = response.data
                                swal('Bom trabalho!', 'Cliente Atualizado com sucesso!', 'success')
                                this.$router.push('/forms/ClientList')
                            })
                            .catch(error => {
                                swal('Algo de errado!', 'Verifique os campos do endereço no cadastro!', 'error')
                                console.log(error.response)
                            })

                    } else {
                        axios.post(process.env.VUE_APP_ROOT_API + '/endereco', endereco)
                            .then(response => {
                                this.resultAdress = response.data
                                swal('Bom trabalho!', 'Cliente Atualizado com sucesso!', 'success')
                                this.$router.push('/forms/ClientList')
                            })
                            .catch(error => {
                                swal('Algo de errado!', 'Verifique os campos do cadastro!', 'error')
                                console.log(error.response.data)
                            })
                    }
                })
                .catch(error => {
                    let erro_name
                    if(error.response.data.code == 'E_UNIQUE') {
                       erro_name = 'Cliente já cadastrado com o mesmo NUMERO XP'
                    }
                    swal('Algo de errado!', 'Verifique os campos do cadastro de cliente! - '+ erro_name,'error')

                })
        }
    }
}
</script>

<style>
</style>
