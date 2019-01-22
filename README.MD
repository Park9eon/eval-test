```javascript
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
```
