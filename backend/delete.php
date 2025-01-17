<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include 'config.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->id)) {
    $id = $data->id;

    $stmt = $pdo->prepare("DELETE FROM foods WHERE id = ?");
    $stmt->execute([$id]);

    echo json_encode(["message" => "Makanan berhasil dihapus"]);
} else {
    echo json_encode(["message" => "ID tidak ditemukan"]);
}
?>