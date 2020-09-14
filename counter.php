<?php

//Criar as constantes com as credencias de acesso ao banco de dados
//define('HOST', 'bdhost0083.servidorwebfacil.com');
define('HOST', 'srv238.prodns.com.br');
define('USER', 'curadori_user');
define('PASS', 'Folowme123@');
define('DBNAME', 'curadori_api');

//Criar a conexão com banco de dados usando o PDO e a porta do banco de dados
//Utilizar o Try/Catch para verificar a conexão.
try {
    $conn = new pdo('mysql:host=' . HOST . ';dbname=' . DBNAME, USER, PASS);
    //echo "Conexão com banco de dados realizada com sucesso.";
} catch (PDOException $e) {
    echo "Erro: Conexão com banco de dados não foi realizada com sucesso. Erro gerado " . $e->getMessage();
}


$data = [
    'ip' => $_GET['ip'],
    'url' => $_GET['url'],
];
$sql = "INSERT INTO access (ip, url) VALUES (:ip, :url)";
$stmt= $conn->prepare($sql);
$stmt->execute($data);

