'use strict';

/**
 * Created by park9eon on 2019-01-16
 */
const {VM} = require('vm2');

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
    "string": string,
    "int": int,
    "float": float,
    "date": date,
    "dateString": date.toString(),
    "object": object,
    "child": object && object.child,
    "boolean": int === float,
    "list": list,
    "customList": [int, float],
    "self": {
        "int": int,
    },
    "math": Math.floor(float),
    ["nameWString" + int]: "nameWString" + int,
    "listWithMap": list.map(n => n + 1),
};
`;

function render(obj, template) {
    function func(obj) {
        return new VM({sandbox: obj}).run(`
            const _ = ${template};_;
        `)
    }

    if (Array.isArray(obj)) {
        return obj.map((item) => func(item));
    } else {
        return func(obj)
    }
}

const cpuUsage = process.cpuUsage();

for (let i = 0; i < 10000; i++) {
    console.log(render([obj], template));
    console.log(`MEM : ${process.memoryUsage().heapTotal * 1e-6}MB`);
}

// VM 사용
// MEM : 96.71475199999999MB
// { user: 9447318, system: 934638 }

// 단순 포문
// MEM : 17.022976MB
// { user: 121796, system: 27970 }

console.log(process.cpuUsage(cpuUsage));
