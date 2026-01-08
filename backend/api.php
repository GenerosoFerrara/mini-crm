<?php
header("Content-Type: application/json");
require "db.php";

$result = $conn->query("SELECT * FROM clienti");
$clients = [];
while($row = $result->fetch_assoc()){
    $clients[] = $row;
}
echo json_encode($clients);
