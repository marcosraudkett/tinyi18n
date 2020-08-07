# tinyi18n [JS Library]

A tiny javascript library for internationalization and easy switching of languages on HTML pages

## Additions
Found this project online and noticed it didn't have nested translations so I decided to add them and also make a save state feature using cookies.

## Using nested translations
- `data-translatekey="general>pages>home>content>title"`: just add > between each nesting. check inside example.html and translations.json.
- use function save_language(dayCount, language); to save languages. (dayCount - how long the language will be saved for and language - the language code.

## Original README starts from here:

> **Note:** This is an experimental project at the moment. Use at your own risk

## Usage
1. Include `tinyi18n.js` before the closing body tag in your page and call `tinyi18n.loadTranslations('translations.json')` with the name of your JSON file to load it. Put the `data-translatekey` attribute on any block of text you want to have multiple languages. The value of this attribute is essentially an id for the block of text so you can write translations for it. You can use the same value for multiple blocks of text. For non-text elements, also add the `data-translateattribute` to specify which attribute you want to have translations for.



##### index.html
```html
<html>
  <head>
    <meta charset="UTF-8">
    <title data-translatekey="title"></title>
  </head>
  <body>
    <h1 data-translatekey="title"></h1>
    <p data-translatekey="description"></p>
    <!-- nested version: -->
    <p data-translatekey="homepage>description"></p>

    <input type="text" data-translatekey="searchbox" data-translateattribute="value"></input>
    <!-- nested version: -->
    <input type="text" data-translatekey="homepage>inputs>searchbox" data-translateattribute="value"></input>

    <script src="tinyi18n.js"></script>
    <script>
      tinyi18n.loadTranslations('translations.json')
    </script>
  </body>
</html>
```

2. Create your translations as shown below with multiple languages listed for each key. Make sure to include `default_language` and `languages` for the module to work properly.
##### translations.json
```json
{
  "default_language": "es",
  "languages": ["en", "es"],
  "translations": {
    "title": {
      "en": "Title in English",
      "es": "Título en Inglés"
    },
    "nested": {
      "title": {
        /* 
          calling nested: nested>title 
          you can add as many nestings as you'd like just use ">" sign.
        */
        "en": "Title in English",
        "es": "Título en Inglés"
      }
    }
    "description": {
      "en": "I like cats",
      "es": "Me gustan los gatos"
    },
    "searchbox": {
      "en": "search",
      "es": "buscar"
    }
  }
}
```
##### index.html
3. Call `tinyi18n.translate` with the language you want to switch to and voila!

```html
<html>
  <head>
    <meta charset="UTF-8">
    <title data-translatekey="title"></title>
  </head>
  <body>
    <h1 data-translatekey="title"></h1>
    <p data-translatekey="description"></p>
    <input type="text" data-translatekey="searchbox" data-translateattribute="value"></input>

    <button onclick="tinyi18n.setLang('en')">Translate to English</button>
    <button onclick="tinyi18n.setLang('es')">Traducir al inglés</button>

    <script src="tinyi18n.js"></script>
    <script>
      tinyi18n.loadTranslations('translations.json')
    </script>
  </body>
</html>
```


## Functions
- `loadTranslations('translations.json')`: Loads JSON file with translations. Takes a filename as input
- `getLang()`: Get the current language of the page according to tinyi18n
- `setLang('en')`: Changes the page language to a specified language. Takes a language string as input

## Attributes
- `data-translatekey="title"`: Use this on every text element you want to translate. Choose a different key for every element and add the translations for your keys in your JSON file
- `data-translateattribute="value"`: Use this on non-text elements where you need to have translated text for an attribute value (ex. value attribute for input elements)

## Contributing
Contributions, issues, and forks are welcome but this is a hobby project so don't expect too much from it. [SemVer](http://semver.org/) is used for versioning.

## License
This project is licensed under the Mozilla Public License 2.0. See [LICENSE](LICENSE.md) for details.
