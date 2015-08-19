mongodb-minimal
===============
pure javascript version of mongodb-client @ https://www.npmjs.com/package/mongodb with zero npm-dependencies

[![NPM](https://img.shields.io/npm/v/mongodb-minimal.svg?style=flat-square)](https://www.npmjs.org/package/mongodb-minimal)



# screen-capture
[![screen-capture](https://kaizhu256.github.io/node-mongodb-minimal/build/screen-capture.testExampleJs.svg)](https://kaizhu256.github.io/node-mongodb-minimal/build/screen-capture.testExampleJs.svg)



# build-status [![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-mongodb-minimal.svg)](https://travis-ci.org/kaizhu256/node-mongodb-minimal)

[![build commit status](https://kaizhu256.github.io/node-mongodb-minimal/build/build.badge.svg)](https://travis-ci.org/kaizhu256/node-mongodb-minimal)

| git-branch : | [master](https://github.com/kaizhu256/node-mongodb-minimal/tree/master) | [beta](https://github.com/kaizhu256/node-mongodb-minimal/tree/beta) | [alpha](https://github.com/kaizhu256/node-mongodb-minimal/tree/alpha)|
|--:|:--|:--|:--|
| test-report : | [![test-report](https://kaizhu256.github.io/node-mongodb-minimal/build..master..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-mongodb-minimal/build..master..travis-ci.org/test-report.html) | [![test-report](https://kaizhu256.github.io/node-mongodb-minimal/build..beta..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-mongodb-minimal/build..beta..travis-ci.org/test-report.html) | [![test-report](https://kaizhu256.github.io/node-mongodb-minimal/build..alpha..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-mongodb-minimal/build..alpha..travis-ci.org/test-report.html)|
| coverage : | [![istanbul-lite coverage](https://kaizhu256.github.io/node-mongodb-minimal/build..master..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-mongodb-minimal/build..master..travis-ci.org/coverage.html/index.html) | [![istanbul-lite coverage](https://kaizhu256.github.io/node-mongodb-minimal/build..beta..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-mongodb-minimal/build..beta..travis-ci.org/coverage.html/index.html) | [![istanbul-lite coverage](https://kaizhu256.github.io/node-mongodb-minimal/build..alpha..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-mongodb-minimal/build..alpha..travis-ci.org/coverage.html/index.html)|
| build-artifacts : | [![build-artifacts](https://kaizhu256.github.io/node-mongodb-minimal/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-mongodb-minimal/tree/gh-pages/build..master..travis-ci.org) | [![build-artifacts](https://kaizhu256.github.io/node-mongodb-minimal/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-mongodb-minimal/tree/gh-pages/build..beta..travis-ci.org) | [![build-artifacts](https://kaizhu256.github.io/node-mongodb-minimal/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-mongodb-minimal/tree/gh-pages/build..alpha..travis-ci.org)|

#### master branch
- stable branch
- HEAD should be tagged, npm-published package

#### beta branch
- semi-stable branch
- HEAD should be latest, npm-published package

#### alpha branch
- unstable branch
- HEAD is arbitrary
- commit history may be rewritten



# documentation
#### this package statically includes
- bson@0.4.11
- mongodb@2.0.42
- mongodb-core@1.2.10
- nedb@1.1.2

#### [api-doc](https://kaizhu256.github.io/node-mongodb-minimal/build/doc.api.html)

[![api-doc](https://kaizhu256.github.io/node-mongodb-minimal/build/screen-capture.docApiCreate.slimerjs._2Fhome_2Ftravis_2Fbuild_2Fkaizhu256_2Fnode-mongodb-minimal_2Ftmp_2Fbuild_2Fdoc.api.html.png)](https://kaizhu256.github.io/node-mongodb-minimal/build/doc.api.html)



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
    maxlen: 96,
    node: true,
    nomen: true,
    stupid: true
*/

(function () {
    'use strict';
    // run node js-env code
    (function () {
        var local, modeNext, onNext;
        // init local;
        local = global.local = {};
        // require modules
        try {
            local.mongodb = require('mongodb-minimal');
        } catch (errorCaught) {
            local.mongodb = require('./node_modules/mongodb.js');
        }
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
                local.mongodb.MongoClient.connect(
                    'mongodb://localhost:27017/test',
                    onNext
                );
                break;
            case 2:
                local.db = data;
                console.log('connected to mongodb server');
                onNext();
                break;
            case 3:
                local.collection = local.db.collection('TestMongodbMinimal');
                local.document = {
                    _id: Math.random().toString(16),
                    value: 'hello'
                };
                console.log('inserting document into collection - ' +
                    JSON.stringify(local.document));
                local.collection.insert(local.document, onNext);
                break;
            case 4:
                console.log('updating document in collection');
                local.collection.update(
                    { _id: local.document._id },
                    { $set: { value: 'bye' } },
                    onNext
                );
                break;
            case 5:
                console.log('finding document in collection');
                local.collection.findOne({ _id: local.document._id }, onNext);
                break;
            case 6:
                console.log('found document in collection - ' +
                    JSON.stringify(data));
                onNext();
                break;
            case 7:
                console.log('removing document from collection');
                local.collection.remove({ _id: local.document._id }, onNext);
                break;
            case 8:
                global.data = data;
                console.log('removed ' + data.result.n +
                    ' document from collection');
                onNext();
                break;
            default:
                if (error) {
                    throw error;
                }
                console.log('disconnecting from mongodb server');
                local.db.close();
                // internal test-script
                if (process.env.npm_config_mode_npm_test) {
                    require('utility2').testRun({
                        testCase_example_default: function (options, onError) {
                            // jslint-hack
                            require('utility2').nop(options);
                            onError();
                        }
                    });
                }
            }
        };
        onNext();
    }());
}());
```

#### output from shell
[![screen-capture](https://kaizhu256.github.io/node-mongodb-minimal/build/screen-capture.testExampleJs.svg)](https://travis-ci.org/kaizhu256/node-mongodb-minimal)



# npm-dependencies
- none



# package-listing
[![screen-capture](https://kaizhu256.github.io/node-mongodb-minimal/build/screen-capture.gitLsTree.svg)](https://github.com/kaizhu256/node-mongodb-minimal)



# package.json
```json
{
    "author": "kai zhu <kaizhu256@gmail.com>",
    "description": "pure javascript version of mongodb-client @ \
https://www.npmjs.com/package/mongodb with zero npm-dependenciess",
    "devDependencies": {
        "phantomjs-lite": "^2015.8.2",
        "utility2": "~2015.8.5"
    },
    "engines": { "node": ">=0.10 <=0.12" },
    "keywords": [
        "client",
        "driver",
        "mongo", "mongodb"
    ],
    "license": "MIT",
    "main": "node_modules/mongodb.js",
    "name": "mongodb-minimal",
    "os": ["darwin", "linux"],
    "repository" : {
        "type" : "git",
        "url" : "https://github.com/kaizhu256/node-mongodb-minimal.git"
    },
    "scripts": {
        "build-ci": "node_modules/.bin/utility2 shRun shReadmeBuild",
        "build-doc": "node_modules/.bin/utility2 shRun shReadmeExportPackageJson && \
node_modules/.bin/utility2 shRun shDocApiCreate \"{\
exampleFileList:[\
'example.js',\
'node_modules/mongodb.js',\
'mongodb/test/functional',\
'mongodb/lib',\
'mongodb/lib/gridfs',\
'mongodb-core/lib/connection',\
'mongodb-core/lib/topologies'\
],\
moduleDict:{\
'mongodb':{aliasList:[''],exports:require('./node_modules/mongodb')},\
'mongodb.Collection':{\
aliasList:['col','collection'],\
exports:require('./node_modules/mongodb').Collection.prototype\
},\
'mongodb.MongoClient':{exports:require('./node_modules/mongodb').MongoClient},\
'mongodb.bson':{aliasList:['','.'],exports:require('./node_modules/mongodb').bson},\
'mongodb.core':{aliasList:[''],exports:require('./node_modules/mongodb').core},\
}\
}\"",
        "postinstall": "mkdir -p node_modules && \
printf \"module.exports = require('../bson/browser_build/bson.js')(); \
module.exports.native = module.exports.pure = function () { \
    return module.exports; \
}; \
module.exports.ObjectId = module.exports.ObjectID; \
\" > \
node_modules/bson.js && \
printf \"module.exports = require('../es6-promise');\" > \
node_modules/es6-promise.js && \
printf \" \
module.exports = require('../mongodb'); \
module.exports.bson = require('bson'); \
module.exports.core = require('mongodb-core'); \
\" > \
node_modules/mongodb.js && \
printf \"module.exports = require('../mongodb-core');\" > \
node_modules/mongodb-core.js",
        "start": "node_modules/.bin/utility2 shRun shReadmeExportPackageJson && \
npm run-script postinstall && \
node_modules/.bin/utility2 shRun shReadmeExportFile example.js example.js && \
node_modules/.bin/utility2 start example.js",
        "test": "node_modules/.bin/utility2 shRun shReadmeExportPackageJson && \
npm run-script postinstall && \
node_modules/.bin/utility2 shRun shReadmeExportFile example.js example.js && \
node_modules/.bin/utility2 test example.js"
    },
    "version": "2015.8.1"
}
```



# todo
- none



# change since 01051b48
- npm publish 2015.8.1
- add api documentation
- add npm-script build-doc
- none



# changelog of last 50 commits
[![screen-capture](https://kaizhu256.github.io/node-mongodb-minimal/build/screen-capture.gitLog.svg)](https://github.com/kaizhu256/node-mongodb-minimal/commits)



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
    shRun shNpmTestPublished || return $?

    # test example js script
    MODE_BUILD=testExampleJs shRunScreenCapture shReadmeTestJs example.js || return $?

    # run npm-test
    MODE_BUILD=npmTest shRunScreenCapture npm test || return $?

    # create api-doc
    npm run-script build-doc || return $?
}
shBuild

# save exit-code
EXIT_CODE=$?
# create package-listing
MODE_BUILD=gitLsTree shRunScreenCapture shGitLsTree || exit $?
# create recent changelog of last 50 commits
MODE_BUILD=gitLog shRunScreenCapture git log -50 --pretty="%ai\u000a%B" || exit $?
# if running legacy-node, then do not continue
[ "$(node --version)" \< "v0.12" ] && exit $EXIT_CODE
# upload build-artifacts to github, and if number of commits > 16, then squash older commits
COMMIT_LIMIT=16 shBuildGithubUpload || exit $?
exit $EXIT_CODE
```
