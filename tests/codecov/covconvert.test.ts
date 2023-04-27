// import { useDetectDeviceSize } from '../../src';

import { expect } from "chai";
import {
  SunBurstData,
  getSunBurstData,
  getTotalCov,
} from "../../src/hooks/codecov";

describe("cov sunburst", function () {
  it("sunburst convert", async function () {
    const data = await getTotalCov();
    const sunburst = getSunBurstData(data);
    testSubNodes(sunburst);
  });
});

function testSubNodes(node: SunBurstData) {
  expect(node.coverage, node.filename).to.eq(node.hits / node.value);
  let totalHits = 0;
  let totalValue = 0;
  if (node.children && node.children.length > 0) {
    node.children.forEach((child) => {
      testSubNodes(child);
      totalHits += child.hits;
      totalValue += child.value;
    });
    expect(node.hits, node.filename).to.eq(totalHits);
    expect(node.value, node.filename).to.eq(totalValue);
  }
}
