var ep = require('express')
var app = ep()
var port1 = 8081
var port2 = 8082

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port1, ()=> console.log(`Running on ${port1}`))
app.listen(port2, ()=> console.log(`Running on ${port2}`))

