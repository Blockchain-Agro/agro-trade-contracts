const { AccountProvider } = require('../../test_lib/utils');

const FarmerContract = artifacts.require('FarmerContract');
const Utils = require('../../test_lib/utils');

contract('FarmerContract::addItem', async (accounts) => {
  const accountProvider = new AccountProvider(accounts);

  let farmerAddress = accountProvider.get();
  let farmerContract;

  beforeEach(async () => {
    farmerContract = await FarmerContract.new();
    param = {
      itemIpfsHash: '0x1',
      farmerIpfsHash: '0x2',
    };
    await farmerContract.addFarmer(
      param.farmerIpfsHash,
      { from: farmerAddress },
    );
  });

  contract('Positive Tests', async () => {
    it('should pass when item is successfully added', async () => {
      const itemCountBeforeItemAdded = await farmerContract.getItemCount(farmerAddress);
    });
  });
});
