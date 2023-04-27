import axios from "axios";

interface Coverages {
  totals: {
    files: number;
    lines: number;
    hits: number;
    misses: number;
    partials: number;
    coverage: number;
    branches: number;
    methods: number;
    messages: number;
    sessions: number;
    complexity: number;
    complexity_total: number;
    complexity_ratio: number;
    diff: (string | number)[];
  };
  files: {
    name: string;
    totals: {
      files: number;
      lines: number;
      hits: number;
      misses: number;
      partials: number;
      coverage: number;
      branches: number;
      methods: number;
      messages: number;
      sessions: number;
      complexity: number;
      complexity_total: number;
      complexity_ratio: number;
      diff: number;
    };
  }[];
  commit_file_url: string;
}

export interface SunBurstData {
  value: number;
  coverage: number;
  itemStyle: { color: string };
  children?: SunBurstData[];
  filename: string;
  father?: SunBurstData;
  hits: number;
}

const HIGH = "#1db010"
const MEDIUM = "#f5d10a"
const LOW = "#f50a0a"


function tryGetNode(root: SunBurstData, path: string[], index: number): SunBurstData {
  if (index === path.length) {
    return root;
  }
  for (let i = 0; i < (root.children?.length??0); i++) {
    const element = root.children![i];
    if (element.filename === path.slice(0,index+1).join("/")) {
      return tryGetNode(element, path, index + 1);
    }
  }
  // not found, create new node
  const newNode:SunBurstData = {
    value:0,
    coverage: 0,
    itemStyle: { color: "#fff" },
    children: [],
    filename: path.slice(0,index+1).join("/"),
    father: root,
    hits:0,
  };
  if (root.children) {
    root.children.push(newNode);
  } else {
    root.children = [newNode];
  }
  return tryGetNode(newNode, path, index + 1);
}

// convert total coverage to sunburst data
export const getSunBurstData =  (cov:Coverages): SunBurstData => {
  let root:SunBurstData = {
    value:0,
    coverage: 0,
    itemStyle: { color: "#fff" },
    children: [],
    filename: "Pivot Lang",
    hits:0,
  };
  // every directory is a child
  for (let index = 0; index < cov.files.length; index++) {
    const element = cov.files[index];
    const path = element.name.split("/");
    const node = tryGetNode(root, path, 0);
    node.value = element.totals.lines;
    node.hits = element.totals.hits;
    node.coverage =  node.hits / node.value;
    let currentNode:SunBurstData|undefined = node;
    let oldLines = 0;
    let newLines = node.value;
    let oldHits = 0;
    let newHits = node.hits;
    while (currentNode?.father) {
      let fatherTotalHits =  currentNode.father!.hits;
      currentNode.father!.hits = (fatherTotalHits - oldHits + newHits) ;
      oldHits = fatherTotalHits;
      newHits = currentNode.father!.hits;
      let fatherTotalLines =  currentNode.father!.value;
      currentNode.father!.value = (fatherTotalLines - oldLines + newLines) ;
      oldLines = fatherTotalLines;
      newLines = currentNode.father!.value;
      currentNode.father.coverage = currentNode.father!.hits / currentNode.father!.value;
      currentNode = currentNode.father;
    }
  }

  root.coverage = root.hits / root.value;

  removeBackPointer(root);
  return root;
}


function removeBackPointer(root:SunBurstData) {
  root.father = undefined;
  if (root.coverage < 0.5) {
    root.itemStyle.color = LOW;
  } else if (root.coverage < 0.8) {
    root.itemStyle.color = MEDIUM;
  } else {
    root.itemStyle.color = HIGH;
  }
  
  if (root.children) {
    for (let index = 0; index < root.children.length; index++) {
      const element = root.children[index];
      removeBackPointer(element);
    }
  }
}

export const getTotalCov = async (): Promise<Coverages> => {
  return (
    await axios.get<Coverages>(
      "https://apt.lang.pivotstudio.cn/api/v2/github/Pivot-Studio/repos/pivot-lang/totals/?branch=master",
      {
        headers: {
          accept: "application/json",
          authorization: "CA17PWK0EG",
        },
      }
    )
  ).data;
};