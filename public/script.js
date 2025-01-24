const apiBaseUrl = '/api';

document.getElementById('getApiKey').addEventListener('click', async () => {
  const response = await fetch(`${apiBaseUrl}/get-api-key`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  document.getElementById('apiKey').textContent = data.apiKey || 'Error';
});

document.getElementById('resetApiKey').addEventListener('click', async () => {
  const apiKey = document.getElementById('apiKey').textContent;
  if (apiKey === 'None') {
    alert('You need an API key first!');
    return;
  }
  const response = await fetch(`${apiBaseUrl}/reset-api-key`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey }),
  });
  const data = await response.json();
  if (data.apiKey) {
    document.getElementById('newApiKey').textContent = data.apiKey;
    document.getElementById('apiKey').textContent = data.apiKey;
  } else {
    alert(data.error || 'Error');
  }
});

document.getElementById('accessSecureData').addEventListener('click', async () => {
  const apiKey = document.getElementById('apiKey').textContent;
  if (apiKey === 'None') {
    alert('You need an API key first!');
    return;
  }
  const response = await fetch(`${apiBaseUrl}/secure-data`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
  });
  const data = await response.json();
  document.getElementById('secureData').textContent = data.data || data.error || 'Error';
});
