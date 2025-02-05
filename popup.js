document.addEventListener('DOMContentLoaded', function() {
  // Load currency options from JSON file
  fetch('currencies.json')
    .then(response => response.json())
    .then(data => {
      const select = document.getElementById('currency');
      data.forEach(currency => {
        const option = document.createElement('option');
        option.value = currency.code;
        option.textContent = currency.name;
        select.appendChild(option);
      });

      // After loading options, retrieve the saved currency preference
      chrome.storage.sync.get('currency', function(savedData) {
        if (savedData.currency) {
          document.getElementById('currency').value = savedData.currency;
        }
      });
    })
    .catch(error => console.error('Error loading currency data:', error));

  // Save currency preference when "Save" button is clicked
  document.getElementById('save').addEventListener('click', function() {
    const currency = document.getElementById('currency').value;
    chrome.storage.sync.set({currency: currency}, function() {
      // Reload the active tab after saving the currency preference
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.reload(tabs[0].id);
      });
    });
  });
});