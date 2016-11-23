var _ = require('lodash');

function getDepListAliases(depList) {

    var aliasStore = {},
        currPkg;

    _.each(depList, function(pkgVersion, pkgName) {

        if (!_.has(depList, pkgName)) return;

        currPkg = require('./node_modules/' + pkgName + '/package.json');

        if (!currPkg.moduleAliases) return;

        console.log("Adding aliases from: " + currPkg.name);

        aliasStore = _.extend(aliasStore, currPkg.moduleAliases);
    });

    return aliasStore;
};

module.exports = function(pkg) {

    var depsAliases = getDepListAliases(pkg.dependencies),
        devDepsAliases = getDepListAliases(pkg.devDependencies);

    return _.extend(devDepsAliases, depsAliases);
};