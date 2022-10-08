# Sanitizer XSS
* Sanitizer XSS sanitizes complex data (nested objects, arrays, strings) to prevent Cross Site Scripting (XSS) attack.
* Sanitizer XSS based on [sanitize-html](https://github.com/apostrophecms/sanitize-html)

![GitHub](https://img.shields.io/github/license/ahmedadelfahim/sanitizer-xss) ![npm](https://img.shields.io/npm/v/sanitizer-xss) ![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/sanitizer-xss) ![npm](https://img.shields.io/npm/dt/sanitizer-xss)
## Installation
```bash
$ npm i sanitizer-xss
```
## Usage

You can sanitize your data (object, array, string,etc) on the fly.
```
const Sanitizer = require('sanitizer-xss').default;

// ...
      data = Sanitizer.sanitize(data)
// or
      data = Sanitizer.sanitize(data, {allowedKeys: ['name']})
// ...
```
## Support
Feel free to open issues on [github](https://github.com/AhmedAdelFahim/sanitizer-xss.git).
