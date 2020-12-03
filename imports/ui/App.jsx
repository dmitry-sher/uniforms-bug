import React, { useState } from "react";
import SimpleSchema from "simpl-schema";
import { SimpleSchema2Bridge } from "uniforms-bridge-simple-schema-2";
import {
  AutoField,
  AutoForm,
  ErrorsField,
  SubmitField,
} from "uniforms-semantic";

const schema1 = new SimpleSchema2Bridge(
  new SimpleSchema({
    passport: {
      type: Array,
      label: "Passport",
      minCount: 1,
    },
    "passport.$": {
      type: String,
      label: "Passport #",
    },
  })
);

const schema2a = new SimpleSchema({
  country: String,
  documents: {
    type: Array,
    minCount: 1,
  },
  "documents.$": String,
});

const schema2 = new SimpleSchema2Bridge(
  new SimpleSchema({
    passport: {
      type: Array,
      label: "Passport",
      minCount: 1,
    },
    "passport.$": {
      type: schema2a,
      label: "Passport #",
    },
  })
);

export const App = () => {
  const [log, setLog] = useState([]);

  const addLog = (msg) => {
    console.log(msg);
    setLog([...log, msg]);
  }

  const onChange = (key, value) =>
    addLog("App.onChange. key, value: " + JSON.stringify({ key, value }));
  const onSubmit = (doc) => addLog("App.onSubmit. doc: " + JSON.stringify(doc));
  const onChange2 = (key, value) =>
    addLog("App.onChange2. key, value: " + JSON.stringify({ key, value }));
  const onSubmit2 = (doc) =>
    addLog("App.onSubmit2. doc: " + JSON.stringify(doc));
  const model1 = { passport: [] };
  const model2 = { passport: [] };

  return (
    <div>
      <h1>Welcome to uniforms list bug explorer project!</h1>
      <h2>Form 1</h2>
      <AutoForm
        schema={schema1}
        model={model1}
        onChange={onChange}
        onSubmit={onSubmit}
      >
        <AutoField name="passport" />
        <ErrorsField />
        <SubmitField />
      </AutoForm>
      <hr />
      <AutoForm
        schema={schema2}
        model={model2}
        onChange={onChange2}
        onSubmit={onSubmit2}
      >
        <AutoField name="passport" />
        <ErrorsField />
        <SubmitField />
      </AutoForm>

      <div className="log">
        {log.map((l, i) => (
          <div key={`log-${i}`}>{l}</div>
        ))}
      </div>
    </div>
  );
};
