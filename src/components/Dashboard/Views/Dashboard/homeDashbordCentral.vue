<template>
<div>
    <!-- Cotação do Dólar, Euro, Criptomoeda   -->
    <el-row :gutter="12">
        <el-col :span="6">
            <el-card shadow="always">
                <div>
                    <img class="img-tamanho" src="https://img.icons8.com/color/48/000000/us-dollar--v2.png">
                    {{this.cotacaoUSDNome}} - {{this.cotacaoUSDValor}}
                </div>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card shadow="always">
                <div>
                    <img class="img-tamanho" src="https://img.icons8.com/ultraviolet/40/000000/us-dollar.png">
                    {{this.cotacaoUSDTNome}} - {{this.cotacaoUSDTValor}}
                </div>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card shadow="always">
                <div>
                    <img class="img-tamanho" src="https://img.icons8.com/ultraviolet/40/000000/euro-pound-exchange.png">
                    {{this.cotacaoEURNome}} - {{this.cotacaoEURValor}}
                </div>
            </el-card>
        </el-col>
        <el-col :span="6">

            <el-card shadow="always">
                <div>
                    <img class="img-tamanho" src="https://img.icons8.com/color/50/000000/bitcoin.png">
                    {{this.cotacaoBITNome}} - {{this.cotacaoBITValor}}
                </div>
            </el-card>
        </el-col>
    </el-row>

    <br>

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
        <div class="col-md-6">
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
    tooltipTitleFontSize: 10,
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
            tipo_situacaoLabel: [],
            tipo_situacaoValor: [],
            // Contação
            cotacao: [],
            // cotação Dollar
            cotacaoUSDNome: '',
            cotacaoUSDValor: '',
            // Cotação Dollar Turismo
            cotacaoUSDTNome: '',
            cotacaoUSDTValor: '',
            // Cotação EURO
            cotacaoEURNome: '',
            cotacaoEURValor: '',
            // Cotação BitCoin
            cotacaoBITNome: '',
            cotacaoBITValor: '',
            statsGeral: [],
            emailChart: []
        }
    },
    mounted() {

        const authUser = JSON.parse(window.localStorage.getItem("usuario"))
        this.carregaCotacaoDia()
        /**
         * @description: Retorna todos os somatorios dos status_movimentacao por valor de moviemento
         */
        axios.get(process.env.VUE_APP_ROOT_API + '/retorna_total_movimentacao').then(response => {
            this.tipo_situacao = response.data
            for (let index = 0; index < this.tipo_situacao.length; index++) {
                this.tipo_situacaoLabel.push(this.tipo_situacao[index].descricao)
                this.tipo_situacaoValor.push(this.tipo_situacao[index].valor_movimentacao)
            }
            this.carregaGraficoStatusXValor(this.tipo_situacaoLabel, this.tipo_situacaoValor)
        })
        // Gráfico de valores por escritorios
        axios.get(process.env.VUE_APP_ROOT_API + '/grafico_valor_escritorio').then(response => {

            this.graficoValorEscritorio = response.data
            for (let index = 0; index < this.graficoValorEscritorio.length; index++) {
                this.graficoValorEscritorioLabel.push(this.graficoValorEscritorio[index].nome)
                this.graficoValorEscritorioValor.push(this.graficoValorEscritorio[index].valor)
            }
            this.formarGraficoPie(this.graficoValorEscritorioLabel, this.graficoValorEscritorioValor)
        })
        // Grafico de valores por Assessores
        axios.get(process.env.VUE_APP_ROOT_API + '/grafico_assessor').then(response => {
            this.graficoAssessor = response.data
            for (let index = 0; index < this.graficoAssessor.length; index++) {
                this.graficoAssessorLabel.push(this.graficoAssessor[index].assessor)
                this.graficoAssessorValor.push(this.graficoAssessor[index].valor)
            }
            this.formarGraficoAssessor(this.graficoAssessorLabel, this.graficoAssessorValor)
        })
        axios.get(process.env.VUE_APP_ROOT_API + '/cliente/?where={"ativo":1}&limit=2000000').then(response => {
            this.qtdCliente = response.data.length

            axios.get(process.env.VUE_APP_ROOT_API + '/retorna_total?id_situacao_movimentacao=' + 7).then(response => {
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

    },

    methods: {
        carregaCotacaoDia() {

            axios.get('https://economia.awesomeapi.com.br/all/USD-BRL,USDT-BRL,EUR-BRL,BTC-BRL').then(response => {
                this.cotacao = response.data
                this.cotacaoUSDNome = this.cotacao.USD.name
                this.cotacaoUSDValor = this.cotacao.USD.ask
                this.cotacaoUSDTNome = this.cotacao.USDT.name
                this.cotacaoUSDTValor = this.cotacao.USDT.ask
                this.cotacaoBITNome = this.cotacao.BTC.name
                this.cotacaoBITValor = this.cotacao.BTC.ask
                this.cotacaoEURNome = this.cotacao.EUR.name
                this.cotacaoEURValor = this.cotacao.EUR.ask
            })
        },

        // Monta grafico VALOR vs. STATUS
        carregaGraficoStatusXValor(label, valor) {
            this.activityChart = {
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

.img-tamanho {
    width: 40px;
    height: 40px;
}
</style>
