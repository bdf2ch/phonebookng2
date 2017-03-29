<?php

    /**
    * Возвращает сессию по токену
    **/
    function getSessionByToken ($parameters) {
        global $link;
        $token = $parameters -> token;

        $result = pg_query_params(
            $link,
            "SELECT get_session_by_token($1)",
            array($token)
        );

        $session = pg_fetch_result($result, 0, 0);
        echo is_null($session) ? json_encode(NULL) : $session;
        return true;
    }


?>
