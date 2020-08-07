/* --------------

Modified by MVRC Software 
Additions: Nested translations

----------------- */

let tinyi18n = {
	_data: null,
	_translate_elements: null,
	_current_language: 'en',

	getLang: function(new_language) {
		var language = _cke('lang');
		if(language)
		{
			return _cke('lang')
			tinyi18n._current_language = _cke('lang')
		} else {
			return tinyi18n._current_language
		}
	},

	setLang: function(language) {
		saveLanguage(250,language);
		for (let i = 0; i < tinyi18n._translate_elements.length; i++) {
			const key = tinyi18n._translate_elements[i].getAttribute('data-translatekey')
			const attribute = tinyi18n._translate_elements[i].getAttribute('data-translateattribute')

			var countNesting = (key.match(new RegExp(">", "g")) || []).length;
			var nestedKeys = key.split('>');
			try {
				if(countNesting>0)
				{
					var keys = '';
					for(let i = 0; i < nestedKeys.length; i++){ keys = keys+'.'+nestedKeys[i]; }
					var text = 'tinyi18n._data.translations'+keys+'.'+[language];
					var translated_text = eval(text)
				} else {
					var translated_text = tinyi18n._data.translations[key][language]
				}
			}

			catch (error) {
				console.error('tinyi18n: Key', "'" + key + "'", 'is not in JSON file')
			}

			if (attribute) {
				tinyi18n._translate_elements[i].setAttribute(attribute, translated_text)
			}

			else {
				tinyi18n._translate_elements[i].innerHTML = translated_text
			}
		}
		tinyi18n._current_language = _cke('lang')

		console.log(tinyi18n._current_language);
		document.documentElement.lang = language
		tinyi18n._current_language = language
	},

	loadTranslations: function(filename) {
		tinyi18n._current_language = _cke('lang')
		let request = new XMLHttpRequest()

		request.overrideMimeType('application/json')
		request.open('GET', filename, true)
		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == '200') {
				tinyi18n._data = JSON.parse(request.responseText)
				tinyi18n._translate_elements = document.querySelectorAll('[data-translatekey]') 
				langFromCookie = tinyi18n._current_language = _cke('lang');
				if(langFromCookie) {
					tinyi18n._current_language = tinyi18n._current_language = _cke('lang');
				} else {
					tinyi18n._current_language = tinyi18n._data.default_language || 'en'
				}
				tinyi18n.setLang(tinyi18n._current_language)
			}
		}

		request.send(null)
	}
}

function saveLanguage(x,lang) 
{
    var now = new Date();
    var time = now.getTime();
  if(x == '') {
    var expireTime = time + 1000*22620000;
  } else {
    Date.prototype.addDays = function(days) 
    {
      var e = new Date(this.valueOf());
      e.setDate(e.getDate() + days);
      return e;
    }
    var e = new Date();
    var expireTime = e.addDays(x);   
  }
   now.setTime(expireTime);
   var tempExp = 'Wed, 31 Oct 2017 08:50:17 GMT';
    document.cookie = 'lang='+lang+'; expires='+now.toGMTString()+';path=/';
}