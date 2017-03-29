<?php

    //$DS = DIRECTORY_SEPARATOR;
    //require_once $_SERVER["DOCUMENT_ROOT"].$DS."serverside".$DS."config.php";


    function login ($parameters) {
        global $ad_host;
        global $link;
        global $session_duration;
        $login = $parameters -> login;
        $password = $parameters -> password;
        session_start();

        $ldap = ldap_connect($ad_host);
        if (!$ldap) {
            echo("Не удалось подключиться к серверу LDAP");
            //echo(json_encode(false));
            return false;
        }

        $result = ldap_set_option($ldap, LDAP_OPT_PROTOCOL_VERSION, 3);
        if (!$result) {
            echo(ldap_errno($ldap)." - ".ldap_error($ldap));
            //echo(json_encode(false));
            return false;
        }

        $result = ldap_bind($ldap, "NW\\".$login, $password);
        if (!$result) {
            //echo(ldap_errno($ldap)." - ".ldap_error($ldap));
            echo(json_encode(false));
            return false;
        }

        $attributes = array("name", "mail", "samaccountname", "cn");
        $filter = "(&(objectCategory=person)(sAMAccountName=$login))";

        $search = ldap_search($ldap, ('OU=02_USERS,OU=Kolenergo,DC=nw,DC=mrsksevzap,DC=ru'), $filter, $attributes);
        if (!$search) {
            echo(ldap_errno($ldap)." - ".ldap_error($ldap));
            //echo(json_encode(false));
            return false;
        }

        $result = ldap_get_entries($ldap, $search);
        if (!$result) {
            echo(ldap_errno($ldap)." - ".ldap_error($ldap));
            //echo(json_encode(false));
            return false;
        }

        if ($result['count'] != 0) {
            //echo('user found');
            $result = pg_query_params(
                $link,
                'SELECT auth_user($1, $2)',
                array($login, $session_duration)
            );
            $sessionData = pg_fetch_all($result);
            $data =  json_decode($sessionData[0]["auth_user"]);
            setcookie("kolenergo_session_id", $data -> session -> token, $data -> session -> session_end, "/");
            echo $sessionData[0]["auth_user"];
            return true;
        }
    }

?>
