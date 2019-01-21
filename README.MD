```javascript
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
    "string": "{{string}}",
    "int": {{int}},
    "float": "{{float}}",
    "stringWithNumber": "{{string}}-{{int}}",
    "date": "{{date | 'yyyy-MM-dd'}}",
    "child": "{{object.child}}"
    "rp": {{int === float}}
    "math": {{Math.round(float)}},
    "if": {{!date}}
  }
`;

```
