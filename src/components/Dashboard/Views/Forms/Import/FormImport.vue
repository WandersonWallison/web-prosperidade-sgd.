<template>
<div class="card">
    <form>
        <div class="card-header">
            <h4 class="card-title">
                Comissionamento
            </h4>
        </div>
        <div class="card-body">
            <div class="col-lg-6">
                <el-date-picker v-model="model.data_ref" type="date" placeholder="Data Referência" :picker-options="pickerOptions1" format="dd/MM/yyyy">
                </el-date-picker>
            </div>
            <br>
            <div class="col-lg-6">
                <el-input type="textarea" :rows="2" placeholder="Descrição" v-model="model.descricao">
                </el-input>
            </div>
            <br>
            <div class="col-lg-6">
                <input ref="excel-upload-input" class="form-input" type="file" accept=".xlsx, .xls" @change="handleClick">
           </div>
                <!-- <div @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
      <md-button class="md-raised md-primary" name="importador" :loading="loading" style="margin-left:10px; cursor:pointer;" size="mini" type="primary" @click="handleUpload">Importador de Lead</md-button>
    </div>-->
                <span>{{this.arquivo}}</span>
                <div class="loading-overlay2" v-if="loading">
                    <md-progress-spinner :md-stroke='4'></md-progress-spinner>
                </div>
                <div>
                    <md-content>
                        <ul id="leadsError">
                            <li v-for="item in leadsError" v-bind:key="item.nome">
                                <label>Registro não importado: {{ item }}</label>
                            </li>
                        </ul>
                    </md-content>
                </div>
            </div>
            <div class="card-footer text-right" v-if="carregado == false">
                <p-button type="info" @click.prevent="importarLeads">Importar</p-button>
            </div>
    </form>
    <!-- inicio da lista -->

    <div class="card-header">
        <div class="category">Arquivos importados</div>
    </div>
    <div class="card-body row">
        <div class="col-sm-6">
            <el-select class="select-default" v-model="pagination.perPage" placeholder="Per page">
                <el-option class="select-default" v-for="item in pagination.perPageOptions" :key="item" :label="item" :value="item">
                </el-option>
            </el-select>
        </div>
        <div class="col-sm-6">
            <div class="pull-right">
                <fg-input class="input-sm" placeholder="Pesquisar" v-model="searchQuery">
                </fg-input>
            </div>
        </div>
        <div class="col-sm-12 mt-2">
            <el-table class="table-striped" empty-text="Carregando..." :data="queriedData" border style="width: 100%">
                <el-table-column v-for="column in tableColumns" :key="column.label" :min-width="column.minWidth" :prop="column.prop" :label="column.label">
                </el-table-column>
                <el-table-column :min-width="120" fixed="right" class-name="td-actions" prop="data_ref" :formatter="dateFormat" label="Data Referência">
                </el-table-column>
                <el-table-column :min-width="80" fixed="right" class-name="td-actions" label="Ações">
                    <template slot-scope="props">
                        <!--<el-tooltip content="download" placement="top">
                    <p-button type="info" size="sm" icon @click="handleRegister(props.$index, props.row)">
                    <i class="fa fa-download"></i>
                    </p-button>
                  </el-tooltip>-->
                        <el-tooltip content="detalhes" placement="top">
                            <p-button type="primary" size="sm" icon @click="handleDetails(props.$index, props.row)">
                                <i class="fa fa-info"></i>
                            </p-button>
                        </el-tooltip>
                        <!--<el-tooltip content="validar" placement="top">
                    <p-button type="success" size="sm" icon @click="handleDelete(props.$index, props.row)">
                    <i class="fa fa-check"></i>
                    </p-button>
                  </el-tooltip>-->
                        <el-tooltip content="processar" placement="top">
                            <p-button type="warning" size="sm" icon @click="handleProcess(props.$index, props.row)">
                                <i class="fa fa-cog"></i>
                            </p-button>
                        </el-tooltip>
                        <el-tooltip content="excluir" placement="top">
                            <p-button type="danger" size="sm" icon @click="handleDelete(props.$index, props.row)">
                                <i class="fa fa-trash"></i>
                            </p-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="col-sm-6 pagination-info">
            <p class="category">Mostrando {{from + 1}} para {{to}} de {{total}} Entradas</p>
        </div>
        <div class="col-sm-6">
            <p-pagination class="pull-right" v-model="pagination.currentPage" :per-page="pagination.perPage" :total="pagination.total">
            </p-pagination>
        </div>
    </div>
    <!--<md-dialog :md-active.sync="showDetails">
        <div class="div">
            <liste-itens :selected="selected"></liste-itens>
        </div>
    </md-dialog>-->
</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import swal from 'sweetalert2'
import moment from 'moment'
import XLSX from 'xlsx'

// import ListeItens from './ListItens.vue'
// import {Table, TableColumn, Select, Option} from 'element-ui'
import {
    Table,
    TableColumn,
    DatePicker,
    TimeSelect,
    Slider,
    Tag,
    Input,
    Button,
    Select,
    Option,
    Upload
} from 'element-ui'
import PPagination from 'src/components/UIComponents/Pagination.vue'
import users from './users'
import { color } from 'd3';
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Select)
Vue.use(Option)
export default {
    components: {
        PPagination,
        // ListeItens,
        [DatePicker.name]: DatePicker,
    },
    props: {
        beforeUpload: Function, // eslint-disable-line
        onSuccess: Function, // eslint-disable-line
        // selected: []
    },
    data() {
        return {
            pickerOptions1: {
                shortcuts: [{
                        text: 'Hoje',
                        onClick(picker) {
                            picker.$emit('pick', new Date())
                        }
                    },
                    {
                        text: 'Ontem',
                        onClick(picker) {
                            const date = new Date()
                            date.setTime(date.getTime() - 3600 * 1000 * 24)
                            picker.$emit('pick', date)
                        }
                    },
                    // {
                    //     text: 'Uma semana atrás',
                    //     onClick(picker) {
                    //         const date = new Date()
                    //         date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                    //         picker.$emit('pick', date)
                    //     }
                    // }
                ]
            },
            model: {
                data_ref: '',
                descricao: '',
                id_comissionamento: ''
            },
            resp: [],
            pagination: {
                perPage: 5,
                currentPage: 1,
                perPageOptions: [5, 10, 25, 50],
                total: 0
            },
            searchQuery: '',
            propsToSearch: ['nome_arquivo', 'descricao', 'mensagem'],
            tableColumns: [{
                    prop: 'nome_arquivo',
                    label: 'Nome do Arquivo',
                    minWidth: 80
                },
                {
                    prop: 'descricao',
                    label: 'Descricao',
                    minWidth: 150
                },
                {
                    prop: 'mensagem',
                    label: 'status',
                    minWidth: 80
                }
            ],
            showDetails: false,
            carregado: true,
            tableData: [],
            loading: false,
            excelData: {
                header: null,
                results: null
            },
            fullscreenLoading: false,
            userAtual: null,
            erroUsuarios: [],
            arquivo: null,
            leadsError: [],
            valor_importacao: null
        }
    },
    computed: {
        pagedData() {
            return this.tableData.slice(this.from, this.to)
        },
        queriedData() {
            if (!this.searchQuery) {
                this.pagination.total = this.tableData.length
                return this.pagedData
            }
            let result = this.tableData
                .filter((row) => {
                    let isIncluded = false
                    for (let key of this.propsToSearch) {
                        let rowValue = row[key].toString()
                        if (rowValue.includes && rowValue.includes(this.searchQuery)) {
                            isIncluded = true
                        }
                    }
                    return isIncluded
                })
            this.pagination.total = result.length
            return result.slice(this.from, this.to)
        },
        to() {
            let highBound = this.from + this.pagination.perPage
            if (this.total < highBound) {
                highBound = this.total
            }
            return highBound
        },
        from() {
            return this.pagination.perPage * (this.pagination.currentPage - 1)
        },
        total() {
            this.pagination.total = this.tableData.length
            return this.tableData.length
        }
    },
    mounted() {
        this.atualilarLista()
    },
    methods: {
        dateFormat(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("DD/MM/YYYY")
        },
        atualilarLista() {

            axios.get(process.env.VUE_APP_ROOT_API + '/comissionamento?where={"ativo": 1}').then(response => {
                this.tableData = response.data
            })
        },
        handleProcess(index, row) {
            axios.get(process.env.VUE_APP_ROOT_API + '/valida_comissionamento?comissionamento_id=' + row.id + '&' + 'user_id=' + row.id_responsavel).then(response => {
                    this.mensagem = response.data
                    swal('Bom trabalho!', 'Arquivo processado com sucesso!', 'success')
                })
                .catch(error => {
                    //this.leadsError.push(error.response.config.data)
                    // console.log('Erro do Axios ', error.response.config.data)
                    swal('Algo de errado!', 'Verifique o arquivo importado!', 'error')
                })
        },
        handleRegister(index, row) {
            alert(`Arquivo ainda não disponível ${row.nome_arquivo} para download !`)
        },
        handleDetails(index, row) {
            window.localStorage.setItem('comissionamento', row.id)
            this.$router.push('/forms/Itens')
            // this.showDetails = true
            //this.selected = row.id
        },
        handleEdit(index, row) {
            alert(`Your want to edit ${row.name}`)
        },
        handleDelete(index, row) {
            let comissionamento = {
                ativo: false
            };
            axios
                .put(process.env.VUE_APP_ROOT_API + "/comissionamento/" + row.id, comissionamento)
                .then(response => {
                    this.results = response.data
                    swal('Bom trabalho!', `Arquivo ${row.nome_arquivo} Excluído com sucesso!`, 'success')
                    //this.$router.push("/forms/CentralList");
                    this.atualilarLista()
                })
                .catch(error => {
                    alert(error.response);
                    console.log(error.response.data);
                });
        },
        generateData({
            header,
            results
        }) {
            this.excelData.header = header
            this.excelData.results = results
            this.onSuccess && this.onSuccess(this.excelData)
            if (this.excelData.results.length > 0) {
                this.loading = true
                this.carregado = false
                // this.tableData = this.excelData.results
                // this.importarLeads()
            } else {
                alert('Arquivo sem imformações para importação')
                this.arquivo = ''
            }
        },
        handleDrop(e) {
            e.stopPropagation()
            e.preventDefault()
            if (this.loading) return
            const files = e.dataTransfer.files
            if (files.length !== 1) {
                this.$message.error('Only support uploading one file!')
                return
            }
            const rawFile = files[0] // only use files[0]
            if (!this.isExcel(rawFile)) {
                this.$message.error('Only supports upload .xlsx, .xls, .csv suffix files')
                return false
            }
            this.upload(rawFile)
            e.stopPropagation()
            e.preventDefault()
        },
        handleDragover(e) {
            e.stopPropagation()
            e.preventDefault()
            e.dataTransfer.dropEffect = 'copy'
        },
        handleUpload() {
            this.$refs['excel-upload-input'].click()
        },
        handleClick(e) {
            const files = e.target.files
            const rawFile = files[0] // only use files[0]
            // console.log(rawFile)
            if (!rawFile) return
            this.upload(rawFile)
        },
        upload(rawFile) {
            this.arquivo = this.editarNomeArquivo(this.$refs['excel-upload-input'].value)
            this.$refs['excel-upload-input'].value = null // fix can't select the same excel
            if (!this.beforeUpload) {
                this.readerData(rawFile)
                return
            }
            const before = this.beforeUpload(rawFile)
            if (before) {
                this.readerData(rawFile)
            }
        },
        readerData(rawFile) {
            this.loading = true
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onload = e => {
                    const data = e.target.result
                    const workbook = XLSX.read(data, {
                        type: 'array'
                    })
                    const firstSheetName = workbook.SheetNames[0]
                    this.valor_importacao = firstSheetName
                    const worksheet = workbook.Sheets[firstSheetName]
                    const header = this.getHeaderRow(worksheet)
                    const results = XLSX.utils.sheet_to_json(worksheet)
                    this.generateData({
                        header,
                        results
                    })
                    this.loading = false
                    resolve()
                }
                reader.readAsArrayBuffer(rawFile)
            })
        },
        getHeaderRow(sheet) {
            const headers = []
            const range = XLSX.utils.decode_range(sheet['!ref'])
            let C
            const R = range.s.r
            /* start in the first row */
            for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
                const cell = sheet[XLSX.utils.encode_cell({
                    c: C,
                    r: R
                })]
                /* find the cell in the first row */
                let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
                if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
                // hdr = hdr.replace(' ', '') // Remove tudos os espaços
                headers.push(hdr)
            }
            return headers
        },
        isExcel(file) {
            return /\.(xlsx|xls|csv)$/.test(file.name)
        },
        separar(base, max) {
            var res = [];

            for (var i = 0; i < base.length; i = i + (max)) {
                res.push(base.slice(i, (i + max)));
            }
            res[res.length - 1].push(base[0]);
            return res;
        },

        importarLeads() {
            let newItem = {
                data_ref: this.model.data_ref,
                descricao: this.model.descricao,
                nome_arquivo: this.arquivo,
                status: '0',
                mensagem: 'Novo'
            }
            axios.post(process.env.VUE_APP_ROOT_API + '/comissionamento', newItem)
                .then(response => {
                    this.resp = response.data
                    // this.excelData.id = response.data.id
                    var grupos = this.separar(this.excelData.results, 1000)
                    console.log(grupos.length)
                    for (let a = 0; a < grupos.length; a++) {
                        let newImport = {
                            itens: grupos[a],
                            id: this.resp.id
                        }
                        axios.post(process.env.VUE_APP_ROOT_API + '/insert_arquivo', newImport)
                            .then(response => {})
                            .catch(error => {
                                //this.leadsError.push(error.response.config.data)
                                // console.log('Erro do Axios ', error.response.config.data)
                            })
                        setTimeout(function () {
                            console.log("feito");
                        }, 600000)

                    }
                    /*axios.post(process.env.VUE_APP_ROOT_API + '/insert_arquivo', newImport)
                        .then(response => {})
                        .catch(error => {
                            //this.leadsError.push(error.response.config.data)
                            // console.log('Erro do Axios ', error.response.config.data)
                        })
*/
                    // this.loading = false
                    this.atualilarLista()
                    this.openFullScreen()
                })
            this.arquivo = ''
            // alert('Importação realizada com sucesso !!!')
            // swal('Bom trabalho!', 'Importação realizada com sucesso!', 'success')
        },
        openFullScreen() {
            const loading = this.$loading({
                lock: true,
                text: 'Importando Arquivo',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            setTimeout(() => {
                loading.close();
            }, 120000);
        },
        maskFone: function (v) {
            if (v) {
                v = v.replace(/\D/g, '') // Remove tudo o que nÃ£o Ã© dÃ­gito
                v = v.replace(/^(\d{2})(\d)/g, '($1) $2') // Coloca parÃªnteses em volta dos dois primeiros dÃ­gitos
                v = v.replace(/(\d)(\d{4})$/, '$1-$2') // Coloca hÃ­fen entre o quarto e o quinto dÃ­gitos
            }
            return v
        },
        retiraMascara(campo) {
            // console.log(campo.lenght)
            if (campo.lenght > 11) {
                campo = campo.replace(' ', '') // remover espa�os
                campo = campo.replace(/\D/g, '') // Remove tudo o que nÃ£o Ã© dÃ­gito
            }
            return campo
        },
        removeAcento(text) {
            text = text.replace(' ', '')
            text = text.replace(' ', '')
            text = text.replace(' ', '')
            text = text.replace(' ', '')
            text = text.replace(' ', '')
            text = text.toLowerCase()
            text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
            text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
            text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
            text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
            text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
            text = text.replace(new RegExp('[Ç]', 'gi'), 'c');
            text = text.substring(0, 12)
            return text
        },
        editarNomeArquivo(text) {
            text = text.substring(12, text.length)
            return text
        },
        removerEspacos(campo) {
            campo = campo.replace(' ', '')
            campo = campo.replace(' ', '')
            campo = campo.replace(' ', '')
            campo = campo.replace(' ', '')
            campo = campo.replace(' ', '')
            return campo
        }
    }
}
</script>

<style lang="scss">
.excel-upload-input {
    display: none;
    z-index: -9999;
}

.drop {
    border: 2px dashed #bbb;
    width: 600px;
    height: 160px;
    line-height: 160px;
    margin: 0 auto;
    font-size: 24px;
    border-radius: 5px;
    text-align: center;
    color: #bbb;
    position: relative;
}

.div {
    overflow: scroll;
}

.el-table .td-actions {
    button.btn {
        margin-right: 5px;
    }
}
</style>
