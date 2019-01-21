'use strict';

/**
 * Created by park9eon on 2019-01-16
 */
const obj = {
    string: "String",
    int: 1,
    float: 1.2,
    date: new Date(),
    object: {
        child: "child"
    }
};

const template = `
{
    "string": it.string,
    "int": it.int,
    "float": it.float,
    "date": it.date,
    "dateString": it.date.toString(),
    "object": it.object,
    "child": it.object && it.object.child,
    "boolean": it.int === it.float,
    "list": [it.int, it.float],
    "eval": [eval('global'), module, Function, require, process],
    "self": {
        "int": it.int,
    },
    "math": Math.floor(it.float),
    ["nameWithString" + it.int]: "nameWithString" + it.int
};
`;

function render(object, template) {
    function func(object) {
        return new Function("it",
            // language=JavaScript
            `"use strict";
            const process = undefined;
            const require = undefined;
            const Function = undefined;
            const module = undefined;
            const console = undefined;
            const template = ${template};
            return template;
        `).bind(object)(object);
    }

    if (Array.isArray(object)) {
        return object.map(func)
    } else {
        return func(object);
    }
}

const result = render([obj], template);
console.log(result);
