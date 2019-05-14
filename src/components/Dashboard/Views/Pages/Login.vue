<template>
<div class="login-page" style="background-color: #3e66ed">
    <!-- <app-navbar></app-navbar> -->
    <div class="wrapper wrapper-full-page">
        <div class="full-page login-page section-image">
            <!--   you can change the color of the filter page using: data-color="blue | azure | green | orange | red | purple" -->
            <div class="content" data-color="blue">
                <div class="container">
                    <div class="col-lg-6 col-md-9 ml-auto mr-auto">
                        <form @submit.prevent="login">
                            <card type="login">
                                <div style="text-align: -webkit-center">
                                    <img slot="header" width="300" height="90" src="static\img\prosperidade.png" alt="...">
                                    <img slot="header" width="130" height="40" src="static\img\xp.png" alt="...">
                                </div>
                                    <br>
                                    <!-- <h3 slot="header" class="header text-center">Login</h3> -->
                                    <fg-input name="email" v-model="form.email" required v-validate="modelValidations.email" :error="getError('email')" addon-left-icon="nc-icon nc-single-02" placeholder="E-mail">
                                    </fg-input>

                                    <fg-input name="password" v-model="form.password" required v-validate="modelValidations.password" :error="getError('password')" addon-left-icon="nc-icon nc-key-25" placeholder="Password" type="password">
                                    </fg-input>
                                    <br>
                                    <p-button native-type="submit" slot="footer" type="warning" round block class="mb-3">Entrar</p-button>
                            </card>
                        </form>
                    </div>
                </div>
            </div>
            <!-- <app-footer></app-footer> -->
            <div class="full-page-background" style="background-color=#a18857"></div>
        </div>
    </div>
</div>
</template>

<script>
import {
    Card,
    Button
} from 'src/components/UIComponents'
import AppNavbar from './Layout/AppNavbar'
import AppFooter from './Layout/AppFooter'
import axios from 'axios'

export default {
    components: {
        Card,
        AppNavbar,
        AppFooter,
        [Button.name]: Button
    },
    methods: {
        getError(fieldName) {
            return this.errors.first(fieldName)
        },
        toggleNavbar() {
            document.body.classList.toggle('nav-open')
        },
        closeMenu() {
            document.body.classList.remove('nav-open')
            document.body.classList.remove('off-canvas-sidebar')
        },
        login() {

            // TODO -Wellington Colocar resolução desse metodo para login

            axios.post(process.env.VUE_APP_ROOT_API + '/login', this.form)
            .then((result) => {
              console.log()
              this.$router.push('/admin')
              console.log('Resultado:' + result.data)
            }).catch((err) => {
              this.$router.push('/')
            })
            // handle login here
        }
    },
    data() {
        return {
            form: {
                email: '',
                password: ''
            },
            modelValidations: {
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true,
                    min: 5
                }
            }
        }
    },
    beforeDestroy() {
        this.closeMenu()
    }
}
</script>

<style>
</style>
