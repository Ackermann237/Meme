<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES["image"])) {
    $targetDir = "upload/"; // Dossier de stockage
    $fileName = basename($_FILES["image"]["name"]); // Nom de l'image
    $targetFilePath = $targetDir . $fileName; // Chemin complet
    $imageFileType = strtolower(pathinfo($targetFilePath, PATHINFO_EXTENSION)); // Type du fichier

    // Vérification du format
    $allowedTypes = ["jpg", "jpeg", "png", "gif"];
    if (!in_array($imageFileType, $allowedTypes)) {
        echo json_encode(["success" => false, "message" => "Seuls les formats JPG, PNG et GIF sont autorisés."]);
        exit;
    }

    // Vérification si le dossier existe, sinon création
    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0777, true);
    }

    // Déplacement de l'image
    if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFilePath)) {
        echo json_encode(["success" => true, "image" => $targetFilePath]);
    } else {
        echo json_encode(["success" => false, "message" => "Erreur lors de l'upload."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Aucune image reçue."]);
}
?>
