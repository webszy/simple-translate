$(document).ready(function() {
    loadDict()
    $('button').on('click', function() {
        translate('zh')
    });
    $('input').on('click', function() {
        translate('en')
    });
});
window.onload = function() {
    if (window.langData) {
        translate()
    }
}

function loadDict() {
    $.ajax({
        type: "get",
        url: "./language.json",
        dataType: "json",
        async: false, //同步加载文件
        success: function(response) {
            // console.log(response)
            window.langData = response
        }
    });

}

function getUserLanguage(langCode) {
    var lang = navigator.language || navigator.userLanguage;
    var result = langCode ? langCode : lang.toLocaleLowerCase().substr(0, 2);
    var obj = {
        "zh": "Chinese",
        "en": "English",
        "de": "Germany",
        "ru": "Russia",
        "fr": "France",
        "ko": "Korea",
        "pt": "Portague",
        "ja": "Japanese",
        "es": "Spanish",
        "it": "Italy"
    }

    return !obj[result] ? "Chinese" : obj[result]
}

function translate(langCode) {
    var lang = getUserLanguage(langCode),
        dict = window.langData,
        len = window.langData.length
    $('[data-lang]').each(function() {
        var id = $(this).attr('data-lang-id'),
            tag = this.tagName.toLowerCase()
        for (var i = 0; i < len; i++) {
            console.log(dict[i][lang])
            if (dict[i]['ID'] == id) {
                if (dict[i][lang] == null) { break }
                if (tag == 'input') { $(this).val(dict[i][lang]); break; }
                $(this).html(dict[i][lang])
            }
        }
    });
}