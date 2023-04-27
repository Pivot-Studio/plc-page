// import { useDetectDeviceSize } from '../../src';

import { getSunBurstData, getTotalCov } from "../../src/hooks/codecov";


describe('cov sunburst', function() {
    it('sunburst convert', async function() {
        const data = await getTotalCov();
        const sunburst = getSunBurstData(data);
        console.log(sunburst);
    }); 
  });