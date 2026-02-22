"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";
import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true });

const SAMPLE_SCHEMA = JSON.stringify({
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "integer", minimum: 0 },
    email: { type: "string", format: "email" },
  },
  required: ["name", "age"],
}, null, 2);

const SAMPLE_DATA = JSON.stringify({
  name: "Alice",
  age: 30,
  email: "alice@example.com"
}, null, 2);

export default function JsonSchemaValidator() {
  const [schema, setSchema] = useState(SAMPLE_SCHEMA);
  const [data, setData] = useState(SAMPLE_DATA);
  const [result, setResult] = useState<{ valid: boolean; errors: string[] } | null>(null);

  const validate = () => {
    try {
      const parsedSchema = JSON.parse(schema);
      const parsedData = JSON.parse(data);
      const validate = ajv.compile(parsedSchema);
      const valid = validate(parsedData);
      setResult({
        valid: !!valid,
        errors: (validate.errors || []).map((e) => `${e.instancePath || "(root)"} ${e.message}`),
      });
    } catch (e) {
      setResult({ valid: false, errors: [(e as Error).message] });
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>JSON Schema</Label>
          <Textarea
            className="h-72 resize-none"
            value={schema}
            onChange={(e) => setSchema(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>JSON Data</Label>
          <Textarea
            className="h-72 resize-none"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={validate}>Validate</Button>
        <Button variant="ghost" onClick={() => setResult(null)}>Clear Result</Button>
      </div>

      {result && (
        <div className={`rounded-md border p-4 space-y-2 ${result.valid ? "border-green-500 bg-green-50 dark:bg-green-950" : "border-destructive bg-destructive/10"}`}>
          <div className="flex items-center gap-2">
            {result.valid ? (
              <><CheckCircle className="h-5 w-5 text-green-600" /><Badge className="bg-green-100 text-green-700">Valid</Badge></>
            ) : (
              <><XCircle className="h-5 w-5 text-destructive" /><Badge variant="destructive">Invalid</Badge></>
            )}
          </div>
          {result.errors.length > 0 && (
            <ul className="space-y-1">
              {result.errors.map((err, i) => (
                <li key={i} className="text-sm text-destructive font-mono">• {err}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
