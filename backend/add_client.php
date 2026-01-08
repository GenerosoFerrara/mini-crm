<?php
header("Content-Type: application/json");
require "db.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = $_POST['nome'] ?? '';
    $email = $_POST['email'] ?? '';

    if ($nome && $email) {
        $stmt = $conn->prepare("INSERT INTO clienti (nome, email) VALUES (?, ?)");
        $stmt->bind_param("ss", $nome, $email);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Cliente aggiunto"]);
        } else {
            echo json_encode(["success" => false, "message" => "Errore DB"]);
        }
        $stmt->close();
    } else {
        echo json_encode(["success" => false, "message" => "Dati mancanti"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Metodo non consentito"]);
}
