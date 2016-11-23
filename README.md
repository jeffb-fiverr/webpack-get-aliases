# webpack-get-aliases
### by Jeff Borders (@jeffb-fiverr)

> Get all aliases contained in package.json dependencies and dev-dependency packages



##### This is a small webpack helper designed to automatically get "moduleAliases" from dependencies in the calling repo's package.json file, easing the workflow when requiring assets.

## Example use-case:

##### "package-a" package.json:
```json
dependencies: {
    "package-b" : "^1.0.0",
}
```

##### "package-b" directory structure:
```json
package-b/
 - dist/
   - js/
     - index.js
     - MyFile.js
     - MyOtherFile.js
 - package.json
 ```

##### "package-b" package.json
```json
{
  "moduleAliases" : {
    "package-b/MyFile" : "package-b/dist/js/MyFile"
  }
}
```

`webpack-get-aliases` will read that property in the package.json file and add that alias to the webpack config.

## Usage
#### package.json
```json
{
  "dependencies" : {
    "@fiverr/webpack-get-aliases" : "1.0.0"
  }
}
```
#### webpack.config.js
```js
const pkgJson = require('./package.json');
const getAliases = require('@fiverr/webpack-get-aliases');

module.exports = {
  ...
  resolve: {
    alias: getAliases(pkgJson)
  }
}
```

#### JS
Instead of:
```js
import MyFile from 'package-b/dist/js/MyFile';
```

Now you can do (based on the `moduleAliases` property in `package-b/package.json`):
```js
import MyFile from 'package-b/MyFile';
```