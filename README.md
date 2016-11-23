# webpack-get-aliases

> Get all aliases contained in package.json dependencies and dev-dependency packages

##### This is a small webpack helper designed to automatically get "moduleAliases" from dependencies in the calling repo's package.json file, easing the workflow when requiring assets.

## Usage
#### package.json
```
{
  "dependencies" : {
    "@fiverr/webpack-get-aliases" : "1.0.0"
  }
}
```
#### webpack.config.js
```
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
```
import MyFile from 'package-b/dist/js/MyFile';
```

Now you can do (based on the `moduleAliases` property in `package-b/package.json`):
```
import MyFile from 'package-b/MyFile';
```

## Example use-case:

##### "package-a" package.json:
```
dependencies: {
    "package-b" : "^1.0.0",
}
```

##### "package-b" directory structure:
```
package-b/
 - dist/
   - js/
     - index.js
     - MyFile.js
     - MyOtherFile.js
 - package.json
 ```

##### "package-b" package.json
```
{
  "moduleAliases" : {
    "package-b/MyFile" : "package-b/dist/js/MyFile"
  }
}
```

`webpack-get-aliases` will read that property in the package.json file and add that alias to the webpack config.