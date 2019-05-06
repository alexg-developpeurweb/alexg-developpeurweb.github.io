<?php
    $destinataire = 'alexandregiel@gmail.com';
    // Adresse email du destinataire
    $user = $_POST['your-name'];
    $email = $_POST['your-email'];

    $sujet = $_POST['your-subject'];
    // Titre de l'email
    $message = $_POST['your-message'].'de : '.$user.'/'.$email;
    // Contenu du message de l'email
    mail($destinataire, $sujet, $message);
    // Fonction principale qui envoi l'email
    header('Location: '. $_SERVER["HTTP_REFERER"] );
    ?>