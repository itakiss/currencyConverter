# 📌 Currency Converter Chrome Extension

## 📝 Overview
This Chrome extension **automatically detects and converts currencies** on web pages. It scans the page for price values, recognizes different currency formats, and updates them to the user's preferred currency using **real-time exchange rates**. The extension ensures seamless currency conversion without requiring manual input.

## ✨ Features
✔ **Automatic Currency Detection**: Identifies different currency symbols and formats on web pages.  
✔ **Real-Time Conversion**: Uses live exchange rates to update currency values.  
✔ **Multiple Currency Support**: Supports various global currencies including **USD, EUR, GBP, JPY, INR, and more**.  
✔ **Seamless Integration**: Works in the background, automatically updating prices.  
✔ **Customizable Settings**: Users can select their **preferred currency** via a simple UI.  
✔ **Mutation Observer**: Ensures dynamic content updates are also converted.  

## 🛠 Technologies Used
- **JavaScript**: Core logic for scanning and replacing currency values.  
- **Chrome Extension APIs**: Used for storage, messaging, and content script injection.  
- **Regular Expressions (RegEx)**: Detects currency formats on web pages.  
- **Exchange Rate API**: Fetches live currency rates for accurate conversions.  
- **HTML & CSS**: UI for selecting the preferred currency.  
- **WebSockets**: Updates currency changes in real time.  

## 📥 Installation  
1. **Clone this repository**:  
   ```sh
   git clone https://github.com/your-username/currency-converter-extension.git
   ```
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" (top-right corner).
4. Click "Load unpacked" and select the project folder.
5. The extension is now installed and ready to use.

## ⚙ How It Works
1. The extension scans the webpage for currency values using a regex pattern.
2. It identifies the currency symbol and extracts the numeric value.
3. It fetches the latest exchange rate from the API.
4. It replaces the detected values with the converted amount in the user's preferred currency.
5. A **MutationObserver** ensures that dynamically loaded content is also converted.

## ⚡ Configuration
### Selecting a Preferred Currency:
- Click on the extension icon in Chrome.
- Choose a currency from the dropdown menu.
- Click "Save" to apply the changes.
- The extension will refresh the page and apply conversions.

## 💡 Example Usage
**Before:**  
```
Price: $100
```
**After selecting EUR as the preferred currency:**  
```
Price: €85 (Converted value based on exchange rate)
```

## 🌍 Supported Websites
The extension supports various e-commerce and retail websites including:
- Amazon
- eBay
- Nike
- JD Sports
- Any other website displaying currency values

## 🛠 Known Issues
- Some dynamically loaded content may not update instantly.
- Currency detection might be inaccurate on some websites with unusual formatting.

## 🚀 Future Enhancements
- **User-defined custom exchange rates.**
- **Support for additional currencies.**
- **Improved AI-based currency detection.**

## 🤝 Contributions
Contributions are welcome! If you find a bug or want to add a feature, feel free to open an issue or submit a pull request.


---



