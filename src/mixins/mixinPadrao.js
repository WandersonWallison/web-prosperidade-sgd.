const mixinPadrao = {
    data(){
        return {
            nome: 'Wanderson',
            descricao: 'teste'
        }
    },
    methods: {
        validaRota (rota){
            const  links = window.localStorage.getItem('links')
            const parselink = JSON.parse(links)
            var ValidaLink = false
            for (let index = 0; index < parselink.length; index++) {
                if (rota === parselink[index].link) {
                  ValidaLink = true
                }
              }

            
            //this.id_empresa = userLogado.id_empresa
            return ValidaLink
        }
    }
}

export default mixinPadrao