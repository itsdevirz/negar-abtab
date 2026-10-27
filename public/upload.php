<?php
// PHP Video Uploader for Static Host (public_html)
// Saves uploaded video files directly into /public_html/uploads/ directory

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method Not Allowed"]);
    exit();
}

// Ensure upload directory exists
$targetDir = __DIR__ . '/uploads/';
if (!file_exists($targetDir)) {
    mkdir($targetDir, 0755, true);
}

if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    $errorCode = isset($_FILES['file']) ? $_FILES['file']['error'] : 'No file uploaded';
    http_response_code(400);
    echo json_encode([
        "success" => false, 
        "message" => "خطا در دریافت فایل یا عدم انتخاب فایل (کد خطا: " . $errorCode . ")"
    ]);
    exit();
}

$file = $_FILES['file'];
$extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

// Allowed video extensions
$allowedExtensions = ['mp4', 'webm', 'mov', 'mkv', 'avi', 'ogg'];
if (!in_array($extension, $allowedExtensions)) {
    http_response_code(400);
    echo json_encode([
        "success" => false, 
        "message" => "فرمت فایل مجاز نیست. لطفاً ویدئو با فرمت MP4، WebM یا MOV انتخاب کنید."
    ]);
    exit();
}

// Generate unique clean filename
$cleanName = preg_replace("/[^a-zA-Z0-9_\-]/", "", pathinfo($file['name'], PATHINFO_FILENAME));
if (empty($cleanName)) {
    $cleanName = "video";
}
$newFileName = time() . "_" . $cleanName . "." . $extension;
$targetFilePath = $targetDir . $newFileName;

if (move_uploaded_file($file['tmp_name'], $targetFilePath)) {
    // Relative URL pointing to public_html/uploads/
    $publicUrl = "/uploads/" . $newFileName;
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "url" => $publicUrl,
        "filename" => $newFileName,
        "message" => "ویدئو با موفقیت در پوشه uploads هاست ذخیره گردید."
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false, 
        "message" => "خطا در انتقال و ذخیره‌سازی فایل روی هاست. دسترسی دسترسی دسترسی دسترسی دسترسی پوشه uploads را بررسی کنید."
    ]);
}
?>
