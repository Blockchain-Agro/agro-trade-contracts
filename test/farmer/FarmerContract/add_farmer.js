
const BN = require('bn.js');
const { AccountProvider } = require('../../test_lib/utils');

const FarmerContract = artifacts.require('FarmerContract');
const Utils = require('../../test_lib/utils');

contract('FamerContract::addFarmer', async (accounts) => {
  const accountProvider = new AccountProvider(accounts);

  let farmerAddress = accountProvider.get();
  let farmerContract;

  beforeEach(async () => {
    farmerContract = await FarmerContract.new();
    param = {
      ipfsHash: '0x1',
    };
  });

  contract('Positive Tests', async () => {
    it('should pass farmer is successfully added.', async () => {
      await farmerContract.addFarmer(
        param.ipfsHash,
      );

      const farmer = await farmerContract.farmers.call(farmerAddress);
      assert.isNotNull(
        farmer,
        'farmer is not successfully added.',
      );
    });
  });

  contract('Negative Tests', async () => {
    it('should fail when ipfs hash is 0', async () => {
      param.ipfsHash = '0x0';
      await Utils.expectRevert(
        farmerContract.addFarmer(
          param.ipfsHash,
        ),
        'IPFS hash must not be zero',
      );
    });
  });
});
