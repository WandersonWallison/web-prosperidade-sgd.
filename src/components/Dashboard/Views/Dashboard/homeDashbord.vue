<template>
<div>
    <div class="row">
        <div class="col-lg-4 col-md-12 col-sm-12" :key="statsCota.id" v-for="statsCota in statsCotacao">
            <stats-card :type="statsCota.type" :icon="statsCota.icon" :small-title="statsCota.title" :title="statsCota.value">
                <div class="stats" slot="footer">
                    <i :class="statsCota.footerIcon"></i>
                    {{statsCota.footerText}}
                </div>
            </stats-card>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <chart-card :chart-data="activityChart.data" :chart-height="150" chart-id="activity-bar-chart" chart-type="Bar">
                <template slot="header">
                    <h4 class="card-title">VALOR vs. STATUS</h4>
                </template>
                <template slot="footer">
                </template>
            </chart-card>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-4 col-md-12 col-sm-12" :key="stats.id" v-for="stats in statsCards">
            <stats-card :type="stats.type" :icon="stats.icon" :small-title="stats.title" :title="stats.value">
                <div class="stats" slot="footer">
                    <i :class="stats.footerIcon"></i>
                    {{stats.footerText}}
                </div>
            </stats-card>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import CircleChartCard from 'src/components/UIComponents/Cards/CircleChartCard.vue'
import ChartCard from 'src/components/UIComponents/Cards/ChartCard'
import StatsCard from 'src/components/UIComponents/Cards/StatsCard'
import {
    Badge
} from 'src/components/UIComponents'
import moment from 'moment'
import Loading from 'src/components/Dashboard/Layout/LoadingMainPanel.vue'
import TaskList from './Widgets/TaskList'
const WorldMap = () => ({
    component: import('./../Maps/WorldMap.vue'),
    loading: Loading,
    delay: 200
})

export default {
    name: 'homeDasbord',
    components: {
        StatsCard,
        ChartCard,
        CircleChartCard,
        WorldMap,
        Badge,
        TaskList
    },
    /**
     * Chart data used to render stats, charts. Should be replaced with server data
     */
    data() {
        return {
            valorInvestimento: '',
            showMenu: true,
            status: [],
            valorStatus: [],
            valorBoletaEfetivada: [],
            qtdCliente: 0,
            activityChart: [],
            statsCards: [],
            statsCotacao: [],
            teste: [],
            tipo_situacao: [],
            cotacao: []

        }
    },
    mounted() {

        const authUser = JSON.parse(window.localStorage.getItem("usuario"))

        axios.get(process.env.VUE_APP_ROOT_API + '/tipo_situacao_movimento?where={"ativo": 1}').then(response => {
            this.tipo_situacao = response.data
            this.carregaGrafico(12)
        })

        axios.get(process.env.VUE_APP_ROOT_API + '/retorna_cliente?user_id='+ authUser.id).then(response => {
            this.qtdCliente = response.data

            axios.get(process.env.VUE_APP_ROOT_API + '/retorna_total_movimentacao?user_id=' + authUser.id + '&id_situacao_movimentacao=' + 7).then(response => {
                this.valorBoletaEfetivada = response.data

                axios.get(process.env.VUE_APP_ROOT_API + '/limite_movimentacao').then(response => {
                    this.valorInvestimento = this.formatarMoeda(response.data)
                    this.statsCards = [{
                            type: 'warning',
                            icon: 'nc-icon nc-globe',
                            title: 'VALOR EM BOLSA MRV PROSPERIDADE',
                            value: this.valorInvestimento,
                            footerText: 'Atualizado agora',
                            footerIcon: 'nc-icon nc-refresh-69'
                        },
                        {
                            type: 'success',
                            icon: 'nc-icon nc-money-coins',
                            title: 'VALOR DE BOLETAS EFETIVADAS',
                            value: this.formatarMoeda(this.valorBoletaEfetivada), //'R$ 1.456.345',
                            footerText: 'Hoje',
                            footerIcon: 'nc-icon nc-calendar-60'
                        },
                        {
                            type: 'danger',
                            icon: 'nc-icon nc-single-02',
                            title: 'QTD CLIENTES CADASTRADOS',
                            value: this.qtdCliente.toString(),
                            footerText: 'Hoje',
                            footerIcon: 'nc-icon nc-bell-55'
                        }
                    ]
                })

            })

        })

        axios.get('https://economia.awesomeapi.com.br/all/USD-BRL,EUR-BRL,BTC-BRL').then(response => {

            this.cotacao = response.data
            this.statsCotacao = [{
                    type: 'warning',
                    icon: 'nc-icon nc-globe',
                    title: 'Dólar ',
                    value:  this.cotacao.USD.ask,
                    footerText: moment().format(this.cotacao.USD.create_date),
                    footerIcon: 'nc-icon nc-calendar-60'
                },
                {
                    type: 'success',
                    icon: 'nc-icon nc-money-coins',
                    title: 'Euro ',
                    value: this.cotacao.EUR.ask,
                    footerText: this.cotacao.EUR.create_date,
                    footerIcon: 'nc-icon nc-calendar-60'
                },
                {
                    type: 'danger',
                    icon: 'nc-icon nc-bold',
                    title: 'Bitcoin',
                    value: this.cotacao.BTC.ask,
                    footerText: this.cotacao.BTC.create_date,
                    footerIcon: 'nc-icon nc-bell-55'
                }
            ]
        })
    },

    methods: {
        carregaGrafico(usuario) {
            for (let index = 0; index < this.tipo_situacao.length; index++) {
                // TODO - status da Situação Movimentação
                this.status.push(this.tipo_situacao[index].descricao.toString())
                // TODO -> DASHBORD -  Metodo que monta o grafico de barra
                axios.get(process.env.VUE_APP_ROOT_API + '/retorna_total_movimentacao?user_id=' + usuario + '&id_situacao_movimentacao=' + this.tipo_situacao[index].id).then(response => {
                    this.valorStatus.push(this.formatarMoedaNumber(response.data))
                    //this.valorStatus = [12000.43,400000.00,0.0,12.000,43.400,0.0,0.0,12000.43]
                    this.formarGrafico(this.status, this.valorStatus)
                })
            }
        },

        formarGrafico(rotulo, valor) {

            this.activityChart = {
                data: {
                    labels: rotulo,
                    datasets: [{
                        label: "Acumulado ",
                        borderColor: '#4682B4',
                        fill: true,
                        backgroundColor: '#4682B4',
                        hoverBorderColor: '#fcc468',
                        borderWidth: 2,
                        data: valor
                    }]
                }
            }
        },
        formatarMoeda(valor) {
            // console.log('valor', valor)
            if (valor) {
                var numero = valor.toFixed(2).split('.')
                numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.')
                return numero.join(',')
            }
            return '0,00'
        },
        formatarMoedaNumber(valor) {

            if (valor) {
                var numero = valor.toFixed(2)
                console.log('1 - ', numero)
                return Math.floor(numero)
            }
            return 0.00
        },

    }
}
</script>

<style>

</style>
