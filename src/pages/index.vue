<script setup lang="ts">
import Nav from '@/components/nav.vue';
import Link from '@/components/link.vue';
</script>

<template>
  <div class="container">
    <Nav></Nav>
    <div class="first-page">
      <div class="describe">
        <div class="gradient-font">Pivot Lang</div>
        <div class="gradient-font">High-performance</div>
        <div class="gradient-font">New Generation Language</div>
        <div class="detail-describe">Pivot Lang language server was compiled to web assembly to provide your language
          supports, right from your browser.</div>
      </div>
      <div id="container" style="height: 80%;top: 10%;left: 55%; width: 40%;position: absolute;"></div>
      <div class="bottom">
        <div @click="create" class="start-button" style="cursor:pointer;">Try It</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import * as pl from "../plc";
import * as monaco from 'monaco-editor';
import * as tp from 'vscode-languageserver-types';



// Register a new language
monaco.languages.register({ id: "mySpecialLanguage" });

// Register a tokens provider for the language
monaco.languages.setMonarchTokensProvider("mySpecialLanguage", {
  tokenizer: {
    root: [
      // [/if|while|for|return|else|break|continue|struct|fn|let|use|const|true|false|impl|self|trait|pub|where|macro|type|as|is*/, "keyword"],
      [/if|while|for|return|else|break|continue|struct|fn|let|use|const|true|false|impl|self|trait|pub|where|macro|type|as|is/, "keyword"],
      [/\".*\"/, "string"],
      [/\[[a-zA-Z 0-9:]+\]/, "custom-date"],
    ],
  },
});

// Define a new theme that contains only rules that match this language
monaco.editor.defineTheme("myCoolTheme", {
  base: "vs-dark",
  inherit: true,
  colors: {},
  rules: [
    { token: "keyword", foreground: "ce63eb" },
    { token: "operator", foreground: "000000" },
    { token: "namespace", foreground: "66afce" },

    { token: "type", foreground: "1db010" },
    { token: "struct", foreground: "1db010", fontStyle: "underline" },
    { token: "class", foreground: "0000ff", fontStyle: "bold" },
    { token: "interface", foreground: "007700", fontStyle: "bold" },
    { token: "enum", foreground: "0077ff", fontStyle: "bold" },
    { token: "typeParameter", foreground: "1db010" },
    { token: "function", foreground: "94763a" },

    { token: "member", foreground: "94763a" },
    { token: "macro", foreground: "615a60" },
    { token: "variable", foreground: "3e5bbf" },
    { token: "parameter", foreground: "3e5bbf" },
    { token: "property", foreground: "3e5bbf" },
    { token: "label", foreground: "615a60" },
    { token: "method", foreground: "94763a", fontStyle: "bold" },

    { token: "type.static", fontStyle: "bold" },
    { token: "class.static", foreground: "ff0000", fontStyle: "bold" },
  ],
});

let created = false;

monaco.languages.registerInlayHintsProvider("mySpecialLanguage", {
  provideInlayHints(model, range, token) {
    // console.log(JSON.parse(pl.get_inlay_hints()))
    let hints: tp.InlayHint[] = JSON.parse(pl.get_inlay_hints());
    console.warn(hints)
    return {
      hints: hints.map(h => {
        return {
          kind: h.kind,
          label: h.label,
          position: {
            lineNumber: h.position.line + 1,
            column: h.position.character + 1
          }
        };
      })
    } as any;
  }

})
// Register a completion item provider for the new language
monaco.languages.registerCompletionItemProvider("mySpecialLanguage", {
  provideCompletionItems: (model, position) => {
    var word = model.getWordUntilPosition(position);
    var range = {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: word.startColumn,
      endColumn: word.endColumn,
    };
    let dynamic_suggestions = JSON.parse(pl.get_completions())
    for (let sug of dynamic_suggestions) {
      sug.insertTextRules = 0
      switch (sug.kind) {
        case 14:
          sug.kind = monaco.languages.CompletionItemKind.Keyword
          break;
        case 3:
          sug.kind = monaco.languages.CompletionItemKind.Function
          sug.insertTextRules = monaco.languages.CompletionItemInsertTextRule
            .InsertAsSnippet
          break;
        case 22:
          sug.kind = monaco.languages.CompletionItemKind.Struct
          break;
        case 13:
          sug.kind = monaco.languages.CompletionItemKind.Enum
          break;
        case 5:
          sug.kind = monaco.languages.CompletionItemKind.Field
          break;
        case 6:
          sug.kind = monaco.languages.CompletionItemKind.Variable
          break;
        case 2:
          sug.kind = monaco.languages.CompletionItemKind.Method
          break;
        case 25:
          sug.kind = monaco.languages.CompletionItemKind.TypeParameter
        case 9:
          sug.kind = monaco.languages.CompletionItemKind.Module
        case 21:
          sug.kind = monaco.languages.CompletionItemKind.Constant
          break;
        default:
          break;
      }
      if (sug.insertTextRules !== monaco.languages.CompletionItemInsertTextRule
        .InsertAsSnippet) {
        sug.insertText = sug.label
      }
    }
    console.warn(dynamic_suggestions)
    var suggestions = [
      {
        label: "for",
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: [
          "for let ${1:i} = 0; ${1:i} < ${2:count}; ${1:i} = ${1:i} + 1 {",
          "\t$0",
          "}"
        ].join("\n"),
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule
            .InsertAsSnippet,
        documentation: "A for loop",
        range: range,
      },
      {
        label: "fn",
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: [
          "fn ${1:name}() void {",
          "\t$0",
          "\treturn;",
          "}"
        ].join("\n"),
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule
            .InsertAsSnippet,
        documentation: "A function",
        range: range,
      },
      {
        label: "struct",
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: [
          "struct ${1:name} {",
          "\t$0",
          "}"
        ].join("\n"),
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule
            .InsertAsSnippet,
        documentation: "A struct",
        range: range,
      },
      {
        label: "trait",
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: [
          "trait ${1:name} {",
          "\tfn ${2:name}();",
          "}$0"
        ].join("\n"),
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule
            .InsertAsSnippet,
        documentation: "A trait",
        range: range,
      },
      {
        label: "if",
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: [
          "if ${1:condition} {",
          "\t$0",
          "}"
        ].join("\n"),
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule
            .InsertAsSnippet,
        documentation: "if statement",
        range: range,
      },
      {
        label: "ifel",
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: [
          "if ${1:condition} {",
          "\t$0",
          "} else {",
          "\t",
          "}"
        ].join("\n"),
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule
            .InsertAsSnippet,
        documentation: "if else statement",
        range: range,
      },
      {
        label: "impl",
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: [
          "impl ${1:st} {",
          "\t$0",
          "}"
        ].join("\n"),
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule
            .InsertAsSnippet,
        documentation: "impl block",
        range: range,
      },
      {
        label: "while",
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: [
          "while ${1:condition} {",
          "\t$0",
          "}"
        ].join("\n"),
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule
            .InsertAsSnippet,
        documentation: "while loop",
        range: range,
      },
      {
        label: "type",
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: [
          "type ${1:Name} = ${2:Type1} | ${3:Type2};"
        ].join("\n"),
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule
            .InsertAsSnippet,
        documentation: "union type",
        range: range,
      },
    ];
    suggestions = suggestions.concat(...dynamic_suggestions);
    return { suggestions: suggestions };
  },
});
// Generated by https://quicktype.io

export interface Diags {
  diagnostics: Diagnostic[];
  uri: string;
}

export interface Diagnostic {
  code: number;
  message: string;
  range: Range;
  relatedInformation: any[];
  severity: number;
  source: string;
}

export interface Range {
  end: End;
  start: End;
}

export interface End {
  character: number;
  line: number;
}

let first = true;
async function create() {
  if (created) {
    return
  }
  created = true
  let editor = monaco.editor.create(document.getElementById("container")!, {
    theme: "myCoolTheme",
    value: getCode(),
    language: "mySpecialLanguage",
    'semanticHighlighting.enabled': true,
    automaticLayout: true
  });
  let resp: Diags = JSON.parse(pl.set_init_content(getCode()));
  let markers = resp.diagnostics.map((d, n, a) => {
    let sev = monaco.MarkerSeverity.Warning
    if (d.severity === 1) {
      sev = monaco.MarkerSeverity.Error
    }
    return {
      severity: sev,
      startLineNumber: d.range.start.line + 1,
      startColumn: d.range.start.character + 1,
      endLineNumber: d.range.end.line + 1,
      endColumn: d.range.end.character + 1,
      message: d.message
    };
  })

  monaco.editor.setModelMarkers(editor.getModel()!, 'mySpecialLanguage', markers);
  monaco.languages.registerDocumentSemanticTokensProvider("mySpecialLanguage", {
    provideDocumentSemanticTokens: (m, id, token) => {
      if (first) {
        first = false;
        let tokens = pl.get_semantic_tokens_full();
        console.log(tokens)
        let a: any = {
          resultId: null,
          data: JSON.parse(tokens).data
        };
        return a;
      }
      let tokens = pl.get_semantic_tokens();
      console.error(tokens)
      return {
        resultId: null,
        edits: JSON.parse(tokens).edits
      };
    },
    getLegend: () => {
      let legend = pl.get_legend();
      console.error(legend)
      return JSON.parse(legend);
    },
    releaseDocumentSemanticTokens: () => {
    }
  });
  editor.getModel()?.onDidChangeContent((e) => {
    let re = e.changes.map((change) => {
      return {
        range: tp.Range.create(change.range.startLineNumber - 1, change.range.startColumn - 1, change.range.endLineNumber - 1, change.range.endColumn - 1),
        text: change.text,
        rangeLength: change.rangeLength,
      };
    });
    let resp: Diags = JSON.parse(pl.on_change_doc(JSON.stringify({
      textDocument: {
        version: 0,
        uri: "http://www.test.com/main.pi"
      },
      contentChanges: re
    })))
    console.log(resp);

    let markers = resp.diagnostics.map((d, n, a) => {
      let sev = monaco.MarkerSeverity.Warning
      if (d.severity === 1) {
        sev = monaco.MarkerSeverity.Error
      }
      return {
        severity: sev,
        startLineNumber: d.range.start.line + 1,
        startColumn: d.range.start.character + 1,
        endLineNumber: d.range.end.line + 1,
        endColumn: d.range.end.character + 1,
        message: d.message
      };
    })

    monaco.editor.setModelMarkers(editor.getModel()!, 'mySpecialLanguage', markers);
  });

}


function getCode() {
  return [
    "fn main() i64 {",
    "    let x = &A{};",
    "    let y = A{};",
    "    let z = &&A{};",
    "    let dd: TestTrait;",
    "    dd = x;",
    "    dd = y;",
    "    dd = z;",
    "    let re = dd.set(100);",
    "    test_generic();",
    "",
    "    return 0;",
    "}",
    "",
    "",
    "trait TestTrait {",
    "    fn name() void;",
    "",
    "    fn set(i: i64) i64;",
    "",
    "}",
    "",
    "pub struct A {",
    "    x: i64;",
    "}",
    "",
    "impl TestTrait for A {",
    "    fn name() void {",
    "        return;",
    "    }",
    "",
    "    fn set(i: i64) i64 {",
    "        self.x = i;",
    "        return i;",
    "    }",
    "",
    "}",
    "",
    "",
    "pub struct GenericType<S|T> {",
    "    x: S;",
    "    y: *T;",
    "}",
    "",
    "pub struct GenericOutter<S> {",
    "    x: GenericInner<S>;",
    "}",
    "",
    "pub struct GenericInner<T> {",
    "    x: T;",
    "}",
    "",
    "pub struct One<T> {",
    "    a: T;",
    "}",
    "",
    "pub struct Two<T> {",
    "    b: One<T>;",
    "}",
    "",
    "pub struct Three<S> {",
    "    c: Two<S>;",
    "}",
    "",
    "pub struct GenericSelfRef<T|S> {",
    "    x: *GenericSelfRef<T|S>;",
    "}",
    "",
    "pub fn ret_generic1<T>() Three<T> {",
    "    return Three<T>{};",
    "}",
    "",
    "pub fn ret_generic2<T>(x: T) Three<T> {",
    "    let two = Two{",
    "        b: One{",
    "            a: x",
    "        }",
    "    };",
    "    return Three{",
    "        c: two",
    "    };",
    "}",
    "",
    "pub fn get_field<T>(x: Three<T>) T {",
    "    return x.c.b.a;",
    "}",
    "",
    "pub fn generic<T>(x: T) T {",
    "    let y = x;",
    "    return y;",
    "}",
    "",
    "pub fn simple<T>(x: i64) i64 {",
    "    if x == 0 {",
    "        return 0;",
    "    }",
    "    if x == 1 {",
    "        return 1;",
    "    }",
    "    if x == 2 {",
    "        return 1;",
    "    }",
    "    return simple<T>(x - 1) + simple<T>(x - 2);",
    "}",
    "",
    "pub fn complex<A|B|C>(a: i64, x: A, y: B, z: C) i64 {",
    "    if a == 0 {",
    "        return 0;",
    "    }",
    "    if a == 1 {",
    "        return 1;",
    "    }",
    "    if a == 2 {",
    "        return 1;",
    "    }",
    "    return complex<B|_|C>(a - 1, y, x, z) + complex<C|A|_>(a - 2, z, x, y);",
    "}",
    "",
    "pub fn test_generic_simple() void {",
    "    let x = generic(114514);",
    "    let y = generic(true);",
    "    let t = true;",
    "    let a = GenericType{",
    "        x: 999,",
    "        y: &t",
    "    };",
    "    let b = GenericType{",
    "        x: 888,",
    "        y: &a",
    "    };",
    "    let g = GenericOutter{",
    "        x: GenericInner{",
    "            x: 998",
    "        }",
    "    };",
    "    let half_infer = GenericType<i64|_>{",
    "        x: 999,",
    "        y: &a",
    "    };",
    "",
    "    return;",
    "}",
    "",
    "pub fn test_generic_same_name() void {",
    "    let t = Three{",
    "        c: Two{",
    "            b: One{",
    "                a: 9999",
    "            }",
    "        }",
    "    };",
    "    let b = Three<bool>{};",
    "    b.c.b.a = true;",
    "    return;",
    "}",
    "",
    "pub fn test_ret_generic() void {",
    "    let x = ret_generic1<i64>();",
    "    let y = ret_generic2(true);",
    "    let z = ret_generic2([1, 2, 3]);",
    "    let i = ret_generic2(&z);",
    "    x.c.b.a = 999;",
    "    return;",
    "}",
    "",
    "pub fn test_self_ref_generic() void {",
    "    let x = GenericSelfRef<i64|bool>{};",
    "    return;",
    "}",
    "",
    "pub fn test_generic_fn() void {",
    "    let res = simple<bool>(10);",
    "",
    "    res = complex(10, true, [1, 23], &res);",
    "",
    "    return;",
    "}",
    "",
    "pub fn test_generic() void {",
    "    test_generic_simple();",
    "    test_generic_same_name();",
    "    test_ret_generic();",
    "    test_self_ref_generic();",
    "    test_generic_fn();",
    "    return;",
    "}",

  ].join("\n");
}


function change() {
  pl.on_change_doc("dasdsadsadadsaadsadasd")
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;

  .first-page {
    width: 100vw;
    height: 100vh;
    position: relative;
    background: url(https://s3.bmp.ovh/imgs/2023/04/18/97f8881ab6358b0f.jpg) 0 0 / cover;

    .describe {
      position: absolute;
      top: 200px;
      left: 100px;

      .gradient-font {
        font-size: 58px;
        font-weight: 860;
        line-height: 150%;
        background: linear-gradient(180deg, rgba(186, 255, 243, 0) 50.04%, rgba(189, 255, 244, 0.44) 100.09%), linear-gradient(64.57deg, #75fff3 7.22%, #599aff 90.07%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .detail-describe {
        margin-top: 50px;
        font-size: 24px;
        line-height: 150%;
        color: #fff;
        width: 800px;
      }
    }

    .bottom {
      width: 100%;
      position: absolute;
      z-index: 1;
      bottom: 0;
      height: 80px;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;

      .start-button {
        // position: absolute;
        // right: 60px;
        padding: 10px 70px;
        border-radius: 12px;
        font-weight: 600;
        font-size: 20px;
        color: #fff;
        background: linear-gradient(180deg, rgba(133, 233, 242, 0), rgba(133, 233, 242, 0.5)), linear-gradient(76.14deg, #4caad9 19.78%, #498ff2 80.22%);
      }
    }
  }
}</style>
