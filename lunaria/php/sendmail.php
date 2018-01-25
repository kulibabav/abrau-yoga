<?
$subject = 'Обратный звонок ('.date("d.m.Y h:i").')';
$mail = '<p>Имя: '.htmlspecialchars($_POST['name']).'</p>
<p>Телефон: '.htmlspecialchars($_POST['phone']).'</p>
<p>Сообщение: '.htmlspecialchars($_POST['text']).'</p>';

$domain = "lunaria.ru";

$from = "no-reply@". $domain;
$headers = "From: " . $from . "\r\n";
$headers .= "Reply-To: ". $from . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

$success = mail("victor.kulibaba@gmail.com", $subject, $mail, $headers);
echo ($success) ? 'true' : 'false';
?>