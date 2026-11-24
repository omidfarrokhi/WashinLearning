import mqtt from "mqtt";

const BROKER_URL = "ws://broker.emqx.io:8083/mqtt";

const MQTT_TOPIC = "WashinLearning/test/38:3E:51:70:C4:58";

export function connectMQTT(onMessage, onStatus) {
  const client = mqtt.connect(BROKER_URL, {
    clientId: `WashinLearningWeb_${Math.random().toString(16).slice(2)}`,
    clean: true,
    connectTimeout: 5000,
    reconnectPeriod: 3000,
  });

  client.on("connect", () => {
    console.log("Connected to MQTT!");

    onStatus("connected");

    client.subscribe(MQTT_TOPIC, (error) => {
      if (error) {
        console.error("Subscription error:", error);
      } else {
        console.log("Subscribed to:", MQTT_TOPIC);
      }
    });
  });

  client.on("message", (topic, payload) => {
    try {
      const data = JSON.parse(payload.toString());

      console.log("MQTT telemetry:", data);

      onMessage({
        topic,
        data,
      });
    } catch (error) {
      console.error("Invalid MQTT JSON:", error);
    }
  });

  client.on("reconnect", () => {
    onStatus("reconnecting");
  });

  client.on("error", (error) => {
    console.error("MQTT error:", error);
    onStatus("error");
  });

  client.on("close", () => {
    onStatus("disconnected");
  });

  return () => {
    client.end(true);
  };
}
