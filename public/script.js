const apiBaseUrl = '/api';

// Generate API Key
document.getElementById('getApiKey').addEventListener('click', async () => {
  const response = await fetch(`${apiBaseUrl}/get-api-key`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  document.getElementById('apiKey').textContent = data.apiKey || 'Error';
});

// Validate API Key
document.getElementById('validateForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const apiKey = document.getElementById('apiKeyInput').value;

  if (!apiKey) {
    alert('Please enter a valid API Key!');
    return;
  }

  const response = await fetch(`${apiBaseUrl}/validate-api-key`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey }),
  });

  if (response.ok) {
    const data = await response.json();
    window.location.href = data.redirectUrl; // Redirect if valid
  } else {
    const errorData = await response.json();
    document.getElementById('apiResponse').textContent = errorData.error || 'Unknown error';
  }
});
