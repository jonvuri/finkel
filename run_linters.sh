#!/bin/sh

module=curry.js

function redecho() {
    tput setaf 1
    echo ${1}
    tput setaf 0
}

redecho "\nJavaScript Lint:"
jsl -nologo -process $module

redecho "\nJSLint:"
jslint --nomen --sloppy --vars $module

redecho "\nClosure compiler:"
closure-compiler --summary_detail_level 3 --js_output_file /dev/null $module

