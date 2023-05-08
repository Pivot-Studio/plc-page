import * as pl from '@pivot-lang/pivot-lang';
import * as monaco from 'monaco-editor';
import * as tp from 'vscode-languageserver-types';
import monacotp from 'monaco-editor';

interface Diagnostic {
  code: number;
  message: string;
  range: Range;
  relatedInformation: any[];
  severity: number;
  source: string;
}

interface Diags {
  diagnostics: Diagnostic[];
  uri: string;
}

interface Range {
  end: End;
  start: End;
}

interface End {
  character: number;
  line: number;
}

export class PlMonaco {
  constructor(container: HTMLElement, code: string = '', uri: string) {
    this.model = monaco.editor.createModel(code, 'pivot-lang', monaco.Uri.parse(uri));
    initializeDocumentSemanticTokensProvider();
    // console.log(document.querySelector(select));
    this.editor = monaco.editor.create(container, {
      theme: 'pltheme',
      value: code,
      language: 'pivot-lang',
      'semanticHighlighting.enabled': true,
      automaticLayout: true,
      suggestOnTriggerCharacters: true,
      model: this.model,
    });
    initializeEditor(this.editor, code, uri);
  }
  editor: monaco.editor.IStandaloneCodeEditor;
  private model: monaco.editor.ITextModel;
  setContent(code: string) {
    this.editor.revealLine(0);
    this.model.setValue(code);
  }
}

// 暂不支持同时创建多个Monaco的DOM
let created = false;
let plMonaco: PlMonaco;
export default async function createPlMonaco(container: HTMLElement, code: string = '') {
  if (!created) {
    plMonaco = new PlMonaco(container, code, `http://www.test.com/main.pi`);
    created = true;
  }
  return plMonaco;
}

// 需放在model创建之后
let first = true;
function initializeDocumentSemanticTokensProvider() {
  monaco.languages.registerDocumentSemanticTokensProvider('pivot-lang', {
    provideDocumentSemanticTokens: (m, id, token) => {
      if (first) {
        first = false;
        let tokens = pl.get_semantic_tokens_full();
        // console.log(tokens);
        let a: any = {
          resultId: null,
          data: JSON.parse(tokens).data,
        };
        return a;
      }
      let tokens = pl.get_semantic_tokens();
      // console.error(tokens);
      return {
        resultId: null,
        edits: JSON.parse(tokens).edits,
      };
    },
    getLegend: () => {
      let legend = pl.get_legend();
      // console.error(legend);
      return JSON.parse(legend);
    },
    releaseDocumentSemanticTokens: () => {},
  });
}

function initializeEditor(editor: monaco.editor.IStandaloneCodeEditor, code: string, uri: string) {
  let resp: Diags = JSON.parse(pl.set_init_content(code));
  let markers = resp.diagnostics.map((d, n, a) => {
    let sev = monaco.MarkerSeverity.Warning;
    if (d.severity === 1) {
      sev = monaco.MarkerSeverity.Error;
    }
    return {
      severity: sev,
      startLineNumber: d.range.start.line + 1,
      startColumn: d.range.start.character + 1,
      endLineNumber: d.range.end.line + 1,
      endColumn: d.range.end.character + 1,
      message: d.message,
    };
  });
  monaco.editor.setModelMarkers(editor.getModel()!, 'pivot-lang', markers);
  editor.getModel()?.onDidChangeContent((e) => {
    let re = e.changes.map((change) => {
      return {
        range: tp.Range.create(change.range.startLineNumber - 1, change.range.startColumn - 1, change.range.endLineNumber - 1, change.range.endColumn - 1),
        text: change.text,
        rangeLength: change.rangeLength,
      };
    });
    let resp: Diags = JSON.parse(
      pl.on_change_doc(
        JSON.stringify({
          textDocument: {
            version: 0,
            uri,
          },
          contentChanges: re,
        })
      )
    );
    // console.log(resp);

    let markers = resp.diagnostics.map((d, n, a) => {
      let sev = monaco.MarkerSeverity.Warning;
      if (d.severity === 1) {
        sev = monaco.MarkerSeverity.Error;
      }
      return {
        severity: sev,
        startLineNumber: d.range.start.line + 1,
        startColumn: d.range.start.character + 1,
        endLineNumber: d.range.end.line + 1,
        endColumn: d.range.end.character + 1,
        message: d.message,
      };
    });

    monaco.editor.setModelMarkers(editor.getModel()!, 'pivot-lang', markers);
  });
}

initializeMonaco();
function initializeMonaco() {
  // Register a new language
  monaco.languages.register({ id: 'pivot-lang' });

  // Register a tokens provider for the language
  monaco.languages.setMonarchTokensProvider('pivot-lang', {
    tokenizer: {
      root: [
        // [/if|while|for|return|else|break|continue|struct|fn|let|use|const|true|false|impl|self|trait|pub|where|macro|type|as|is*/, "keyword"],
        [/struct|fn|let|use|const|true|false|impl|self|trait|pub|macro|type|as|is/, 'keyword'],
        [/if|while|for|return|else|break|continue|where/, 'keyword.control'],
        [/\".*\"/, 'string'],
        [/\[[a-zA-Z 0-9:]+\]/, 'custom-date'],
      ],
    },
  });
  monaco.languages.setLanguageConfiguration('pivot-lang', {
    surroundingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '<', close: '>' },
      // { open: "'", close: "'" },
      { open: '"', close: '"' },
    ],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      // { open: "'", close: "'", notIn: ['string', 'comment'] },
      { open: '"', close: '"', notIn: ['string', 'comment'] },
    ],
    comments: {
      lineComment: '//',
    },
    brackets: [
      ['{', '}'],
      ['[', ']'],
      ['(', ')'],
      ['<', '>'],
    ],
  });
  // Define a new theme that contains only rules that match this language
  monaco.editor.defineTheme('pltheme', {
    base: 'vs-dark',
    inherit: true,
    colors: {},
    rules: [
      { token: 'keyword', foreground: '63a7eb' },
      { token: 'keyword.control', foreground: 'ce63eb' },
      { token: 'operator', foreground: '000000' },
      { token: 'namespace', foreground: '66afce' },

      { token: 'type', foreground: '1db010' },
      { token: 'struct', foreground: '1db010', fontStyle: 'underline' },
      { token: 'class', foreground: '0000ff', fontStyle: 'bold' },
      { token: 'interface', foreground: '007700', fontStyle: 'bold' },
      { token: 'enum', foreground: '0077ff', fontStyle: 'bold' },
      { token: 'typeParameter', foreground: '1db010' },
      { token: 'function', foreground: '94763a' },

      { token: 'member', foreground: '94763a' },
      { token: 'macro', foreground: '615a60' },
      { token: 'variable', foreground: '3e5bbf' },
      { token: 'parameter', foreground: '3e5bbf' },
      { token: 'property', foreground: '3e5bbf' },
      { token: 'label', foreground: '615a60' },
      { token: 'method', foreground: '94763a', fontStyle: 'bold' },

      { token: 'type.static', fontStyle: 'bold' },
      { token: 'class.static', foreground: 'ff0000', fontStyle: 'bold' },
    ],
  });

  monaco.languages.registerInlayHintsProvider('pivot-lang', {
    provideInlayHints(model, range, token) {
      // console.log(JSON.parse(pl.get_inlay_hints()))
      let hints: tp.InlayHint[] = JSON.parse(pl.get_inlay_hints());
      // console.warn(hints);
      return {
        hints: hints.map((h) => {
          return {
            kind: h.kind,
            label: h.label,
            position: {
              lineNumber: h.position.line + 1,
              column: h.position.character + 1,
            },
          };
        }),
        dispose: () => {},
      } as any;
    },
  });

  // Register a completion item provider for the new language
  monaco.languages.registerCompletionItemProvider('pivot-lang', {
    triggerCharacters: ['.', ':'],
    provideCompletionItems: (model, position, ctx) => {
      var word = model.getWordUntilPosition(position);
      var range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      let dynamic_suggestions = JSON.parse(pl.get_completions());
      // console.warn(dynamic_suggestions);
      for (let sug of dynamic_suggestions) {
        sug.insertTextRules = 0;
        switch (sug.kind) {
          case 14:
            sug.kind = monaco.languages.CompletionItemKind.Keyword;
            break;
          case 3:
            
            sug.kind = monaco.languages.CompletionItemKind.Function;
            sug.insertTextRules = monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet;
            break;
          case 22:
            sug.kind = monaco.languages.CompletionItemKind.Struct;
            break;
          case 13:
            sug.kind = monaco.languages.CompletionItemKind.Enum;
            break;
          case 5:
            sug.kind = monaco.languages.CompletionItemKind.Field;
            break;
          case 6:
            sug.kind = monaco.languages.CompletionItemKind.Variable;
            break;
          case 2:
            sug.kind = monaco.languages.CompletionItemKind.Method;
            break;
          case 25:
            sug.kind = monaco.languages.CompletionItemKind.TypeParameter;
            break;
          case 9:
            sug.kind = monaco.languages.CompletionItemKind.Module;
            break;
          case 21:
            sug.kind = monaco.languages.CompletionItemKind.Constant;
            break;
          case 8:
            sug.kind = monaco.languages.CompletionItemKind.Interface;
            break;
          default:
            break;
        }
        if (sug.insertTextRules !== monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet) {
          sug.insertText = sug.label;
        }
      }
      let suggestions = [
        {
          label: 'for',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: ['for let ${1:i} = 0; ${1:i} < ${2:count}; ${1:i} = ${1:i} + 1 {', '\t$0', '}'].join('\n'),
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'A for loop',
          range: range,
        },
        {
          label: 'fn',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: ['fn ${1:name}() void {', '\t$0', '\treturn;', '}'].join('\n'),
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'A function',
          range: range,
        },
        {
          label: 'struct',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: ['struct ${1:name} {', '\t$0', '}'].join('\n'),
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'A struct',
          range: range,
        },
        {
          label: 'trait',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: ['trait ${1:name} {', '\tfn ${2:name}() void;', '}$0'].join('\n'),
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'A trait',
          range: range,
        },
        {
          label: 'if',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: ['if ${1:condition} {', '\t$0', '}'].join('\n'),
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'if statement',
          range: range,
        },
        {
          label: 'ifel',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: ['if ${1:condition} {', '\t$0', '} else {', '\t', '}'].join('\n'),
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'if else statement',
          range: range,
        },
        {
          label: 'impl',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: ['impl ${1:st} {', '\t$0', '}'].join('\n'),
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'impl block',
          range: range,
        },
        {
          label: 'while',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: ['while ${1:condition} {', '\t$0', '}'].join('\n'),
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'while loop',
          range: range,
        },
        {
          label: 'type',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: ['type ${1:Name} = ${2:Type1} | ${3:Type2};'].join('\n'),
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'union type',
          range: range,
        },
      ];
      if (ctx.triggerKind == monaco.languages.CompletionTriggerKind.TriggerCharacter) {
        suggestions = [];
      }
      suggestions = suggestions.concat(...dynamic_suggestions);
      return { suggestions: suggestions };
    },
  });
  monaco.languages.registerDefinitionProvider('pivot-lang', {
    provideDefinition: (model, position, token) => {
      let re: tp.Location | any[] = JSON.parse(
        pl.go_to_def(
          JSON.stringify({
            line: position.lineNumber - 1,
            character: position.column - 1,
          })
        )
      );
      if (re instanceof Array) {
        return [];
      }
      let uri = monaco.Uri.parse(re.uri);
      let range = new monaco.Range(re.range.start.line + 1, re.range.start.character + 1, re.range.end.line + 1, re.range.end.character + 1);
      console.log(uri, range);
      return {
        uri: uri,
        range: range,
      };
    },
  });
  monaco.languages.registerReferenceProvider('pivot-lang', {
    provideReferences: (model, position, context, token) => {
      let re: tp.Location[] = JSON.parse(
        pl.get_refs(
          JSON.stringify({
            line: position.lineNumber - 1,
            character: position.column - 1,
          })
        )
      );
      console.log(re);
      let refs = re.map((r, n, a) => {
        let uri = monaco.Uri.parse(r.uri);
        let range = new monaco.Range(r.range.start.line + 1, r.range.start.character + 1, r.range.end.line + 1, r.range.end.character + 1);
        return {
          uri: uri,
          range: range,
        };
      });
      return refs;
    },
  });
}

// find <code>s with class language-pl, and create a monaco editors for them
export function createMonacoEditors() {
  let codes = document.querySelectorAll('code.language-pl');
  for (let i = 0; i < codes.length; i++) {
    let code = codes[i];
    let parent = code.parentElement;
    if (!parent) {
      continue;
    }
    let height = parent.clientHeight;
    parent.removeChild(code);
    // set its height to the parent's height
    parent.style.height = height + 'px';
    createPlMonaco(parent, code.textContent!);
  }
}
(window as any).createMonacoEditors = createMonacoEditors;
