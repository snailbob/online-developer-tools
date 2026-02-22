"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// ~200-word EFF short list for browser-only passphrases
const WORDLIST = [
  "apple","actor","badge","beach","brave","cabin","cedar","chess","civil","clock",
  "coral","cream","crowd","crown","cycle","dance","depth","disco","diver","dizzy",
  "donor","draft","dread","dress","drill","drink","droop","drove","duchy","dunes",
  "early","earth","eight","elite","ember","empty","epoch","equip","event","every",
  "exact","extra","fable","facet","fancy","fauna","feast","ferry","fever","fiber",
  "field","fifty","finch","flame","flash","fleet","flesh","float","flood","floss",
  "flour","flown","flute","focal","focus","folly","force","forge","forth","forum",
  "found","front","frost","fruit","fungi","funky","gains","giant","glade","glare",
  "gloss","glove","gnome","going","grace","grade","grain","grape","grasp","greet",
  "grind","groan","gross","grove","grunt","guard","guide","guild","guise","gusto",
  "happy","harsh","haven","hello","heron","hobby","honey","hotel","house","human",
  "humor","icing","ideal","image","inbox","indie","infer","inner","input","ivory",
  "jelly","jewel","joker","judge","jumbo","juror","kayak","knack","knife","knock",
  "label","laser","later","layer","leach","leafy","leaky","learn","least","legal",
  "lemon","level","light","lilac","limit","linen","liner","liver","lobby","local",
  "logic","loose","lotus","lucky","lunar","lunch","lusty","magic","maker","marble",
  "marsh","media","merit","metal","model","month","moral","motor","mount","music",
  "naive","nerve","night","noble","north","noter","novel","nurse","oasis","ocean",
  "offer","olive","onset","opera","optic","orbit","order","other","outer","owner",
];

function generatePassphrase(wordCount: number, sep: string, capitalize: boolean, addNumber: boolean): string {
  const arr = new Uint32Array(wordCount);
  crypto.getRandomValues(arr);
  let words = Array.from(arr).map((n) => {
    const word = WORDLIST[n % WORDLIST.length];
    return capitalize ? word.charAt(0).toUpperCase() + word.slice(1) : word;
  });
  const phrase = words.join(sep);
  if (addNumber) {
    const numArr = new Uint32Array(1);
    crypto.getRandomValues(numArr);
    return phrase + sep + (numArr[0] % 100).toString();
  }
  return phrase;
}

export default function PassphraseGenerator() {
  const [wordCount, setWordCount] = useState(4);
  const [separator, setSeparator] = useState("-");
  const [capitalize, setCapitalize] = useState(false);
  const [addNumber, setAddNumber] = useState(false);
  const [passphrase, setPassphrase] = useState("");

  const gen = () => {
    setPassphrase(generatePassphrase(wordCount, separator, capitalize, addNumber));
  };

  return (
    <div className="space-y-5 max-w-lg">
      <div className="space-y-2">
        <Label>Word count: <strong>{wordCount}</strong></Label>
        <Slider min={2} max={10} step={1} value={[wordCount]} onValueChange={([v]) => setWordCount(v)} />
      </div>
      <div className="space-y-1">
        <Label>Separator</Label>
        <Select value={separator} onValueChange={setSeparator}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {["-", "_", ".", " ", "/", "|"].map((s) => (
              <SelectItem key={s} value={s}>{s === " " ? "(space)" : s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={capitalize} onChange={(e) => setCapitalize(e.target.checked)} className="w-4 h-4" />
          <span className="text-sm">Capitalize words</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={addNumber} onChange={(e) => setAddNumber(e.target.checked)} className="w-4 h-4" />
          <span className="text-sm">Append random number</span>
        </label>
      </div>
      <Button onClick={gen}>Generate</Button>
      {passphrase && (
        <div className="flex gap-2">
          <Input readOnly value={passphrase} className="font-mono" />
          <Button variant="outline" onClick={() => { navigator.clipboard.writeText(passphrase); toast.success("Copied!"); }}>
            Copy
          </Button>
        </div>
      )}
    </div>
  );
}
