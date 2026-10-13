<?php
// Portfolio contact form endpoint.
// Replace the recipient address before production use.
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'POST only']);
    exit;
}

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => '入力内容を確認してください。']);
    exit;
}

$to = 'hello@example.com';
$subject = 'Portfolioからのお問い合わせ';
$body = "お名前: {$name}\nメール: {$email}\n\n{$message}";
$headers = "From: {$email}\r\nReply-To: {$email}\r\n";

$sent = mail($to, $subject, $body, $headers);

if (!$sent) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'message' => '送信設定を確認してください。']);
    exit;
}

echo json_encode(['ok' => true, 'message' => 'お問い合わせを送信しました。']);
