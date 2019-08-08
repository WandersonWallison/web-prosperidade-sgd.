<template>
<navbar v-model="showNavbar">
    <div class="navbar-wrapper">
        <div class="navbar-minimize">
            <button id="minimizeSidebar" class="btn btn-icon btn-round" @click="minimizeSidebar">
          <i class="nc-icon nc-minimal-right text-center visible-on-sidebar-mini"></i>
          <i class="nc-icon nc-minimal-left text-center visible-on-sidebar-regular"></i>
        </button>
        </div>
        <div class="navbar-toggle">
            <navbar-toggle-button @click.native="toggleSidebar">

            </navbar-toggle-button>
        </div>
        <a class="navbar-brand" >Bem Vindo, <b>{{this.usuario.username}}</b></a>
    </div>

    <template slot="navbar-menu">
        <!--<form>
        <div class="input-group no-border">
          <input type="text" value="" class="form-control" placeholder="Search...">
          <div class="input-group-append">
            <div class="input-group-text">
              <i class="nc-icon nc-zoom-split"></i>
            </div>
          </div>
        </div>
      </form>-->
        <ul class="navbar-nav">
            <!--
            <li class="nav-item">
                <a class="nav-link btn-magnify" href="#">
                  <i class="nc-icon nc-chat-33"></i>
                  <p><span class="d-lg-none d-md-block">Stats</span></p>
                </a>
            </li>
            -->

            <!--  TODO - Icone de mensagens de contato entre os funcionarios
            <drop-down icon="nc-icon nc-single-02" tag="li" position="right" direction="none" class="nav-item btn-rotate dropdown">
                <a slot="title" slot-scope="{isOpen}" class="nav-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" :aria-expanded="isOpen">
                  <el-badge :value="12" class="item">
                    <i class="nc-icon nc-chat-33"></i>
                  </el-badge>
                  <p>
                    <span class="d-lg-none d-md-block">Some Actions</span>
                  </p>
                </a>
                <a>
                  <task/>
                </a>
            </drop-down>
            -->
            <drop-down icon="nc-icon nc-single-02" tag="li" position="right" direction="none" class="nav-item btn-rotate dropdown">
                <a slot="title" slot-scope="{isOpen}" class="nav-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" :aria-expanded="isOpen">
                <i class="nc-icon nc-single-02"></i>
                <p>
                  <span class="d-lg-none d-md-block"></span>
                </p>
              </a>
                <!-- <a class="dropdown-item" href="#">Meu Perfil</a> -->
                <a class="dropdown-item" href="#" @click="dialogFormVisibleDetail = true">Alterar Senha</a>
                <a class="dropdown-item" href="#" @click="logout">Sair</a>
            </drop-down>
            <!--<li class="nav-item">
          <a class="nav-link btn-rotate" href="#pablo">
            <i class="nc-icon nc-simple-remove"></i>
            <p>
              <span class="d-lg-none d-md-block">Account</span>
            </p>
          </a>
        </li>-->
        </ul>
        <md-dialog :md-active.sync="dialogFormVisibleDetail">
            <senha />
        </md-dialog>
    </template>
</navbar>
</template>

<script>
import {
    Navbar,
    NavbarToggleButton
} from 'src/components/UIComponents'
import {
    win32
} from 'path'
import senha from '../Views/Forms/Usuario/AlterPassword.vue'
import task from '../Views/Dashboard/Widgets/TaskList'

export default {
    components: {
        Navbar,
        NavbarToggleButton,
        senha,
        task
    },
    data() {
        return {
            dialogFormVisibleDetail: false,
            usuario: '',
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            formLabelWidth: '120px',
            activeNotifications: false,
            showNavbar: false
        }
    },
    mounted() {
        this.usuario = JSON.parse(window.localStorage.getItem('usuario'))

    },
    methods: {
        logout() {
            window.localStorage.clear()
            this.$router.push('/login')
        },
        alteraSenha() {
            alert('teste')
            this.dialogTableVisible = true
        },
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1)
        },
        toggleNotificationDropDown() {
            this.activeNotifications = !this.activeNotifications
        },
        closeDropDown() {
            this.activeNotifications = false
        },
        toggleSidebar() {
            this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
        },
        hideSidebar() {
            this.$sidebar.displaySidebar(false)
        },
        minimizeSidebar() {
            this.$sidebar.toggleMinimize()
        },
        toggleNavbar() {
            this.showNavbar = !this.showNavbar;
        }
    }
}
</script>
<style>

</style>
