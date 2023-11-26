const express = require('express');
const jwt = require('jsonwebtoken');
const Router = express();
const db = require('../../db/mysql/sql');
const bodyParser = require('body-parser');

Router.use(bodyParser.json());

Router.use(bodyParser.urlencoded({ extended:true }));


Router.delete("/clientes/:id", (req, res) => { //delete é para deletar
    const id = parseInt(req.params.id);
    db.deleteCustomer(id);
    res.sendStatus(204);
});

// Router.patch("/clientes/:id", async (req, res) => {  //patch é para atualizar apenas um campo
//     const id = parseInt(req.params.id);
//     const customer = req.body;
//     await db.updateCustomer(id, customer);
//     res.sendStatus(200);
// });

Router.patch("/clientes/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { pagamento } = req.body;

        // Adicione validações adicionais, se necessário
        if (typeof pagamento !== 'string' || pagamento.length === 0) {
            return res.status(400).json({ error: 'Campo de pagamento inválido.' });
        }

        await db.updateValor(id, { pagamento });
        res.sendStatus(200);
    } catch (error) {
        console.error('Erro ao atualizar valor:', error);
        res.status(500).json({ error: 'Erro ao atualizar valor.' });
    }
});

Router.post("/clientes", async (req, res) => {  //post é para inserir
    const customer = req.body;
    await db.insertCustomer(customer);
    res.sendStatus(201);
});

Router.get("/clientes/:id", async (req, res) => {  //get é para buscar por id
    const id = parseInt(req.params.id);
    const results = await db.selectCustomer(id);
    res.json(results); 
});

Router.get("/clientes", async (req, res) => {  //get é para buscar todos
    const results = await db.selectCustomers();
    res.json(results);
});

Router.post("/login", async (req, res) => {
    const { email, senha } = req.body;
    const results = await db.loginCustomer(email, senha);

    if (results.length === 0) {
        res.sendStatus(401);
        return;
    } 
    else {
        const id = results[0].id;
        const nome = results[0].nome;
        const pagamento = results[0].pagamento;
         
        res.status(200).json({id,  nome, pagamento }); // Inclua o nome na resposta
        return;
    }
});

//     req.session.login = email;
//     //res.render("logado");
//     res.redirect("/logado");
//     //res.json(results);
    
// });

// Router.get("/login", function(req, res){
//     res.sendFile(__dirname + "/login/login.html");
// });


Router.get("/cadastrar", function(req, res){
    res.sendFile(__dirname + "/login/registrar.html");
});

Router.get("/logado", function(req, res){
    if(req.session.login){
        res.sendFile(__dirname + "/login/logado.html");
    }else{
        res.redirect("/login");
    }
});

Router.get("/logout", function(req, res){
    req.session.destroy();
    res.redirect("/login");
});


Router.get("/teste", function(req, res){
    res.json([{'teste': 'teste'}])
});




// const users = [{
//     email: 'admin@gmail.com',
//     senha: '123456',
//     nome: 'felipe'
// }];

// Router.post("/loginn", (req, res) => {

//     const { email, senha } = req.body;

//     const user = users.find(user => user.email === email && user.senha === senha);

//     if (user) {

//         return res.status(200).json(user);
//     }

//     res.status(401).json({ message: 'Login inválido!' });

// });


module.exports = Router;

