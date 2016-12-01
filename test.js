/* istanbul instrument in package mongodb-minimal */
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 8,
    maxlen: 96,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
(function () {
    'use strict';
    var local;



    // run shared js-env code - pre-init
    (function () {
        // init Error.stackTraceLimit
        Error.stackTraceLimit = 20;
        // init local
        local = {};
        // init modeJs
        local.modeJs = 'node';
        // init global
        local.global = global;
        switch (local.modeJs) {
        // re-init local from example.js
        case 'node':
            local = global.local = (local.global.utility2_rollup || require('utility2'))
                .requireExampleJsFromReadme();
            break;
        }
    }());
    switch (local.modeJs) {



    // run node js-env code - function
    case 'node':
        local.testCase_build_doc = function (options, onError) {
        /*
         * this function will test build's doc handling-behavior
         */
            options = {};
            options.exampleFileList = [
                'README.md',
                './mongodb/README.md',
                'test.js',
                local.env.npm_package_main + '.js'
            ];
            local.buildDoc(options, onError);
        };
        break;
    }
    switch (local.modeJs) {



    // run node js-env code - post-init
    case 'node':
        // run test-server
        local.testRunServer(local);
        break;
    }
}());
