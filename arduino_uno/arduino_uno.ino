// 腳位定義
#define TRIG_PIN 6     // 超音波 Trig 腳位
#define ECHO_PIN 7     // 超音波 Echo 腳位
#define LED_PIN 3      // LED 接腳

void setup() {
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);  // 可選，用於序列監視器
}

void loop() {
  // 發出超音波脈衝
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  // 讀取回音時間
  long duration = pulseIn(ECHO_PIN, HIGH);

  // 計算距離（cm）
  float distance = duration * 0.034 / 2;

  Serial.print("距離: ");
  Serial.print(distance);
  Serial.println(" cm");

  // 距離 < 10 公分則亮 LED
  if (distance > 0 && distance < 30) {
    digitalWrite(LED_PIN, HIGH); // LED 亮
  } else {
    digitalWrite(LED_PIN, LOW);  // LED 滅
  }

  delay(20);  // 小延遲避免過度觸發
}
