# AI 節慶小管家｜會記得、會提醒的智慧生活助理 × 月曆互動裝置

---

## 一、專題動機
現代人生活繁忙，容易忘記朋友與家人的生日、曾送過的禮物、參加過的活動與聚餐地點。傳統記事應用缺乏溫度與互動性，且無法形成長期記憶。本專題目標是打造一款 AI 記憶助理，能夠「記得生活中的情感小事」，並用自然語音提醒與互動，成為你溫柔又可靠的生活小秘書。裝置將結合實體月曆與提示系統，帶來嶄新的人-AI互動體驗。

---

## 二、應用情境
• 🎂 每年媽媽生日前提醒你：「去年的保溫杯她很喜歡，今年要不要換點不一樣的？」
• 🎉 AI幫你記得5月22日有壽宴，活動前一週主動提醒並建議穿著、時間安排
• 🍽️ AI知道你和朋友去年在欣葉餐廳聚餐，今年避免重複推薦新地點
• 🎁 過節前提醒你曾送過的禮物，避免重複，給出創意禮物建議
• 📅 可語音查詢：「我去年12月送過誰什麼？」或「和爸爸一起去哪慶生？」
• 💡 AI依據歷史紀錄與對象偏好，自動生成新穎禮物推薦，減輕送禮壓力

---

## 三、核心功能

| 功能模組    | 說明                                  |
| ------- | ----------------------------------- |
| 🎂 生日提醒 | 每年自動提醒，依事件層級閃爍LED並語音播報              |
| 🎁 禮物記憶 | 記錄送禮對象、內容與日期，下次自動提醒並建議              |
| 🧠 AI推薦 | 根據紀錄與關係、節慶主題，產生個人化禮物建議              |
| 📖 回憶查詢 | 可語音查詢某月某人紀錄，生成回憶時間軸                 |
| 💬 對話互動 | 語音輸入與語音回覆，進行記錄、提醒、建議等操作             |
| 🔔 實體提示 | 透過白光 LED 閃爍模式、蜂鳴器、按鈕與感測器實現互動式月曆提醒裝置 |

---

## 四、實作結構（AI × 月曆硬體整合）

• 📥 語音/按鈕輸入 → 使用者記錄生日/禮物/活動
• 🧠 Python + GPT 模組分析 → 存入 SQLite
• 🔁 每日開機自動檢查 → 是否需提醒
• 🔦 事件發生當日 → 白光 LED 閃爍提示
• 👋 超音波感測器觸發提示 → 使用者靠近時自動提醒

---

## 五、現有 AI 語音互動案例參考
Google Assistant / Alexa：自然語音互動 + 行事曆提醒
小米小愛同學：語音控制與行程記錄
Replika AI：記憶型 AI 對話者
Rasa Open Source：記憶與事件處理型語音助手
GPT4All 本地部署：自然語言生成、個性化回饋

---

## 五、互動裝置設計（簡化版）

| 元件        | 功能說明                       |
| --------- | -------------------------- |
| 白光 LED x1 | 閃爍提醒今日有重要事件（慢閃＝生日，快閃＝送禮）   |
| 超音波感測器    | 使用者靠近月曆自動觸發提醒              |
| 紙本月曆結構    | 貼合實體月曆，嵌入 LED/蜂鳴器/感測器做整合展示 |
| 元件        | 功能說明                       |
| 白光 LED x1 | 感測器偵測到有人靠近時閃爍提醒           |
| 超音波感測器    | 偵測使用者靠近月曆自動觸發 LED 閃爍        |
| 紙本月曆結構    | 貼合實體月曆，嵌入 LED/感測器做整合展示     |

📌 *簡單易製，只需感測器與 LED，靠近就會閃燈，互動直覺。*

---

## 六、使用材料（依你現有材料包設計）

| 名稱                        | 用途                    |
| ------------------------- | --------------------- |
| Arduino UNO               | 控制LED、蜂鳴器、按鈕與感測器      |
| 白光 LED x1                 | 當日事件提醒閃爍用             |
| HC-SR04 超音波感測器            | 偵測靠近觸發提醒              |
| 杜邦線 + Breadboard          | 電路連接與測試               |
| Python + SQLite + GPT4All | 處理語音邏輯、儲存記憶、生成推薦與語音輸出 |

---

## 七、開發工具

| 工具名稱           | 用途                     |
| Python         | 控制主程式與 AI 記憶模組         |
| gTTS / PicoTTS | 語音生成提醒句                |
| SQLite         | 本地儲存生日/送禮/活動紀錄，支援查詢    |
| Fritzing       | 電路設計繪製                 |
| GPT4All        | 本地 LLM，用於生成自然語言對話與禮物建議 |

---


## 八、使用者互動流程（簡化版）

1. 使用者靠近月曆裝置
2. 超音波感測器偵測到有人靠近
3. LED 閃爍提醒有事件（或僅作為互動提示）

---

## 九、專案特色

• 🧠 AI 長期記憶：能記住歷史紀錄與送禮行為
• � 簡化互動裝置：白光LED + 蜂鳴器 + 按鈕即可互動提示
• 🔐 離線儲存保障隱私：不依賴雲端，資料全存在本地
• 🎁 禮物推薦個人化：依人際關係、歷史偏好生成禮物建議
• � 月曆結合：提升提醒的實體存在感與情境感

---

## 十、預期成果

• ✅ AI助理可記憶生日、送禮與活動資訊
• ✅ 可語音互動並主動提醒事件與禮物建議
• ✅ 實體裝置具備提示燈、聲音與感測互動
• ✅ 製作簡單但功能完整，便於展示與應用擴展
• ✅ 結合月曆外觀，成為溫馨生活夥伴與創意裝置

---

## 🔍 延伸探討：AI的加入如何改變體驗？

| 問題                  | 回應說明                                                              |
| ------------------- | ----------------------------------------------------------------- |
| 🧩 對使用者的意義          | 建立情感性記憶延伸工具，降低人為遺漏，強化節慶行為的溫度與一致性                                  |
| 🤖 AI 改變了什麼？        | 從被動記事 → 主動提醒、從靜態記錄 → 個性建議，讓互動更有溫度、更貼近生活                           |
| � 人-AI-裝置三角關係如何建立？ | 使用者與裝置互動（查詢/記錄），裝置回饋透過 LED/蜂鳴器，AI 模組處理語意並生成個性化內容，三者緊密協作形成「情境互動三角」 |

---

## 使用者互動流程

1. 開啟網頁，輸入或儲存 Gemini API 金鑰。
2. 於「新增紀錄」表單輸入姓名、生日、禮物、餐廳，點擊「新增紀錄」即可儲存。
3. 歷史送禮紀錄區塊自動顯示所有紀錄，並可一鍵帶入紀錄快速詢問 AI。
4. 可直接輸入需求或使用語音輸入，AI 會根據主題（送禮/餐廳）給出推薦。
5. 今日壽星區塊自動比對生日，當天有壽星會顯示於頁面下方。
6. 所有資料皆儲存於本地瀏覽器，隱私安全。

（如有硬體裝置，則：靠近月曆→感測器觸發→LED/蜂鳴器提醒→按鈕查詢/記錄）

---
