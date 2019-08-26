var express = require('express');

var hostname = 'localhost';
var port = 5000;

var app = express();

var  cors  = require('cors')
var fs = require('fs');
var http = require('http').createServer(app)
var io = require('socket.io')(http)
var listProduct = JSON.parse(fs.readFileSync('Products.json', 'utf8'));

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send({message : "Liste des Produits", produits: listProduct, methode : req.method});
    return res.status(200);
})

app.post('/new/', function (req, res) {

    console.log(req.body)
    var name = req.body.name;
    var type = req.body.type;
    var price = req.body.price;
    var rating = req.body.rating;
    var warranty_years = req.body.warranty_years;
    var avaible = req.body.available;

    var id = 0;
    listProduct.forEach(function(element, index) {
        if (id <= element._id) {
            id = element._id + 1;
        }
    });
    listProduct.push({_id: id, name: name, type: type, price: price, rating: rating, warranty_years: warranty_years, avaible: avaible})
    listProduct = listProduct
    res.send({message : "Produits ajouté", produits: listProduct, methode : req.method})
    return res.status(200);
})

app.put('/modification/:id', function (req, res) {

    var id = req.params.id;

    listProduct.forEach(function(element, index) {
        if (id == element._id) {
            element.name = req.body.name;
            element.type = req.body.type;
            element.price = req.body.price;
            element.rating = req.body.rating;
            element.warranty_years = req.body.warranty_years;
            element.avaible = req.body.available;
        }
    });
    listProduct = listProduct
    res.send({message : "Produits modifié", produits: listProduct, methode : req.method})
    return res.status(200);
})
app.delete('/delete/:id', function (req, res) {

    var id = req.params.id;

    listProduct.forEach(function(element, index) {
        if (id == element._id) {
            listProduct.splice(index, 1)
            listProduct = listProduct
        }
    });
    res.send({message : "Produits supprimé", id_product: id, produits: listProduct, methode : req.method})
    return res.status(200);
})

io.on('connection', function(socket){
    socket.on('list product', function(msg){
        io.emit('list product', listProduct)
    })
})

http.listen(port, hostname, function(){
});
