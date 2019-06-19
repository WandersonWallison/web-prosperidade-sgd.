<template>
<div class="register-page">
    <div class="wrapper wrapper-full-page ">
        <div class="full-page register-page section-image" filter-color="black">
            <div class="content">
                <div class="container">
                    <div class="row">

                        <div class="col-lg-4 col-md-6 mr-auto">
                            <card type="signup" class="text-center">
                                <template slot="header">
                                    <h4 class="card-title">Esqueceu a Senha</h4>
                                </template>
                                <fg-input v-model="form.login" addon-left-icon="nc-icon nc-single-02" placeholder="Login..."></fg-input>
                                <p-checkbox class="text-left" v-model="form.acceptTerms">
                                    I agree to the
                                    <a href="#something">terms and conditions</a>.
                                </p-checkbox>
                                <p-button slot="footer" type="info" @click="validarLogin(form.login)" round>Resetar senha</p-button>
                            </card>
                        </div>
                    </div>
                </div>
            </div>
            <div class="full-page-background" style="background-image: url(static/img/background/escolhas-prosperidade-img-2.jpg) ">
            </div>
        </div>
    </div>
</div>
</template>

<script src="https://smtpjs.com/v3/smtp.js"></script>
<script>
import {
    Card,
    Checkbox,
    Button,
    InfoSection
} from 'src/components/UIComponents'
import swal from 'sweetalert2'
import axios from 'axios'
import {
    SMTPClient
} from 'smtp-client';

export default {
    name: 'ForgotPassword',
    components: {
        Card,
        SMTPClient,
        InfoSection,
        [Checkbox.name]: Checkbox,
        [Button.name]: Button
    },
    data() {
        return {
            form: {
                login: '',
                newPassword: '',
                newPasswordCont: '',
                acceptTerms: true
            },
            retorno: ''
        }
    },
    methods: {
        toggleNavbar() {
            document.body.classList.toggle('nav-open')
        },
        closeMenu() {
            document.body.classList.remove('nav-open')
            document.body.classList.remove('off-canvas-sidebar')
        },
        gerarSenha(len) {
            // Gera uma senha complexa
            var pwd = [],
                cc = String.fromCharCode,
                R = Math.random,
                rnd, i;
            pwd.push(cc(48 + (0 | R() * 10))); // push a number
            pwd.push(cc(65 + (0 | R() * 26))); // push an upper case letter
            for (i = 2; i < len; i++) {
                rnd = 0 | R() * 62; // generate upper OR lower OR number
                pwd.push(cc(48 + rnd + (rnd > 9 ? 7 : 0) + (rnd > 35 ? 6 : 0)));
            }
            // shuffle letters in password
            return pwd.sort(function () {
                return R() - .5;
            }).join('');

        },
        validarLogin(login) {

            let s = new SMTPClient({
                    host: 'smtp.hostinger.com.br',
                    port: 587
                })
                (async function () {
                    await s.connect();
                    await s.greet({
                        hostname: 'smtp.hostinger.com.br'
                    }); // runs EHLO command or HELO as a fallback
                    await s.authPlain({
                        username: 'suporte@vivasolucoes.online',
                        password: 'xpto@123'
                    }); // authenticates a user
                    await s.mail({
                        from: 'suporte@vivasolucoes.online'
                    }); // runs MAIL FROM command
                    await s.rcpt({
                        to: 'wellington.m.santos@gmail.com'
                    }); // runs RCPT TO command (run this multiple times to add more recii)
                    await s.data('mail source'); // runs DATA command and streams email source
                    await s.quit(); // runs QUIT command
                })().catch(console.error)

            // TODO - Criação do envio de e-mail para esqueceu senha
            axios.get(process.env.VUE_APP_ROOT_API + '/user?where={"email":"' + login + '"}').then((result) => {
                this.retorno = result.data
                // this.retorno.message == 'Username not found' ? this.retorno.message = 'Usuário não encontrado' : this.retorno.message = 'Senha incorreta'
                // login = 'wanderson.silva@gmail.com'
                console.log('Nova Senha: ', this.gerarSenha(8))
                if (!this.retorno) {
                    swal(this.retorno.message, '', 'warning')
                } else {
                    /*
                      Email.send({
                          Host: "smtp.hostinger.com.br",
                          Username: "suporte@vivasolucoes.online",
                          Password: "xpto@123",
                          To: 'suporte@vivasolucoes.online',
                          From: login,
                          Subject: "Troca de senha",
                          Body: "sua nova senha é"
                      }).then(
                          message => swal(this.retorno.message, '', 'sucess')
                      )
                      */
                }

            }).catch((err) => {
                console.log('Erro - ', err)
                this.retorno = err
                //this.$router.push('/')
            })
        }

    },
    beforeDestroy() {
        this.closeMenu()
    }
}
</script>

<style>
</style>
