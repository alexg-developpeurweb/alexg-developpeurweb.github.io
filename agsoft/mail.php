<?php
    $destinataire = 'alexandregiel@gmail.com';
    // Adresse email du destinataire
    $user  = $_POST['your-name'];
    $email = $_POST['your-email'];

    $sujet = 'contact AGSoft';
    $app   = $_POST['your-app'];

    $message = $_POST['your-message'].'de : '.$user.'/'.$email.'** Pour l\'application :'.$app ;
    // Contenu du message de l'email
    mail($destinataire, $sujet, $message);
    // Fonction principale qui envoi l'email
    header('Location: '. $_SERVER["HTTP_REFERER"] );
    ?>