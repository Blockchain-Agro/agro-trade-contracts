const { AccountProvider } = require('../../test_lib/utils');

const FarmerContract = artifacts.require('FarmerContract');
const Utils = require('../../test_lib/utils');

contract('FarmerContract::getFarmer', async (accounts) => {
  const accountProvider = new AccountProvider(accounts);

  let farmerAddress = accountProvider.get();
  let farmerContract;
  beforeEach(async () => {
    farmerContract = await FarmerContract.new();
    param = {
      farmerIpfsHash: '0x2',
    };
    await farmerContract.addFarmer(
      param.farmerIpfsHash,
      { from: farmerAddress },
    );
  });

  it('should successfully get farmer details', async () => {
    // const data = await farmerContract.getFarmer(
    //   farmerAddress,
    //   { from: farmerAddress},
    // );
    console.log('farmer address :-', farmerAddress);
    const data = await farmerContract.getFarmer(farmerAddress,{from: farmerAddress});
    console.log(data);
  });
});
