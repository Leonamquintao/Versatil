const express = require('express')
const app = express()
const fs = require('fs')

const port = process.env.PORT || 3000

function read() {
  fs.readFile('ligacoes-2018-01-01.txt', 'utf8', (err, data) => {
    if (err) {
      console.log(err)
    }
    if(data) {
      generateOutput(data)
    }
  })
}

function generateOutput(dt) {
  var ddd = 0
  var output = []
  var result = []
  var out = dt.trim().split('\n')
  .filter((ret) => { return ret != 'DataHora;TelefoneOrigem;TelefoneDestino;Duracao'})
  .map(line => line.split(";"))

  out.forEach((item) => {
    output.push({ cliente: item[1], destino: item[2], duracao: parseInt(item[3]) })
  })

  output.forEach((it) => {
    if(it.cliente.substring(0, 2) != it.destino.substring(0, 2)) { ddd ++ }
    if(!this[it.cliente]) {
      this[it.cliente] = { cliente: it.cliente, duracao: 0 }
      result.push(this[it.cliente])
    }
    this[it.cliente].duracao += it.duracao
  }, Object.create(null))

  var qtde = [...new Set(output.map(a => a.cliente))]
  var durr = []
  result.forEach((it, i) => {
    durr.push(i + ": "+ it.duracao)
  })

  var txt = 'TOTAL DE CLIENTES QUE LIGARAM: ' + qtde.length + '\n'+
  'DURAÇÃO MEDIA: ' + durr + '\n' +
  'TOTAL CLIENTES LIGARAM OUTRO DDD: ' + ddd

  fs.writeFile('saida.txt', txt, (err) => {
    if(err) {
      console.log(err)
    } else {
      console.log('Arquivo gerado com sucesso!')
    }
  })
}

read()

app.listen(port, () => {
  let start = new Date()
  console.log('----------------------------------------------------')
  console.log(' Serverrunning in port: '+port+ '!')
  console.log(' start at : '+start)
  console.log('----------------------------------------------------')
})
