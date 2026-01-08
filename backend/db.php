<?php
$conn = new mysqli("localhost", "root", "", "mini_crm");

if ($conn->connect_error) {
  die("Errore connessione al database");
}