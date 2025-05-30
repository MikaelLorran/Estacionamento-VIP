<?php

require_once __DIR__ . '/../../vendor/autoload.php';

use PhpMqtt\Client\MqttClient;
use PhpMqtt\Client\ConnectionSettings;

class MqttClientWrapper {
    private $mqtt;
    private $host;
    private $port;
    private $clientId;
    private $username;
    private $password;

    public function __construct(
        $host = '4ad6efbc696f48f7a4453e5bbbed2774.s1.eu.hivemq.cloud',
        $port = 8883,
        $username = 'Esp32-A1',
        $password = 'Esp123456',
        $clientId = ''
    ) {
        $this->host = $host;
        $this->port = $port;
        $this->username = $username;
        $this->password = $password;
        $this->clientId = $clientId ?: 'php_client_' . rand();
    }

    public function publish($topic, $message) {
        $connectionSettings = (new ConnectionSettings)
            ->setUsername($this->username)
            ->setPassword($this->password)
            ->setUseTls(true);

        $this->mqtt = new MqttClient($this->host, $this->port, $this->clientId, MqttClient::MQTT_3_1_1);

        try {
            $this->mqtt->connect($connectionSettings, true);
            $this->mqtt->publish($topic, $message, 0);
            $this->mqtt->disconnect();
            return true;
        } catch (\Exception $e) {
            error_log("Erro ao conectar/publish MQTT: " . $e->getMessage());
            return false;
        }
    }
}

?>
