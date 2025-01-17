<?php
header("Access-Control-Allow-Origin: *");
include 'config.php';

$stmt = $pdo->query("SELECT * FROM foods");
$foods = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($foods);
?>