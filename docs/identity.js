const Identity = {
    // For messages speaking in the first person
    appOwner: "Zerol Acqua",

    // Multi-language support
    messages: {
        'ZH': {
            okButtonText: "确定",
            solveDefaultMessage: "恭喜完成！",
            solveOKButtonText: "芜湖！",
            incorrectMessage: "继续尝试 :("
        },
        'EN': {
            okButtonText: "OK",
            solveDefaultMessage: "Congratulations!",
            solveOKButtonText: "Hurray!",
            incorrectMessage: "Keep trying"
        },
        'JP': {
            okButtonText: "OK",
            solveDefaultMessage: "おめでとうございます！",
            solveOKButtonText: "やったー！",
            incorrectMessage: "もう一度お試しください"
        }
    },

    // Get current language, fallback to 'EN' if not supported
    getCurrentLanguage: function () {
        // Try to get language from UserSettings first
        if (typeof UserSettings !== 'undefined' && UserSettings && UserSettings.app_language) {
            const lang = UserSettings.app_language.toUpperCase();
            // Return the language if we have messages for it
            if (this.messages[lang]) {
                return lang;
            }
        }

        // Fallback to 'EN'
        return 'EN';
    },

    // Get localized message
    getMessage: function (key) {
        const lang = this.getCurrentLanguage();
        const message = this.messages[lang] && this.messages[lang][key];
        
        // Fallback to EN if current language doesn't have the key
        const result = message || (this.messages['EN'] && this.messages['EN'][key]) || key;
        return result;
    },

    // Legacy properties for backward compatibility
    get okButtonText() { return this.getMessage('okButtonText'); },
    get errorTitle() { return this.getMessage('errorTitle'); },
    get infoTitle() { return this.getMessage('infoTitle'); },
    get solveDefaultMessage() { return this.getMessage('solveDefaultMessage'); },
    get solveOKButtonText() { return this.getMessage('solveOKButtonText'); },
    get incorrectMessage() { return this.getMessage('incorrectMessage'); },

    solveTitle: undefined,

    // Usage Button Amendments
    addUsageButtons: {
        // "Submission Rules for GMPuzzles": "https://tinyurl.com/GMPuzzlesFormatting"
    },

    // googleTag: 'G-2WQYM10ZE7'
};

(function () {
    const usageButtons = document.getElementById('usageButtons');
    for (let buttonName in Identity.addUsageButtons) {
        let button = document.createElement('a');
        button.setAttribute('href', Identity.addUsageButtons[buttonName]);
        button.setAttribute('target', '_blank');
        button.classList.add('button');
        button.textContent = buttonName;
        usageButtons.appendChild(button);
    }

    if (Identity.googleTag) {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://www.googletagmanager.com/gtag/js?id=" + Identity.googleTag;
        script.async = true;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];

        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', Identity.googleTag);
    }
})();