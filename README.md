mongodb-minimal
===============
pure javascript version of https://www.npmjs.com/package/mongodb with zero npm dependencies

[![NPM](https://img.shields.io/npm/v/mongodb-minimal.svg?style=flat-square)](https://www.npmjs.org/package/mongodb-minimal)



# documentation
[https://www.npmjs.com/package/mongodb](https://www.npmjs.com/package/mongodb)



# screen-capture
[![screen-capture](https://kaizhu256.github.io/node-mongodb-minimal/build/screen-capture.testExampleJs.png)](https://kaizhu256.github.io/node-mongodb-minimal/build/screen-capture.testExampleJs.png)



# build-status [![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-mongodb-minimal.svg)](https://travis-ci.org/kaizhu256/node-mongodb-minimal)

| git-branch : | [master](https://github.com/kaizhu256/node-mongodb-minimal/tree/master) | [beta](https://github.com/kaizhu256/node-mongodb-minimal/tree/beta) | [alpha](https://github.com/kaizhu256/node-mongodb-minimal/tree/alpha)|
|--:|:--|:--|:--|
| build-artifacts : | [![build-artifacts](https://kaizhu256.github.io/node-mongodb-minimal/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-mongodb-minimal/tree/gh-pages/build..master..travis-ci.org) | [![build-artifacts](https://kaizhu256.github.io/node-mongodb-minimal/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-mongodb-minimal/tree/gh-pages/build..beta..travis-ci.org) | [![build-artifacts](https://kaizhu256.github.io/node-mongodb-minimal/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-mongodb-minimal/tree/gh-pages/build..alpha..travis-ci.org)|

#### master branch
- stable branch
- HEAD should be tagged, npm-published package

#### beta branch
- stable branch
- HEAD should be latest, npm-published package

#### alpha branch
- unstable branch
- HEAD is arbitrary
- commit history may be rewritten



# quickstart node example

#### to run this example, follow the instruction in the script below
- example.js

```javascript
/*
example.js

this node script will connect to mongodb://localhost:27017/test

instruction
    1. start mongodb server on localhost
    2. save this js script as example.js
    3. run the shell command:
        $ npm install mongodb-minimal && node example.js
*/

/*jslint
    maxerr: 8,
    maxlen: 80,
    node: true,
    nomen: true,
    stupid: true
*/

(function () {
    'use strict';
    // run node js-env code
    (function () {
        var db, mongodb_minimal, modeNext, onNext;
        // require modules
        mongodb_minimal = require('mongodb-minimal');
        // sequentially run io operations
        modeNext = 0;
        onNext = function (error, data) {
            modeNext = error
                ? Infinity
                : modeNext + 1;
            console.log('step ' + modeNext);
            switch (modeNext) {
            case 1:
                console.log('connecting to mongodb server');
                mongodb_minimal.MongoClient.connect(
                    'mongodb://localhost:27017/test',
                    onNext
                );
                break;
            case 2:
                db = data;
                console.log('connected to mongodb server');
                onNext();
                break;
            default:
                if (error) {
                    throw error;
                }
                console.log('disconnecting from mongodb server');
                db.close();
            }
        };
        onNext();
    }());
}());
```

#### output from shell
[![screen-capture](https://kaizhu256.github.io/node-mongodb-minimal/build/screen-capture.testExampleJs.png)](https://travis-ci.org/kaizhu256/node-mongodb-minimal)



# npm-dependencies
- none



# package-listing
[![screen-capture](https://kaizhu256.github.io/node-mongodb-minimal/build/screen-capture.gitLsTree.png)](https://github.com/kaizhu256/node-mongodb-minimal)



# package.json
```json
{
    "author": "kai zhu <kaizhu256@gmail.com>",
    "description": "pure javascript version of \
https://www.npmjs.com/package/mongodb with zero npm dependencies",
    "devDependencies": {
        "utility2": "2015.6.1-b"
    },
    "engines": { "node": ">=0.10 <=0.12" },
    "license": "MIT",
    "main": "node_modules/mongodb/index.js",
    "name": "mongodb-minimal",
    "os": ["darwin", "linux"],
    "repository" : {
        "type" : "git",
        "url" : "https://github.com/kaizhu256/node-mongodb-minimal.git"
    },
    "scripts": {
        "build-ci": "node_modules/.bin/utility2 shRun shReadmeBuild",
        "preinstall": "rm -fr node_modules && \
mkdir -p node_modules && \
ln -s ../bson node_modules/bson && \
ln -s ../mongodb node_modules/mongodb && \
ln -s ../mongodb-core node_modules/mongodb-core",
        "test": "node_modules/.bin/utility2 shRun shReadmeExportPackageJson"
    },
    "version": "2.0.33-2015.06.01-b"
}
```



# todo
- none



# change since 9fe8c225
- npm publish 2.0.33-2015.06.01-b
- none



# changelog of last 50 commits
[![screen-capture](https://kaizhu256.github.io/node-mongodb-minimal/build/screen-capture.gitLog.png)](https://github.com/kaizhu256/node-mongodb-minimal/commits)



# internal build-script
- build.sh

```shell
# build.sh

# this shell script will run the build for this package
shBuild() {
    # this function will run the main build
    # init env
    export npm_config_mode_slimerjs=1 || return $?
    . node_modules/.bin/utility2 && shInit || return $?

    # run npm-test on published package
    shNpmTestPublished || return $?

    # run npm-test
    MODE_BUILD=npmTest shRunScreenCapture npm test || return $?

    # test example js script
    MODE_BUILD=testExampleJs \
        shRunScreenCapture shReadmeTestJs example.js || return $?

    # if running legacy-node, then do not continue
    [ "$(node --version)" \< "v0.12" ] && return

    # if number of commits > 1024, then squash older commits
    shGitBackupAndSquashAndPush 1024 > /dev/null || return $?
}
shBuild

# save exit-code
EXIT_CODE=$?

shBuildCleanup() {
    # this function will cleanup build-artifacts in local build dir
    # create package-listing
    MODE_BUILD=gitLsTree shRunScreenCapture shGitLsTree || return $?
    # create recent changelog of last 50 commits
    MODE_BUILD=gitLog shRunScreenCapture git log -50 --pretty="%ai\u000a%B" || \
        return $?
}
shBuildCleanup || exit $?

shBuildGithubUploadCleanup() {
    # this function will cleanup build-artifacts in local gh-pages repo
    return
}

# if running legacy-node, then do not continue
[ "$(node --version)" \< "v0.12" ] && exit $EXIT_CODE

# upload build-artifacts to github,
# and if number of commits > 16, then squash older commits
COMMIT_LIMIT=16 shBuildGithubUpload || exit $?

# exit with $EXIT_CODE
exit $EXIT_CODE
```
