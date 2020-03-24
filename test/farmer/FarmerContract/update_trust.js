// TO DO:
// deploy farmer contract
// deploy vendor contract
// add farmer and item
// add vendor
// update trust

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
    await farmerContract.setVendor(vendorContract);
    await vendorContract.setFarmer(farmerContract);
  });

  contract('Positive Tests', async () => {
    it('should pass when trust value gets updated successfully', async () => {
      const trustBeforeUpdated = await farmerContract.getTrustValue.call(farmerAddress);
      const currentTrust = trustBeforeUpdated.toNumber();

      await farmerContract.updateTrust(
        farmerAddress,
        param.trust,
        { from: vendorAddress },
      );
      // const trustAfterUpdated = await farmerContract.getTrustValue(farmerAddress);
      // const updatedTrust = trustAfterUpdated.toNumber();

      // console.log('old trust :-', currentTrust);
      // console.log('updated trust :-', updatedTrust);

    });
  })
});
