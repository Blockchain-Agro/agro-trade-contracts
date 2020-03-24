pragma solidity >=0.5.0;

import "../vendor/VendorInterface.sol";
import "./FarmerInterface.sol";

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract FarmerContract is FarmerInterface {

    /* Usings */

    using SafeMath for uint256;


    /* Structs */

    struct Farmer {
        bytes32 ipfsHash;
        uint256 trust;
        uint256 reviewers;
    }

    struct Item {
        bytes32 ipfsHash;
        uint256 id;
        bool isSold;
    }


    /* Public variables */

    /* Contract owner address */
    address public owner;

    /* Vendor contract address */
    VendorInterface public vendor;


    /* Mappings*/
    mapping (address => Farmer) public farmers;
    mapping (address => Item[]) public items;


    /* Constructor */
    constructor() public
    {
        owner = msg.sender;
    }

    function setVendor(VendorInterface _vendorContract) public {
        vendor = _vendorContract;
    }


    /* Modifiers */

    /* Modifier to check caller is a vendor. */
    modifier onlyVendor() {
        require(
            vendor.isVendor(msg.sender),
            "Only vendor can call."
        );
        _;
    }

    /* Modifier to check caller is a farmer. */
    modifier onlyFarmer() {
        require(
            farmers[msg.sender].ipfsHash != bytes32(0),
            "Only farmer can call"
        );
        _;
    }


    /* Public Functions */

    /**
     * @notice it add farmer to the mapping
                - farmer must not already present
                - farmer address must not be empty
                - ipfs hash must not be empty
                - initial trust
     * @param
                _ipfsHash - hash of farmer data stored on ipfs
                _name - farmer
     */
    function addFarmer(bytes32 _ipfsHash)
        public
    {
        require(
            _ipfsHash != bytes32(0),
            "IPFS hash must not be zero"
        );

        require(
            farmers[msg.sender].ipfsHash == bytes32(0),
            "Farmer is already added"
        );

        Farmer memory farmer = Farmer({
            ipfsHash: _ipfsHash,
            trust: uint256(5),
            reviewers: uint256(0)
        });

        farmers[msg.sender] = farmer;
    }

    /**
     * @notice it add item to the array of items and the mapping
                - IPFS hash of item must not be empty
                - id must not be zero
     * @param
                _itemIpfsHash - hash of item data stored on ipfs
                _id - id of the item
     */
    function addItem(bytes32 _itemIpfsHash)
        public
        onlyFarmer
    {
        require(
            _itemIpfsHash != bytes32(0),
            "IPFS hash must not be zero"
        );

        uint256 itemLength = items[msg.sender].length;

        Item memory item = Item({
            ipfsHash: _itemIpfsHash,
            id: itemLength,
            isSold: false
        });

        items[msg.sender].push(item);
    }

    /**
     * returns count of items belongs to `_farmerAddress`
     * @param _farmerAddress - Farmer address
     *
     * @return itemsLength - length of item array corresponding
     *                       `_farmerAddress`.
     */
    function getItemCount(address _farmerAddress) public returns (uint256 itemsLength) {
        itemsLength = items[_farmerAddress].length;
    }

    /**
     * update farmer's trust value
     * @param _farmer - farmer address.
     * @param _trust - trust value provided by vendor.
     */
    function updateTrust(address _farmer, uint256 _trust)
        public
        onlyVendor
    {
        require (
            farmers[msg.sender].ipfsHash != bytes32(0),
            "Farmer doesn't exist."
        );
        require (
            _trust > 0 && _trust <= 5,
            "Trust value cannot be zero and cannot be greater than 5"
        );

        farmers[_farmer].trust = farmers[_farmer].trust.add(_trust);
    }


    function isFarmer(address _farmer)
        external
        returns (bool)
    {
        return (farmers[_farmer].ipfsHash != bytes32(0));
    }
}
