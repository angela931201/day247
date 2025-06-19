// 預設資料初始化（僅首次載入時）
if (!localStorage.getItem('records')) {
  localStorage.setItem('records', JSON.stringify([
    { name: "媽媽", date: "2023-10-10", gift: "保溫杯" },
    { name: "爸爸", date: "2023-06-01", gift: "皮帶" }
  ]));
}
const form = document.getElementById('recordForm');
const historyDiv = document.getElementById('history');
const aiResponseDiv = document.getElementById('aiResponse');
const speakBtn = document.getElementById('speakBtn');

// 儲存紀錄
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const date = document.getElementById('date').value;
  const gift = document.getElementById('gift').value;
  const record = { name, date, gift };
  const all = JSON.parse(localStorage.getItem('records') || '[]');
  all.push(record);
  localStorage.setItem('records', JSON.stringify(all));
  alert('已新增紀錄！');
  form.reset();
  showHistory();
});

// 顯示歷史紀錄
function showHistory() {
  const all = JSON.parse(localStorage.getItem('records') || '[]');
  historyDiv.innerHTML = '<h3>🎁 歷史送禮紀錄</h3>' + all.map(r => 
    `<p><strong>${r.name}</strong>－${r.gift || '無紀錄'} <button onclick=\"insertRecord('${r.name}','${r.gift}','${r.date}')\">使用這筆紀錄</button> ${r.date}</p>`
  ).join('');

  // 顯示下方最近一筆紀錄的生日與禮物資訊
  const infoDivId = 'record-info';
  let infoDiv = document.getElementById(infoDivId);
  if (!infoDiv) {
    infoDiv = document.createElement('div');
    infoDiv.id = infoDivId;
    infoDiv.style = 'margin-top:12px;padding:10px;background:#fffde7;border-radius:8px;color:#6d4c41;';
    historyDiv.parentNode.appendChild(infoDiv);
  }
  if (all.length > 0) {
    const last = all[all.length - 1];
    infoDiv.innerHTML = `<b>最新紀錄</b>：${last.name}｜生日：<span style='color:#ef6c00'>${last.date}</span>｜禮物/餐廳：${last.gift || '無'} `;
  } else {
    infoDiv.innerHTML = '';
  }
}

window.insertRecord = function(name, gift, date) {
  const question = `幫我推薦送給${name}的新禮物，去年送的是${gift}，生日是${date}，請不要重複。`;
  aiResponseDiv.textContent = '';
  document.getElementById('name').value = name;
  document.getElementById('date').value = date;
  document.getElementById('gift').value = gift;
  speakBtn.scrollIntoView({behavior:'smooth'});
  aiResponseDiv.innerHTML = `<span style='color:#ef6c00'>已帶入：${question}</span>`;
};
showHistory();


// 新增語音辨識與 Gemini 回覆區塊（如不存在則自動建立）
let startRecordingButton = document.getElementById('start-recording');
let transcriptionElement = document.getElementById('transcription');
let responseElement = document.getElementById('response');
if (!startRecordingButton) {
  startRecordingButton = document.createElement('button');
  startRecordingButton.id = 'start-recording';
  startRecordingButton.textContent = '🎤 語音辨識+AI 回覆';
  speakBtn.parentNode.insertBefore(startRecordingButton, speakBtn.nextSibling);
}
if (!transcriptionElement) {
  transcriptionElement = document.createElement('div');
  transcriptionElement.id = 'transcription';
  transcriptionElement.style = 'margin-top:8px;color:#ef6c00;';
  aiResponseDiv.parentNode.insertBefore(transcriptionElement, aiResponseDiv);
}
if (!responseElement) {
  responseElement = document.createElement('div');
  responseElement.id = 'response';
  responseElement.style = 'margin-top:4px;color:#ffa726;';
  aiResponseDiv.parentNode.insertBefore(responseElement, aiResponseDiv.nextSibling);
}

const API_KEY = 'AIzaSyBK933R0dHt8i-NjrRRjKBwWuwIKYICVDs';
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=' + API_KEY;

startRecordingButton.addEventListener('click', () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'zh-TW';
  recognition.start();
  transcriptionElement.textContent = '語音辨識中...';

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    transcriptionElement.textContent = `辨識結果: ${transcript}`;
    // 呼叫 Gemini API
    responseElement.textContent = 'AI 回應查詢中...';
    fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `幫我用助理語氣回答：「${transcript}」並給送禮建議，如果有生日提醒要主動提醒` }] }]
      })
    })
      .then(res => res.json())
      .then(data => {
        let reply = data.candidates?.[0]?.content?.parts?.[0]?.text || (data.error ? 'API 錯誤：' + data.error.message : '無法取得回答');
        responseElement.innerHTML = `<p>AI 助理：${reply}</p>`;
      })
      .catch(error => {
        responseElement.textContent = 'AI 回應失敗，請稍後再試';
        console.error('Error:', error);
      });
  };
  recognition.onerror = (event) => {
    transcriptionElement.textContent = '語音辨識失敗，請再試一次';
    console.error('Speech recognition error:', event.error);
  };
});

async function fetchGemini(userInput) {
  const apiKey = API_KEY;
  const url = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=" + apiKey;
  aiResponseDiv.textContent = 'AI 回應查詢中...';
  const response = await fetch(url, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `幫我用助理語氣回答：「${userInput}」並給送禮建議，如果有生日提醒要主動提醒` }] }]
    })
  });
  const result = await response.json();
  const reply = result.candidates?.[0]?.content?.parts?.[0]?.text || "無法取得回答";
  aiResponseDiv.innerHTML = `<p>AI 助理：${reply}</p>`;
}
