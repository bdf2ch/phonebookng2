<?php
    $DS = DIRECTORY_SEPARATOR;
    //require_once $_SERVER["DOCUMENT_ROOT"].$DS."assets".$DS."serverside".$DS."config.php";


    class Application {
        public $error = null;
        private $link = null;


        /**
        * Конструктор класса.
        * Устанавливает соединение с БД.
        **/
        function __construct () {
            global $db_host;
            global $db_name;
            global $db_user;
            global $db_password;
            $this -> link = pg_pconnect('host=$db_host port=5432 dbname=$db_name user=$db_user password=$db_password');
            if (!$this -> link) $this -> error = 'Error connecting db';
        }


        /**
        * Деструктор класса.
        * Рвазрывает соединение с БД.
        **/
        function __destruct() {
            pg_close($this -> link);
        }


        /**
        * Возвращает массив всех структурных подразделений
        **/
        public function getAllDivisions() {
            if ($this -> link) {
                $result = pg_query($link, "SELECT get_divisions()");
                $divisions = pg_fetch_all($result);
                return $divisions[0]["get_divisions"];
            }
        }


    }
?>
