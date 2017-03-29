<?php

    /**
    *
    **/
    function getContactsByDivisionId ($parameters) {
        global $link;
        $divisionId = $parameters -> divisionId;

        $result = pg_query_params(
            $link,
            "SELECT get_contacts_by_division_id($1)",
            array($divisionId)
        );

        $contacts = pg_fetch_result($result, 0, 0);
        echo is_null($contacts) ? json_encode(NULL) : $contacts;
        return true;
    }


    /**
    *
    **/
    function searchContacts ($parameters) {
        global $link;
        $search = $parameters -> search;

        $result = pg_query_params(
            $link,
            "SELECT search_contacts($1)",
            array($search)
        );

        $contacts = pg_fetch_all($result);
        echo is_null($contacts) ? json_encode(NULL) : $contacts[0]["search_contacts"];
        return true;
    }


    /**
    *
    *
    **/
    function getContactById($parameters) {
        global $link;
        $contactId = $parameters -> contactId;

        $result = pg_query_params(
            $link,
            "SELECT get_contact_by_id($1)",
            array($contactId)
        );

        $contact = pg_fetch_all($result);
        echo is_null($contact) ? json_encode(NULL) : $contact[0]["get_contact_by_id"];
        return true;
    }


    /**
    *
    *
    **/
    function addContactToFavorites ($parameters) {
        global $link;
        $contactId = $parameters -> contactId;
        $userId = $parameters -> userId;

        $result = pg_query_params(
            $link,
            "SELECT add_contact_to_favorites($1, $2)",
            array($contactId, $userId)
        );

        $contact = pg_fetch_all($result);
        echo $contact[0]["add_contact_to_favorites"];
        return true;
    }



    /**
    *
    *
    **/
    function deleteContactFromFavorites ($parameters) {
        global $link;
        $userId = $parameters -> userId;
        $contactId = $parameters -> contactId;

        $result = pg_query_params(
            $link,
            "SELECT delete_contact_from_favorites($1, $2)",
            array($contactId, $userId)
        );

        $answer = pg_fetch_all($result);
        echo $answer[0]["delete_contact_from_favorites"];
        return true;
    }


?>
