
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('cert/selfsigned.key', 'utf8');
var certificate = fs.readFileSync('cert/selfsigned.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var ep = require('express')
var portList = "80,-,-"
var portList = portList.split(",")

let consulData = [
    {
        "ID": "93a9cc65-c740-231a-86b8-f9055d331191",
        "Node": "finapi-dev-01-f2aafb9b793066c3",
        "Address": "localhost",
        "Datacenter": "bk",
        "TaggedAddresses": {
            "lan": "10.118.161.29",
            "wan": "10.118.161.29"
        },
        "NodeMeta": {
            "consul-network-segment": ""
        },
        "ServiceKind": "",
        "ServiceID": "financeapi-service",
        "ServiceName": "financeapi-service",
        "ServiceTags": [],
        "ServiceAddress": "",
        "ServiceWeights": {
            "Passing": 1,
            "Warning": 1
        },
        "ServiceMeta": {},
        "ServicePort": 80,
        "ServiceEnableTagOverride": false,
        "ServiceProxyDestination": "",
        "ServiceProxy": {},
        "ServiceConnect": {},
        "CreateIndex": 32097590,
        "ModifyIndex": 32097590
    },{
        "ID": "93a9cc65-c740-231a-86b8-f9055d331191",
        "Node": "finapi-dev-01-f2aafb9b793066c3",
        "Address": "10.118.161.29",
        "Datacenter": "bk",
        "TaggedAddresses": {
            "lan": "10.118.161.29",
            "wan": "10.118.161.29"
        },
        "NodeMeta": {
            "consul-network-segment": ""
        },
        "ServiceKind": "",
        "ServiceID": "financeapi-service",
        "ServiceName": "financeapi-service",
        "ServiceTags": [],
        "ServiceAddress": "",
        "ServiceWeights": {
            "Passing": 1,
            "Warning": 1
        },
        "ServiceMeta": {},
        "ServicePort": 80,
        "ServiceEnableTagOverride": false,
        "ServiceProxyDestination": "",
        "ServiceProxy": {},
        "ServiceConnect": {},
        "CreateIndex": 32097590,
        "ModifyIndex": 32097590
    }]


const data = ["data 2","data 3","data 4"]

for (let i = 0; i< portList.length; i++) {

	let app = ep()
    httpServer = http.createServer(app)
    httpsServer = https.createServer(credentials , app)
	let k = portList[i]
    if(k!=='-'){
    	app.get('/*', (req, res) => {
        	console.log(req.originalUrl +" => " +req.connection.remoteAddress +" response:"+data[i])
    		res.send(data[i])	
    	} )
        app.post('/*', (req, res) => {
            console.log(req.originalUrl +" => " +req.connection.remoteAddress +" response:"+data[i])
            res.send(data[i])   
        } )
        let httpsPort = 443
    	httpsServer.listen(httpsPort, ()=> console.log(`Running on ${httpsPort}`))
        httpServer.listen(k, ()=> console.log(`Running on ${k}`))
    }
}


