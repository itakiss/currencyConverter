(async () => {
    console.log("Extension is running...");

    const currencyMappings = {
        "€": "EUR", "EUR": "EUR", "eur": "EUR",
        "$": "USD", "USD": "USD", "usd": "USD",
        "£": "GBP", "GBP": "GBP", "gbp": "GBP",
        "¥": "JPY", "JPY": "JPY", "jpy": "JPY",
        "₹": "INR", "INR": "INR", "inr": "INR",
        "¥": "CNY", "CNY": "CNY", "cny": "CNY",
        // Ostalim simboli i kodovi valuta
  
    };

    // Funkcija za generiranje dinamičkog regexa na temelju valuta
    const generateCurrencyRegex = () => {
        const symbols = Object.keys(currencyMappings)
            .map(symbol => symbol.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')) // Escapiranje specijalnih znakova
            .join('|'); // Pripremi simbol za regex

        const regexPattern = `(?:${symbols})?\\s*(\\d[\\d,.]*)\\s*(?:${symbols})?`;
        return new RegExp(regexPattern, 'g');
    };

    // Funkcija za prepoznavanje valuta na stranici
    const detectCurrencies = (text) => {
        const detectedCurrencies = [];
        for (let symbol in currencyMappings) {
            if (text.includes(symbol)) {
                detectedCurrencies.push({ symbol: symbol, code: currencyMappings[symbol] });
            }
        }
        return detectedCurrencies;
    };

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === 'detectCurrencies') {
            const textContent = document.body.innerText || document.body.textContent;
            const foundCurrencies = detectCurrencies(textContent);
            sendResponse({ currencies: foundCurrencies });
        }
    });

    const convertToCurrency = (price, conversionRate) => {
        return (price * conversionRate).toFixed(2);
    };


    const getCurrencySymbol = (currency) => {
        const currencySymbols = {
            "CNY": "¥", "AED": "د.إ", "AFN": "؋", "ALL": "L", "AMD": "֏", "ANG": "ƒ", "AOA": "Kz", "ARS": "$", 
            "AUD": "$", "AWG": "ƒ", "AZN": "₼", "BAM": "KM", "BBD": "$", "BDT": "৳", "BGN": "лв", "BHD": ".د.ب", 
            "BIF": "Fr", "BMD": "$", "BND": "$", "BOB": "Bs.", "BRL": "R$", "BSD": "$", "BTN": "Nu.", "BWP": "P", 
            "BYN": "Br", "BZD": "$", "CAD": "$", "CDF": "Fr", "CHF": "Fr", "CLP": "$", "COP": "$", "CRC": "₡", 
            "CUP": "$", "CVE": "$", "CZK": "Kč", "DJF": "Fr", "DKK": "kr", "DOP": "$", "DZD": "د.ج", "EGP": "£", 
            "ERN": "Nfk", "ETB": "Br", "EUR": "€", "FJD": "$", "FKP": "£", "FOK": "kr", "GBP": "£", "GEL": "₾", 
            "GGP": "£", "GHS": "₵", "GIP": "£", "GMD": "D", "GNF": "Fr", "GTQ": "Q", "GYD": "$", "HKD": "$", 
            "HNL": "L", "HRK": "kn", "HTG": "G", "HUF": "Ft", "IDR": "Rp", "ILS": "₪", "IMP": "£", "INR": "₹", 
            "IQD": "ع.د", "IRR": "﷼", "ISK": "kr", "JEP": "£", "JMD": "$", "JOD": "د.ا", "JPY": "¥", "KES": "Sh", 
            "KGS": "с", "KHR": "៛", "KID": "$", "KMF": "Fr", "KPW": "₩", "KRW": "₩", "KWD": "د.ك", "KYD": "$", 
            "KZT": "₸", "LAK": "₭", "LBP": "ل.ل", "LKR": "Rs", "LRD": "$", "LSL": "L", "LYD": "ل.د", "MAD": "د.م.", 
            "MDL": "L", "MGA": "Ar", "MKD": "ден", "MMK": "Ks", "MNT": "₮", "MOP": "P", "MRU": "UM", "MUR": "₨", 
            "MVR": "ރ", "MWK": "MK", "MXN": "$", "MYR": "RM", "MZN": "MT", "NAD": "$", "NGN": "₦", "NIO": "C$", 
            "NOK": "kr", "NPR": "₨", "NZD": "$", "OMR": "ر.ع.", "PAB": "B/.", "PEN": "S/.", "PGK": "K", "PHP": "₱", 
            "PKR": "₨", "PLN": "zł", "PYG": "₲", "QAR": "ر.ق", "RON": "lei", "RSD": "дин", "RUB": "₽", "RWF": "Fr", 
            "SAR": "ر.س", "SBD": "$", "SCR": "₨", "SDG": "£", "SEK": "kr", "SGD": "$", 'SHP': '£', 'SLE': 'Le', 
            'SLL': 'Le', 'SOS': 'Sh', 'SRD': '$', 'SSP': '£', 'STN': 'Db', 'SYP': '£S', 'SZL': 'L', 'THB': '฿', 
            'TJS': 'ЅМ', 'TMT': 'm', 'TND': 'د.ت', 'TOP': 'T$', 'TRY': '₺', 'TTD': '$', 'TVD': '$', 'TWD': 'NT$', 
            'TZS': 'Sh', 'UAH': '₴', 'UGX': 'USh', 'USD': '$', 'UYU': '$U', 'UZS': 'лв', 'VES': 'Bs.S', 'VND': '₫', 
            'VUV': 'VT', 'WST': 'WS$', 'XAF': 'Fr', 'XCD': '$', 'XDR': 'SDR', 'XOF': 'Fr', 'XPF': 'Fr', 'YER': '﷼', 
            'ZAR': 'R', 'ZMW': 'ZK', 'ZWL': '$'
        };

        return currencySymbols[currency] || currency;
    };

    const walkAndReplace = (node, conversionRate, targetCurrencySymbol, targetCurrency) => {
        if (node.nodeType === 3) { // Text node
            const text = node.nodeValue;
            const priceRegex = generateCurrencyRegex();

            const newText = text.replace(priceRegex, (match, price, currencySymbol) => {
                if (!currencySymbol) return match;
                const sourceCurrency = currencyMappings[
                    typeof currencySymbol === 'string' ? currencySymbol.trim() : currencySymbol
                ] || targetCurrency;
                price = price.replace(',', '.'); // Zamijeni zarez za decimalnu točku
                return `${targetCurrencySymbol}${convertToCurrency(parseFloat(price), conversionRate)}`;
            });

            if (newText !== text) node.nodeValue = newText;
        } else {
            node.childNodes.forEach(child => walkAndReplace(child, conversionRate, targetCurrencySymbol, targetCurrency));
        }
    };

    const observeChanges = (conversionRate, targetCurrencySymbol, targetCurrency) => {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList' || mutation.type === 'subtree') {
                    walkAndReplace(document.body, conversionRate, targetCurrencySymbol, targetCurrency);
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true
        });

        return observer;
    };

    const siteConfigs = {
        'www.example1.com': {
            priceSelector: '.sc-1p1mgj0-0 .sc-15des2-0',
            baseCurrency: 'EUR'
        },
        'www.nike.com': {
            priceSelector: '.product-price',
            baseCurrency: 'EUR'
        },
        'www.jdsports.co.uk': {
            priceSelector: '.itemPrice',
            baseCurrency: 'GBP'
        }
    };

    const getSiteConfig = () => {
        const host = window.location.host;
        return siteConfigs[host] || { priceSelector: 'body', baseCurrency: 'EUR' };
    };

    const main = async () => {
        const config = getSiteConfig();
        const { priceSelector, baseCurrency } = config;

        chrome.storage.sync.get('currency', async (data) => {
            const targetCurrency = data.currency || 'EUR';
            const conversionRate = await chrome.runtime.sendMessage({ action: 'getConversionRate', baseCurrency, targetCurrency });
            if (!conversionRate) {
                console.error('Could not fetch conversion rate.');
                return;
            }

            const targetCurrencySymbol = getCurrencySymbol(targetCurrency);
            document.querySelectorAll(priceSelector).forEach(node => {
                walkAndReplace(node, conversionRate, targetCurrencySymbol, baseCurrency);
            });

            observeChanges(conversionRate, targetCurrencySymbol, baseCurrency);
        });
    };

    main();
})();