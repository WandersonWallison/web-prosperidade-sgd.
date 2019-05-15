<template>
<div class="card">
    <form>
        <div class="card-header">
            <h4 class="card-title">
                Importador
            </h4>
        </div>
        <div class="card-body">
        <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">Clique para carregar</el-button>
            <div slot="tip" class="el-upload__tip">arquivos xlxs com tamanho menor que 500kb</div>
        </el-upload>
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
import {mask} from 'vue-the-mask'
import moment from 'moment'
import XLSX from 'xlsx'

export default {
    props: {
        beforeUpload: Function, // eslint-disable-line
        onSuccess: Function// eslint-disable-line
    },
    data() {
        return {
             fileList: [],
            model: {
                nome: ''
            },
            excelData: {
                header: null,
                results: null
            },
            userAtual: null,
            erroUsuarios: [],
            arquivo: null,
            leadsError: [],
            valor_importacao: null,
            selects: {
            links: []
          }
        }      
    },
    mounted() {
    },
    directives: {mask},
    methods: {
        handleExceed(files, fileList) {
        // this.$message.warning(`The limit is 3, you selected ${files.length} files this time, add up to ${files.length + fileList.length} totally`);
        this.$message.warning(`Só pode ser selecionado um aquivo por vez!`)
      },
        getError(fieldName) {
            return this.errors.first(fieldName)
        },
        validate() {
            this.$validator.validateAll().then(isValid => {
                this.$emit('on-submit', this.salvar(), isValid)
            })
        },
        generateData ({ header, results }) {
            this.excelData.header = header
            this.excelData.results = results
            this.onSuccess && this.onSuccess(this.excelData)
            if (this.excelData.results.length > 0) {
                this.loading = true
                this.salvar()
                } else {
        alert('Arquivo sem informações para importação')
        this.arquivo = ''
      }
    },
    handleDrop (e) {
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
    handleDragover (e) {
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },
    handleUpload () {
      this.$refs['excel-upload-input'].click()
    },
    handleClick (e) {
      const files = e.target.files
      const rawFile = files[0] // only use files[0]
      if (!rawFile) return
      this.upload(rawFile)
    },
    upload (rawFile) {
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
    readerData (rawFile) {
      this.loading = true
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = e => {
          const data = e.target.result
          const workbook = XLSX.read(data, { type: 'array' })
          const firstSheetName = workbook.SheetNames[0]
          this.valor_importacao = firstSheetName
          const worksheet = workbook.Sheets[firstSheetName]
          const header = this.getHeaderRow(worksheet)
          const results = XLSX.utils.sheet_to_json(worksheet)
          this.generateData({ header, results })
          this.loading = false
          resolve()
        }
        reader.readAsArrayBuffer(rawFile)
      })
    },
    getHeaderRow (sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C
      const R = range.s.r
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    },
    isExcel (file) {
      return /\.(xlsx|xls|csv)$/.test(file.name)
    },
    salvar () {
      for (let i = 0; i < this.excelData.results.length; i++) {
        let newLead = {
          nome: this.excelData.results[i].Cliente,
          email: this.excelData.results[i].Email ? this.removerEspacos(this.excelData.results[i].Email) : this.removeAcento(this.excelData.results[i].Cliente) + this.retiraMascara(this.excelData.results[i].Celular) + '@importacao.com',
          telefone: this.excelData.results[i].Telefone,
          celular: this.excelData.results[i].Celular,
          numero_operadora: this.excelData.results[i].NumeroXP,
          data_criacao: moment(Date.now()).format(),
          id_user_criador: this.userAtual.id,
          id_office: this.userAtual.id_office,
          id_importacao: this.valor_importacao
        }

        try {
          axios.post(process.env.API + 'leads', newLead)
            .then(response => {
            })
            .catch(error => {
              this.leadsError.push(error.response.config.data)
              console.log('Erro do Axios ', error.response.config.data)
            })
        } catch (error) {
          console.log('Erro Try', error)
        }
      }
      this.loading = false
      this.arquivo = ''
      alert('Importação realizada com sucesso !!!')
    },
    maskFone: function (v) {
      if (v) {
        v = v.replace(/\D/g, '') // Remove tudo o que não é dígito
        v = v.replace(/^(\d{2})(\d)/g, '($1) $2') // Coloca parênteses em volta dos dois primeiros dígitos
        v = v.replace(/(\d)(\d{4})$/, '$1-$2') // Coloca hífen entre o quarto e o quinto dígitos
      }
      return v
    },
    retiraMascara (campo) {
      console.log(campo.lenght)
      if (campo.lenght > 11) {
        campo = campo.replace(' ', '') // remover espaços
        campo = campo.replace(/\D/g, '') // Remove tudo o que não é dígito
      }
      return campo
    },
    removeAcento (text) {
      text = text.replace(' ', '')
      text = text.replace(' ', '')
      text = text.replace(' ', '')
      text = text.replace(' ', '')
      text = text.replace(' ', '')
      text = text.toLowerCase()
      text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a')
      text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e')
      text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i')
      text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o')
      text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u')
      text = text.replace(new RegExp('[Ç]', 'gi'), 'c')
      text = text.substring(0, 12)
      return text
    },
    editarNomeArquivo (text) {
      text = text.substring(12, text.length)
      return text
    },
    removerEspacos (campo) {
      campo = campo.replace(' ', '')
      campo = campo.replace(' ', '')
      campo = campo.replace(' ', '')
      campo = campo.replace(' ', '')
      campo = campo.replace(' ', '')
      return campo
    }
    },

}
</script>

<style>
</style>
