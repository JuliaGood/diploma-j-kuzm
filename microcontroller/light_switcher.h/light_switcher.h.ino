
void setup() {
  Serial.begin(115200);
  delay(10); 

      pinMode(14, OUTPUT);
      //ledcAttachPin(14, 1);
     // ledcSetup(1, 1000, 8);
}

void loop() {
      // ledcWrite(1, 0);
      // delay(2000);
      // ledcWrite(1, 50);
      //       delay(2000);
      // ledcWrite(1, 100);
      //       delay(2000);
      // ledcWrite(1, 200);

      analogWrite(14, map(20, 0, 100, 0, 255));

}
