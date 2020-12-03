# Uniforms List Add Bug demo project

## Bug details

**Scenario**:
1. Open App.
2. Click on '+' icon in Form 2.

**Expectation**:

New object is unpopulated with empty documents list.

**Observed Result**:

New object is populated with one empty document in list.

## Demo

1. Install Meteor: https://www.meteor.com/install
2. Install node modules: `npm install`
3. Run project: `meteor run`
4. Open project in browser: http://localhost:3000

## Versions

1. Uniforms: all 3.x
2. Meteor: 1.10, 1.11
3. React: 16.8+

## Bug explanation

When adding a complex object to a list, we don't want any fields of this object to be populated unless they have some defaultValue set. This goes even more important for the lists that must be populated by user.

Imagine we have a list of documents that user should upload. For each document he should have a country name document is related to, and file. We store files in document as file ids. File Backend is irrelevant. So we create this two schemas:

```js
// single object schema
const schema2a = new SimpleSchema({
    country: String,
    documents: {
        type: Array,
        minCount: 1,
    },
    "documents.$": String,
});

// form schema
const schema2 = new SimpleSchema({
    passport: {
      type: Array,
      label: "Passport",
      minCount: 1,
    },
    "passport.$": {
      type: schema2a,
      label: "Passport #",
    },
});
```

When we add new document to list of documents, it should be unpopulated. But somehow `documents` field for newly created object contains one undefined value. Then on Submit click it passes validation. And that is wrong.
