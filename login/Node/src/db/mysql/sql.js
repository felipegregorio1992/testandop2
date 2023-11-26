const mysql = require("mysql2/promise");


CONNECTION_STRING='mysql://root:5aD-E1cA42d-e-DE32-1e51BH3bFEBFa@viaduct.proxy.rlwy.net:10476/railway'
const client = mysql.createPool(CONNECTION_STRING);

async function selectCustomers(){
    const results = await client.query('SELECT * FROM Cliente;');
    return results[0];
}

async function selectCustomer(id){
    const results = await client.query('SELECT * FROM Cliente WHERE id = ?;', [id]);
    return results[0];
}

async function insertCustomer(customer){
    await client.query('INSERT INTO Cliente (nome, senha, cpf, email, telefone, endereco, cidade, estado, cep) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);', [customer.nome, customer.senha, customer.cpf, customer.email, customer.telefone, customer.endereco, customer.cidade, customer.estado, customer.cep]);
}

async function updateCustomer(id, customerNew){
    await client.query('UPDATE Cliente SET nome=?, senha=?, cpf=?, email=?, telefone=?, endereco=?, cidade=?, estado=?, cep=? WHERE id = ?;', [ customerNew.nome, customerNew.senha, customerNew.cpf, customerNew.email, customerNew.telefone, customerNew.endereco, customerNew.cidade,
        customerNew.estado, customerNew.cep, id]);
}


async function updateValor(id, customerNew) {
    try {
      // Verifique se há um valor no campo "pagamento"
      if (customerNew.pagamento === null || customerNew.pagamento === undefined || customerNew.pagamento.trim() === '') {
        throw new Error('O campo "pagamento" não pode ser vazio.');
      }
  
      await client.query('UPDATE Cliente SET pagamento=? WHERE id = ?;', [customerNew.pagamento, id]);
    } catch (error) {
      console.error('Erro ao atualizar valor:', error);
      throw error;
    }
  }
  



async function deleteCustomer(id){
    await client.query('DELETE FROM Cliente WHERE id = ?;', [id]);
}

async function loginCustomer(email, senha){ //query é para buscar
    const results = await client.query('SELECT * FROM Cliente WHERE email = ? AND senha = ?;', [email, senha]); 
    return results[0];
}

module.exports = {
    selectCustomers,
    selectCustomer,
    insertCustomer,
    updateCustomer,
    deleteCustomer,
    loginCustomer,
    updateValor
};