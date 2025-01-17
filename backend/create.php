<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'config.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->name) && isset($data->description) && isset($data->remaining) && isset($data->price)) {
    $stmt = $pdo->prepare("INSERT INTO foods (name, description, remaining, price) VALUES (?, ?, ?, ?)");
    $stmt->execute([$data->name, $data->description, $data->remaining, (int)$data->price]); // Cast to int
    echo json_encode(["message" => "Food added successfully"]);
}
?>