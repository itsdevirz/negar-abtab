<?php
// PHP Video Deleter for Static Host (public_html)
// Removes specified video file from /public_html/uploads/ directory

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get input parameter
$fileParam = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if ($input && !empty($input['file'])) {
        $fileParam = $input['file'];
    } else if (!empty($_POST['file'])) {
        $fileParam = $_POST['file'];
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'GET' && !empty($_GET['file'])) {
    $fileParam = $_GET['file'];
}

if (empty($fileParam)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "پارامتر نام فایل ارسال نشده است"]);
    exit();
}

// Extract basename to prevent directory traversal attacks
$basename = basename($fileParam);
$targetFile = __DIR__ . '/uploads/' . $basename;

if (file_exists($targetFile) && is_file($targetFile)) {
    if (unlink($targetFile)) {
        http_response_code(200);
        echo json_encode([
            "success" => true,
            "message" => "فایل ویدئو با موفقیت از پوشه uploads هاست حذف گردید.",
            "file" => $basename
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "خطا در حذف فایل از روی هاست."
        ]);
    }
} else {
    // If file does not exist, return success so state clean-up continues
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "فایل روی هاست یافت نشد یا قبلاً حذف شده است.",
        "file" => $basename
    ]);
}
?>
