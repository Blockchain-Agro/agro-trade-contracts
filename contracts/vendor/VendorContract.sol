pragma solidity >=0.5.0;

import "./VendorInterface.sol";
import "../farmer/FarmerInterface.sol";

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract VendorContract is VendorInterface {

    /* Structs */
    struct Vendor {
        bytes32 ipfsHash;
        uint256 trust;
        uint256 reviewers;
    }

    /* Mappings */
    mapping (address => Vendor) public vendors;

    /* Modifiers */

    /* Modifier to check caller is a farmer. */
    modifier onlyFarmer() {
        require(
            farmer.isFarmer(msg.sender),
            "Only farmer can call."
        );
        _;
    }

    /* Modifier to check caller is a vendor. */
    modifier onlyVendor() {
        require(
            vendors[msg.sender].ipfsHash != bytes32(0),
            "Only vendor can call."
        );
        _;
    }

    /* Farmer contract address */
    FarmerInterface public farmer;

    /**
     * @notice It sets farmer contract address
     *              - called only once.
     *              - _farmer contract must not be empty.
     */
    function setFarmerContract(address _farmer)
        public
    {
        require(
            address(farmer) == address(0),
            "Farmer contract address already set."
        );

        require(
            address(_farmer) != address(0),
            "Farmer contract address must not be empty."
        );

        farmer = FarmerInterface(_farmer);
    }

    /**
     * Adds vendor to the mapping.
     * @param _ipfsHash - ipfs hash of the vendor object.
     */
    function addVendor(
        bytes32 _ipfsHash
    )
        public
    {
        require(
            _ipfsHash != bytes32(0),
            "Ipfs hash should not be zero"
        );
        require(
            vendors[msg.sender].ipfsHash == bytes32(0),
            "Vendor already exists."
        );
        Vendor memory vendor = Vendor({
            ipfsHash: _ipfsHash,
            trust: 0,
            reviewers: 0
        });

        vendors[msg.sender] = vendor;
    }

    function isVendor(address _vendor) external returns(bool) {
        return vendors[_vendor].ipfsHash != bytes32(0);
    }

    /**
     * Get vendor details
     * @param _vendor - vendor address
     * @return vendor ipfs hash
     *         vendor trust
     *         vendor reviewers
     */
    function getVendor(address _vendor)
        public
        onlyFarmer
        onlyVendor
        returns (bytes32,uint256,uint256)
    {
        require(
            _vendor != address(0),
            "Vendor address must not be 0"
        );
        require(
            vendors[_vendor].ipfsHash != bytes32(0),
            "Vendor must exist."
        );

        return (
            vendors[_vendor].ipfsHash,
            vendors[_vendor].trust,
            vendors[_vendor].reviewers
        );
    }
}
