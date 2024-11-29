<?php
// if(empty($_POST['name']) || empty($_POST['subject']) || empty($_POST['message']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
//   http_response_code(500);
//   exit();
// }

// $name = strip_tags(htmlspecialchars($_POST['name']));
// $email = strip_tags(htmlspecialchars($_POST['email']));
// $m_subject = strip_tags(htmlspecialchars($_POST['subject']));
// $message = strip_tags(htmlspecialchars($_POST['message']));

// $to = "keyurvadsak6@gmail.com"; // Change this email to your //
// $subject = "$m_subject:  $name";
// $body = "You have received a new message from your website contact form.\n\n"."Here are the details:\n\nName: $name\n\n\nEmail: $email\n\nSubject: $m_subject\n\nMessage: $message";
// $header = "From: $email";
// $header .= "Reply-To: $email";	

// if(!mail($to, $subject, $body, $header))
//   http_response_code(500);
?>
<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $subject = htmlspecialchars(trim($_POST['subject']));
    $message = htmlspecialchars(trim($_POST['message']));

    if (!empty($name) && !empty($email) && !empty($message) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $mail = new PHPMailer(true);
        try {
            // Server settings
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com'; // Replace with your SMTP server
            $mail->SMTPAuth = true;
            $mail->Username = 'moradiyanamra@gmail.com'; // SMTP username
            $mail->Password = 'Namra@1003';         // SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            // Recipients
            $mail->setFrom('moradiyanamra@gmail.com', 'Website Contact');
            $mail->addAddress('moradiyanamra@gmail.com');

            // Content
            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body    = "Name: $name<br>Email: $email<br>Message: $message";

            $mail->send();
            http_response_code(200);
            echo "Message sent successfully.";
        } catch (Exception $e) {
            http_response_code(500);
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    } else {
        http_response_code(400);
        echo "Invalid input.";
    }
} else {
    http_response_code(405);
    echo "Method not allowed.";
}
?>
