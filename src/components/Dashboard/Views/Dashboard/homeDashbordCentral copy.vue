<template>
<div>
    <!-- Cotação do Dólar, Euro, Criptomoeda   -->
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
    <!-- Agregados -->
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
    <!-- Valor x Escritorio -->
    <div class="row">
        <div class="col-md-6">
            <chart-card :chart-data="activityChartOffice.data" :chart-height="200" chart-id="activity-bar-chart" chart-type="Bar">
                <template slot="header">
                    <h4 class="card-title">VALOR vs. ESCRITORIOS</h4>
                </template>
                <template slot="footer">
                </template>
            </chart-card>
        </div>
        <div class="col-md-6">
            <chart-card :chart-data="activityChartAssessor.data" :chart-height="200" chart-id="activity-bar-chart" chart-type="Bar">
                <template slot="header">
                    <h4 class="card-title">VALOR vs. ASSESSOR </h4>
                </template>
                <template slot="footer">
                </template>
            </chart-card>
        </div>
    </div>
    <!-- Valor x Status -->
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
const tooltipOptions = {
    tooltipFillColor: "rgba(0,0,0,0.5)",
    tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    tooltipFontSize: 14,
    tooltipFontStyle: "normal",
    tooltipFontColor: "#fff",
    tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    tooltipTitleFontSize: 14,
    tooltipTitleFontStyle: "bold",
    tooltipTitleFontColor: "#fff",
    tooltipYPadding: 6,
    tooltipXPadding: 6,
    tooltipCaretSize: 8,
    tooltipCornerRadius: 6,
    tooltipXOffset: 10,
}

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
            graficoValorEscritorio: [],
            graficoValorEscritorioLabel: [],
            graficoValorEscritorioValor: [],
            graficoAssessor: [],
            graficoAssessorLabel: [],
            graficoAssessorValor: [],
            showMenu: true,
            status: [],
            valorStatus: [],
            valorBoletaEfetivada: [],
            qtdCliente: 0,
            activityChart: [],
            activityChartAssessor: [],
            activityChartOffice: [],
            statsCards: [],
            statsCotacao: [],
            teste: [],
            tipo_situacao: [],
            cotacao: [],
            statsGeral: []
        }
    },
    mounted() {

        const authUser = JSON.parse(window.localStorage.getItem("usuario"))

        axios.get(process.env.VUE_APP_ROOT_API + '/tipo_situacao_movimento?where={"ativo": 1}').then(response => {
            this.tipo_situacao = response.data
            this.carregaGrafico(authUser.id)
        })
        // Gráfico de valores por escritorios
        axios.get(process.env.VUE_APP_ROOT_API + '/grafico_valor_escritorio').then(response => {

            this.graficoValorEscritorio = response.data
            for (let index = 0; index < this.graficoValorEscritorio.length; index++) {
                this.graficoValorEscritorioLabel.push(this.graficoValorEscritorio[index].nome)
            }
            for (let index = 0; index < this.graficoValorEscritorio.length; index++) {
                this.graficoValorEscritorioValor.push(this.graficoValorEscritorio[index].valor)
            }
            this.formarGraficoPie(this.graficoValorEscritorioLabel, this.graficoValorEscritorioValor)
        })
        // Grafico de valores por Assessores
        axios.get(process.env.VUE_APP_ROOT_API + '/grafico_assessor').then(response => {
            this.graficoAssessor = response.data
            for (let index = 0; index < this.graficoAssessor.length; index++) {
                this.graficoAssessorLabel.push(this.graficoAssessor[index].assessor)
            }
            for (let index = 0; index < this.graficoAssessor.length; index++) {
                this.graficoAssessorValor.push(this.graficoAssessor[index].valor)
            }
            this.formarGraficoAssessor(this.graficoAssessorLabel, this.graficoAssessorValor)

        })

        axios.get(process.env.VUE_APP_ROOT_API + '/cliente/?where={"ativo":1}&limit=2000000').then(response => {
            this.qtdCliente = response.data.length

            axios.get(process.env.VUE_APP_ROOT_API + '/retorna_total_movimentacao?id_situacao_movimentacao=' + 7).then(response => {
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
                            class: 'fonte-valor',
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
        /*
        axios.get(process.env.VUE_APP_ROOT_API + '/limite_movimentacao').then(response => {
            this.valorInvestimento = this.formatarMoeda(response.data)
            this.statsGeral = [{
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
        */

        axios.get('https://economia.awesomeapi.com.br/all/USD-BRL,EUR-BRL,BTC-BRL').then(response => {

            this.cotacao = response.data
            this.statsCotacao = [{
                    type: 'warning',
                    icon: 'nc-icon nc-globe',
                    title: 'Dólar ',
                    value: this.cotacao.USD.ask,
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
        formarGraficoPie(label, valor) {

            this.activityChartOffice = {
                data: {
                    labels: label,
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
        formarGraficoAssessor(label, valor) {

            this.activityChartAssessor = {
                data: {
                    labels: label,
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

        /*
        formatarMoeda(valor1) {

            var valor = valor1

            if (valor) {

                valor = valor + ''
                valor = parseInt(valor.replace(/[\D]+/g, ''))
                valor = valor + ''
                valor = valor.replace(/([0-9]{2})$/g, ",$1")
                valor = "R$ " + valor.split(/(?=(?:...)*$)/).join('.')
                if (valor.length > 6) {
                    valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2")
                    valor = valor.replace('.,', ',')
                }
                return valor
            }
            return '0,00'
        },
        */
        formatarMoedaNumber(valor) {

            if (valor) {
                var numero = valor.toFixed(2)
                return Math.floor(numero)
            }
            return 0.00
        },

    }
}
</script>

<style>
.fonte-valor {
    font-size: 70%
}
</style>
