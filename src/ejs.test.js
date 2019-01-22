'use strict';

/**
 * Created by park9eon on 2019-01-22
 */
const ejs = require('ejs');
const JSON5 = require('json5');

const obj = {
    string: "String",
    int: 1,
    float: 1.2,
    date: new Date(),
    object: {
        child: "child"
    },
    list: [1, 2, 3],
};


const template = `
{
    "string": "<%= string %>",
    "int": <%= int %>,
    "float": <%= float %>,
    "date": "<%= date %>",
    "dateString": "<%= date.toString() %>",
    "object": "<%= JSON.stringify(object) %>",
    "child": "<%= object.child %>",
    "boolean": <%= int === float %>,
    "list": [<%= list %>],
    "customList": [<%= [int, float] %>],
    "self": {
        "int": <%= int %>,
    },
    "math": <%= Math.floor(float) %>,
    "listWithMap": [
    <% list.forEach(function (n, index) { %>
        <%= n + 1 %><%= index < list.length - 1 ? "," : '' %>
    <% }); %>
    ],
}
`;

// "attach": "<%= process.exit(333); %>" // 종료: 333!

function render(obj, template) {
    function func(obj) {
        return JSON5.parse(ejs.render(template, obj));
    }

    if (Array.isArray(obj)) {
        return obj.map(i => func(i));
    } else {
        return func(obj);
    }
}

const cpuUsage = process.cpuUsage();

for (let i = 0; i < 10000; i++) {
    console.log(render([obj], template));
    console.log(`MEM : ${process.memoryUsage().heapTotal * 1e-6}MB`);
}

console.log(process.cpuUsage(cpuUsage));
