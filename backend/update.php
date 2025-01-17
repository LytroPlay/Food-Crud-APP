<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type");

include 'config.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->id) && isset($data->name) && isset($data->description) && isset($data->remaining) && isset($data->price)) {
    $stmt = $pdo->prepare("UPDATE foods SET name = ?, description = ?, remaining = ?, price = ? WHERE id = ?");
    $stmt->execute([$data->name, $data->description, $data->remaining, (int)$data->price, $data->id]); // Cast to int
    echo json_encode(["message" => "Food updated successfully"]);
}
?>