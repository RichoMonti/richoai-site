const chatBox = document.getElementById('chat-box');
const inputField = document.getElementById('user-input');

function appendMessage(sender, text) {
  const msgDiv = document.createElement('div');
  msgDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const userInput = inputField.value.trim();
  if (!userInput) return;
  appendMessage('You', userInput);
  inputField.value = '';
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userInput }]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, no response.";
    appendMessage('RichoAi', reply);
  } catch (error) {
    appendMessage('RichoAi', 'Error contacting server.');
  }
}

function clearChat() {
  chatBox.innerHTML = '';
}

function scrollToBottom() {
  chatBox.scrollTop = chatBox.scrollHeight;
}
