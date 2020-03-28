
pragma solidity >=0.5.0;

interface FarmerInterface {

    /** External functions */
    function isFarmer(address) external returns (bool);

    function getProductStatus(address, uint256) external view returns (bool);

    function setProductAsSold(address, uint256) external;
}
