<?
class Database {
    private static $conn;

    public static function conectar() {
        if (!isset(self::$conn)) {
            $env = parse_ini_file(__DIR__ . '/../../config/.env');

            try {
                self::$conn = new PDO(
                    'mysql:host=' . $env['DB_HOST'] . ';dbname=' . $env['DB_NAME'] . ';charset=utf8mb4',
                    $env['DB_USER'],
                    $env['DB_PASS']
                );

                self::$conn->setAttribute(PDO::ATTR_ERRMODE, value: PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $e) {
                die('Erro de conexão: ' . $e->getMessage());
            }
        }

        return self::$conn;
    }
}

?>