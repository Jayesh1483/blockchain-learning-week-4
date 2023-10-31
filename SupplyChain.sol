// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

interface ExternalRegistry {
    function verifyCondition(uint256 _param) external returns (bool);
}

contract ProductSupplyChain is Ownable(msg.sender) {

    // Struct to define a Product
    struct Product {
        uint256 productId;
        string name;
        address currentOwner;
        uint256 price;
        uint8 state; // 0: Created, 1: Sold
    }

    // Mapping to store Product instances by their productId
    mapping(uint256 => Product) public products;

    // Events
    event ProductCreated(uint256 productId, string name, address creator, uint256 price);
    event ProductSold(uint256 productId, address seller, address buyer, uint256 price);

    // Function to create a new Product
    function createProduct(uint256 _productId, string memory _name, uint256 _price) public onlyOwner {
        Product storage newProduct = products[_productId];
        newProduct.productId = _productId;
        newProduct.name = _name;
        newProduct.currentOwner = owner();
        newProduct.price = _price;
        newProduct.state = 0; // Product state is set to 'Created'
        emit ProductCreated(_productId, _name, owner(), _price);
    }

    // Function to simulate the product sale
    function sellProduct(uint256 _productId, address _buyer) public onlyOwner {
        Product storage product = products[_productId];
        require(product.currentOwner == owner(), "You are not the owner of this product.");
        product.currentOwner = _buyer;
        product.state = 1; // Product state is set to 'Sold'
        emit ProductSold(_productId, owner(), _buyer, product.price);
    }

    // Function to transfer ownership
    function transferOwnership(address newOwner) public override onlyOwner {
        require(newOwner != address(0), "Invalid address");
        emit OwnershipTransferred(owner(), newOwner);
        super.transferOwnership(newOwner);
    }

    // Error handling for non-existent product IDs
    function getProduct(uint256 _productId) public view returns (uint256, string memory, address, uint256, uint8) {
        require(products[_productId].productId != 0, "Product does not exist.");
        Product storage product = products[_productId];
        return (product.productId, product.name, product.currentOwner, product.price, product.state);
    }

    // Function to interact with another contract
    function interactWithExternalRegistry(ExternalRegistry _externalRegistry, uint256 _param) public returns (bool) {
        require(_externalRegistry.verifyCondition(_param), "Condition verification failed");
        return true;
    }
}