<template>
<div>
    <!--  MRV  -->
    <div class="row">
        <div class=" col-lg-12 col-md-12">
          <el-card>
            <p class="fonte-quadros">MRV</p>
            <GChart type="ColumnChart" :data="chartData" :options="chartOptions" />
          </el-card>
        </div>
    </div>
    <br>
    <!-- Agregados -->
    <div class="row">
        <div class=" col-lg-4 col-md-4">
            <stats-card>
                <div type="success" class="icon-big text-center icon-warning" slot="header">
                    <i class="ti-server"></i>
                    <img src="https://img.icons8.com/color/48/000000/cash-.png">
                </div>
                <div class="numbers" slot="content">
                    <p class="fonte-quadros">VALOR EM BOLSA MRV PROSPERIDADE</p>
                    {{this.valorInvestimento}}
                </div>
                <div class="stats" slot="footer">
                    <i class="ti-reload"></i> Hoje
                </div>
            </stats-card>
            <stats-card>
                <div class="icon-big text-center icon-warning" slot="header">
                    <i class="ti-server"></i>
                    <img src="https://img.icons8.com/dusk/48/000000/bank-building.png">
                </div>
                <div class="numbers" slot="content">
                    <p class="fonte-quadros">VALOR DE BOLETAS EFETIVADAS</p>
                    {{this.valorBoletaEfetivada}}
                </div>
                <div class="stats" slot="footer">
                    <i class="ti-reload"></i> Hoje
                </div>
            </stats-card>
        </div>
        <div class=" col-lg-8 col-md-8">
            <!--  Valor Boleta / Efetivada  -->
            <el-card>
                <div>
                    <p class="fonte-quadros">VALOR DE BOLETAS / EFETIVADAS</p>
                    <GChart type="ColumnChart" :data="chartData1" :options="chartOptions1" />
                </div>
            </el-card>
        </div>
    </div>
    <div class="row">
        <div class=" col-lg-4 col-md-4">
            <stats-card>
                <div class="icon-big text-center icon-warning" slot="header">
                    <i class="ti-server"></i>
                    <img src="https://img.icons8.com/officel/48/000000/checked-user-male.png">
                </div>
                <div class="numbers" slot="content">
                    <p class="fonte-quadros">QTD CLIENTES CADASTRADOS</p>
                    {{this.qtdCliente.toString()}}
                </div>
                <div class="stats" slot="footer">
                    <i class="ti-reload"></i> Hoje
                </div>
            </stats-card>
            <stats-card>
                <div class="icon-big text-center icon-warning" slot="header">
                    <i class="ti-server"></i>
                    <img src="https://img.icons8.com/officel/48/000000/manager.png">
                </div>
                <div class="numbers" slot="content">
                    <p class="fonte-quadros">QTD ASSESSORES CADASTRADOS</p>
                    {{this.qtdAssessor.toString()}}
                </div>
                <div class="stats" slot="footer">
                    <i class="ti-reload"></i> Hoje
                </div>
            </stats-card>
        </div>
        <div class=" col-lg-8 col-md-8">
            <!--  Valor Boleta / Efetivada  -->
            <el-card>
                <div>
                    <p class="fonte-quadros">VALOR MEDIO / CLIENTES</p>
                    <GChart type="ColumnChart" :data="chartData2" :options="chartOptions2" />
                </div>
            </el-card>
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
import {
    GChart
} from 'vue-google-charts'

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
        TaskList,
        GChart
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
            valorBoletaEfetivada: '',
            qtdCliente: '',
            qtdAssessor: '',
            activityChart: [],
            activityChartAssessor: [],
            activityChartOffice: [],
            statsCards: [],
            statsCotacao: [],
            teste: [],
            tipo_situacao: [],
            tipo_situacaoLabel: [],
            tipo_situacaoValor: [],
            usuario: '',
            empresa: '',
            chartData: [
                ["Escritorio", "Junho", "julho", "Agosto"],
                ["São Paulo", 1000, 2000, 3000],
                ["Recife", 900, 1500, 2000],
                ["ABC", 600, 1120, 3000],
                ["Cuiabá", 1030, 1540, 1850]
            ],
            chartOptions: {
                chart: {
                    title: "Company Performance",
                    subtitle: "JANEIRO, FEVEREIRO, and MARÇO: 2014-2017"
                }
            },
            chartData1: [
                ["Escritorio", "Junho", "julho", "Agosto"],
                ["São Paulo", 50000, 100000, 250000],
                ["Recife", 10000, 46000, 130000],
                ["ABC", 25000, 34000, 40000],
                ["Cuiabá", 22000, 45000, 63000]
            ],
            chartOptions1: {
                chart: {
                    title: "Company Performance",
                    subtitle: "JANEIRO, FEVEREIRO, and MARÇO: 2014-2017"
                }
            },
            chartData2: [
                ["Escritorio", "Junho", "julho", "Agosto"],
                ["São Paulo", 8, 12, 18],
                ["Recife", 6, 8, 10],
                ["ABC", 3, 12, 20],
                ["Cuiabá", 5, 13, 18]
            ],
            chartOptions2: {
                chart: {
                    title: "Company Performance",
                    subtitle: "JANEIRO, FEVEREIRO, and MARÇO: 2014-2017"
                }
            }
        }
    },
    mounted() {

        const authUser = JSON.parse(window.localStorage.getItem("usuario"))
        // console.log('Usuario - ', authUser)

        this.empresa = '?empresa_id=' + authUser.id_empresa
        if (authUser.id_grupo !== 1) {
            this.usuario = '&user_id=' + authUser.id
        }
        this.retorna_total_movimentacao(this.usuario) // Retorna o Total das Movimentações
        this.grafico_valor_escritorio(this.usuario) // Grafico Valor x Escritorio
        this.grafico_assessor(this.usuario)
        this.limite_movimentacao(this.usuario)
        this.retorna_total(this.usuario)
        this.quantidade_clientes(this.usuario)
        this.quantidade_assessor(this.usuario, this.empresa)
    },

    methods: {
        // retorna_assessor_qtd?user_id=44&empresa_id=1
        quantidade_assessor(usuario, empresa) {
            axios.get(process.env.VUE_APP_ROOT_API + '/retorna_assessor_qtd' + empresa + usuario).then(response => {
                this.qtdAssessor = response.data[0].qtd
            })
        },
        quantidade_clientes(usuario) {
            axios.get(process.env.VUE_APP_ROOT_API + '/retorna_cliente_qtd' + usuario).then(response => {
                this.qtdCliente = response.data[0].qtd
            })
        },
        retorna_total(usuario) {
            if (usuario) {
                usuario = usuario.replace('?', '&')
            }
            axios.get(process.env.VUE_APP_ROOT_API + '/retorna_total?id_situacao_movimentacao=7' + usuario).then(response => {
                this.valorBoletaEfetivada = this.formatarMoeda(response.data)
            })
        },
        limite_movimentacao(usuario) {
            axios.get(process.env.VUE_APP_ROOT_API + '/limite_movimentacao' + usuario).then(response => {
                this.valorInvestimento = this.formatarMoeda(response.data)
            })
        },
        grafico_assessor(usuario) {
            // Grafico de valores por Assessores
            axios.get(process.env.VUE_APP_ROOT_API + '/grafico_assessor' + usuario).then(response => {
                this.graficoAssessor = response.data
                for (let index = 0; index < this.graficoAssessor.length; index++) {
                    this.graficoAssessorLabel.push(this.graficoAssessor[index].assessor)
                    this.graficoAssessorValor.push(this.graficoAssessor[index].valor)
                }
                this.activityChartAssessor = {
                    data: {
                        labels: this.graficoAssessorLabel,
                        datasets: [{
                            label: "Acumulado ",
                            borderColor: '#4682B4',
                            fill: true,
                            backgroundColor: '#4682B4',
                            hoverBorderColor: '#fcc468',
                            borderWidth: 2,
                            data: this.graficoAssessorValor
                        }]
                    }
                }
            })
        },
        grafico_valor_escritorio(usuario) {
            // Gráfico de valores por escritorios
            axios.get(process.env.VUE_APP_ROOT_API + '/grafico_valor_escritorio' + usuario).then(response => {

                this.graficoValorEscritorio = response.data
                for (let index = 0; index < this.graficoValorEscritorio.length; index++) {
                    this.graficoValorEscritorioLabel.push(this.graficoValorEscritorio[index].nome)
                    this.graficoValorEscritorioValor.push(this.graficoValorEscritorio[index].valor)
                }
                this.activityChartOffice = {
                    data: {
                        labels: this.graficoValorEscritorioLabel,
                        datasets: [{
                            label: "Acumulado ",
                            borderColor: '#4682B4',
                            fill: true,
                            backgroundColor: '#4682B4',
                            hoverBorderColor: '#fcc468',
                            borderWidth: 2,
                            data: this.graficoValorEscritorioValor
                        }]
                    }
                }
            })
        },
        retorna_total_movimentacao(usuario) {
            /**
             * @description: Retorna todos os somatorios dos status_movimentacao por valor de moviemento
             */
            axios.get(process.env.VUE_APP_ROOT_API + '/retorna_total_movimentacao' + usuario).then(response => {
                this.tipo_situacao = response.data
                for (let index = 0; index < this.tipo_situacao.length; index++) {
                    this.tipo_situacaoLabel.push(this.tipo_situacao[index].descricao)
                    this.tipo_situacaoValor.push(this.tipo_situacao[index].valor_movimentacao)
                }
                this.activityChart = {
                    data: {
                        labels: this.tipo_situacaoLabel,
                        datasets: [{
                            label: "Acumulado ",
                            borderColor: '#4682B4',
                            fill: true,
                            backgroundColor: '#4682B4',
                            hoverBorderColor: '#fcc468',
                            borderWidth: 1,
                            data: this.tipo_situacaoValor
                        }]
                    }
                }
            })
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
        }
    }
}
</script>

<style>
.img-tamanho {
    width: 40px;
    height: 40px;
}

.fonte-quadros {
    font-size: initial;
    color: darkgray;
}
</style>
