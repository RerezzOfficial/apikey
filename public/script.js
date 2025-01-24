const apiBaseUrl = '/api';

document.getElementById('getApiKey').addEventListener('click', async () => {
  const response = await fetch(`${apiBaseUrl}/get-api-key`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  document.getElementById('apiKey').textContent = data.apiKey || 'Error';
});

document.getElementById('exampleForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent form submission
  const apiKey = document.getElementById('apiKeyInput').value;

  if (!apiKey) {
    alert('Please enter a valid API Key!');
    return;
  }

  const response = await fetch(`${apiBaseUrl}/example`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify({ testData: 'Hello from client!' }),
  });

  if (response.ok) {
    const data = await response.json();
    document.getElementById('apiResponse').textContent = JSON.stringify(data);
  } else {
    const errorData = await response.json();
    document.getElementById('apiResponse').textContent = errorData.error || 'Unknown error';
  }
});
