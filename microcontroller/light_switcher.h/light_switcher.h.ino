#include <WiFi.h>
#include <WebSocketsClient.h>
#include <ArduinoJson.h>

const char* ssid = "VK-WIFI";
const char* password = "meteor81990";

// Initialize the WebSocket client
WebSocketsClient webSocket;

void handleWebSocketEvent(WStype_t type, uint8_t* payload, size_t length) {
  switch (type) {
    case WStype_DISCONNECTED:
      Serial.println("Disconnected from websockets server");
      break;
    case WStype_CONNECTED:
      Serial.println("Connected to websockets server");
      break;
    case WStype_TEXT:
      Serial.print("Received message: ");
      Serial.println((char*)payload);

      // Parse the JSON message
      DynamicJsonDocument json(1024);
      DeserializationError error = deserializeJson(json, payload);

      if (error) {
        Serial.print(F("deserializeJson() failed: "));
        Serial.println(error.c_str());
        return;
      }

      // Check if this is a first connection.
      // In this case we should consider the payload as an array in order to update the initial status of the bulbs
      bool isFirstConnection = json["firstConnection"].as<bool>();

      if (isFirstConnection) {
        // Iterate through the array and update the pins
        for (JsonVariant value : json["rooms"].as<JsonArray>()) {
          // Update the pinMode, analogWrite, and digitalWrite values for the current pin
          updateBulb(value.as<JsonObject>());
        }
      } else {
        // Handle a non-array payload
        // Update the pinMode, analogWrite, and digitalWrite values for the single pin
        updateBulb(json.as<JsonObject>());
      }

      // Send a response to the back-end
      // webSocket.sendTXT("Bulb status updated");
      break;
  }
}

void updateBulb(JsonObject data) {
  int bulbPin = data["bulbPin"].as<int>();
  int lightStatus = data["lightStatus"].as<int>();
  int brightRange = data["brightRange"].as<int>();

  if (bulbPin > 0) {
    pinMode(bulbPin, OUTPUT);
    Serial.print("bulbPin: ");
    Serial.println(bulbPin);

    analogWrite(bulbPin, map(brightRange, 0, 100, 0, 255));
    Serial.print("brightRange: ");
    Serial.println(brightRange);

    digitalWrite(bulbPin, lightStatus ? LOW : HIGH);
    Serial.print("lightStatus: ");
    Serial.println(lightStatus);
  }
}

void setup() {
  // Initialize the serial port
  Serial.begin(115200);

  // Connect to the Wi-Fi network
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to Wi-Fi...");
  }
  Serial.println("Connected to Wi-Fi");

  // Connect to the remote WebSocket server
  webSocket.begin("localhost", 8080, "/", "ws");
  webSocket.onEvent(handleWebSocketEvent);
  Serial.println("WebSocket client started");
}

void loop() {
  // Handle incoming WebSocket messages
  webSocket.loop();

  // Send a ping message to the server every 10 seconds to keep the connection alive
  static unsigned long pingTime = millis();
  if (millis() - pingTime > 10000) {
    webSocket.sendPing();
    pingTime = millis();
  }
}
