const BN = require('bn.js');
const { AccountProvider } = require('../../test_lib/utils');

const FarmerContract = artifacts.require('FarmerContractDouble');
const VendorContract = artifacts.require('VendorContract');
const Utils = require('../../test_lib/utils');

contract('FarmerContract::updateTrust', async (accounts) => {
  const accountProvider = new AccountProvider(accounts);
  const farmerAddress = accountProvider.get();
  const vendorAddress = accountProvider.get();

  let farmerContract;
  let vendorContract;
  beforeEach(async () => {
    farmerContract = await FarmerContract.new();
    vendorContract = await VendorContract.new();

    param = {
      itemIpfsHash: '0x1',
      farmerIpfsHash: '0x2',
      vendorIpfsHash: '0x3',
      trust: new BN(4),
    }
    await farmerContract.addFarmer(
      param.farmerIpfsHash,
      { from: farmerAddress },
    );

    await vendorContract.addVendor(
      param.vendorIpfsHash,
      { from: vendorAddress },
    );
    await farmerContract.setVendor(vendorContract.address);
    await vendorContract.setFarmerContract(farmerContract.address);
  });

  contract('Positive Tests', async () => {
    it('should pass when trust value gets updated successfully', async () => {
      let farmer = await farmerContract.farmers.call(farmerAddress);
      const currentTrust = new BN(farmer[1].toNumber());

      await farmerContract.updateTrust(
        farmerAddress,
        param.trust,
        { from: vendorAddress },
      );

      farmer = await farmerContract.farmers.call(farmerAddress);
      const updatedTrust = farmer[1].toNumber();

      const trustToBeUpdated = new BN(param.trust);
      const expectedTrust = currentTrust.add(trustToBeUpdated).toNumber();
      const actualTrust = updatedTrust;

      assert.strictEqual(
        expectedTrust,
        actualTrust,
        'Expected and actual trust must match.',
      );
    });
  });

  contract('Negative Test', async ()  => {
    // TO DO: test for farmer doesn't exist.
    it('should fail when trust value is not in between 1 and 5', async () => {
      const trust = new BN(10);
      await Utils.expectRevert(
        farmerContract.updateTrust(
          farmerAddress,
          trust,
          { from: vendorAddress },
        ),
        'Trust value cannot be zero and cannot be greater than 5',
      );
    });
  });
});
