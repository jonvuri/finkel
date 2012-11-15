#!/bin/sh

function redecho() {
    tput setaf 1
    echo ${1}
    tput setaf 0
}

if [ $# -lt "1" ]; then
    echo "Usage: run_linters <file to be linted>"
    exit 1
fi

redecho "\nJavaScript Lint:"
jsl -nologo -process $1

redecho "\nJSLint:"
jslint --nomen --sloppy --vars $1

redecho "\nClosure compiler:"
closure-compiler --summary_detail_level 3 --js_output_file /dev/null $1

