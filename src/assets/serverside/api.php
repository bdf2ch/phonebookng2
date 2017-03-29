<?php

    $DS = DIRECTORY_SEPARATOR;
    require_once $_SERVER["DOCUMENT_ROOT"].$DS."assets".$DS."serverside".$DS."config.php";
    require_once $_SERVER["DOCUMENT_ROOT"].$DS."assets".$DS."serverside".$DS."sessions.php";
    //require_once $_SERVER["DOCUMENT_ROOT"].$DS."assets".$DS."serverside".$DS."users.php";
    require_once $_SERVER["DOCUMENT_ROOT"].$DS."assets".$DS."serverside".$DS."divisions.php";
    //require_once $_SERVER["DOCUMENT_ROOT"].$DS."assets".$DS."serverside".$DS."ats.php";
    require_once $_SERVER["DOCUMENT_ROOT"].$DS."assets".$DS."serverside".$DS."contacts.php";
    require_once $_SERVER["DOCUMENT_ROOT"].$DS."assets".$DS."serverside".$DS."active-directory.php";
    $params = json_decode(file_get_contents("php://input"));


    $link = pg_pconnect("host=$db_host port=5432 dbname=$db_name user=$db_user password=$db_password");
    if (!$link) die ("can't connect to db");


    switch ($params -> action) {
        case "getSessionByToken": getSessionByToken($params -> data); break;
        case "getAllDivisions": getAllDivisions(); break;
        case "login": login($params -> data); break;
        case "getContactsByDivisionId": getContactsByDivisionId($params -> data); break;
        case "searchContacts": searchContacts($params -> data); break;
        case "addContactToFavorites": addContactToFavorites($params -> data); break;
        case "deleteContactFromFavorites": deleteContactFromFavorites($params -> data); break;
    }


    pg_close($link);

?>
