pragma solidity >=0.5.0;

import '../farmer/FarmerContract.sol';

contract FarmerContractDouble is FarmerContract {
    function getTrustValue(address _farmer) public returns (uint256) {
        uint256 trust = farmers[_farmer].trust;
    }
}
