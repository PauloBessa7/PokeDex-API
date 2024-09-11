
import express,{Request, Response} from 'express' // chama a biblioteca do express

const app = express(); // cria um aplicação express , onde vamos poder manipula-la com as funções do express

app.set('view engine','ejs') // seta uma engine/arquivo de visualizacao no caso o ejs
app.set('views','./src/views')// seta o caminho de nossas visualizações -> pasta views no caminho ./src/views

app.get('/', (req : Request, resp : Response) => { // uma requisicao get no localhost

    fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0") // consultando a api do pokeapi
    .then((value) => {
        return value.json() // recebemos um objeto xml que deve ser convertido em json para o js conseguir manipular
    })
    .then((data) => {
        resp.render('index', data) // passamos nosso objeto "data" para o arquivo de renderização "index"  (ele vai procura esse index no set que visemos anteriormente)
        // usamo o metodo render para isso
    })

})

/* Nessa função estamos novamente consumindo uma api para passar um objeto para nossa pagina TelaPokemon */
app.get('/pokemon/:name', (req : Request, resp : Response) => {

    fetch(`https://pokeapi.co/api/v2/pokemon/${req.params.name}`)

    .then((value) => {
        return value.json()
    })
    .then((data) => {
        resp.render('TelaPokemon', { pokemon : data})
    })

})

app.listen(3000, () => { // colocamos para a porta localhost 3000 a receber funcionar nossa aplicacao
    console.log('Servidor no ar')
})