// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { expect } from "chai";
import { ethers, waffle } from "hardhat";
const { deployContract } = waffle;
import { ProductSupplyChain } from "../typechain/ProductSupplyChain";
import { ExternalRegistry } from "../typechain/ExternalRegistry";

describe("ProductSupplyChain", function () {
  let productSupplyChain: ProductSupplyChain;
  let externalRegistry: ExternalRegistry;

  beforeEach(async function () {
    productSupplyChain = (await deployContract(
      await ethers.getSigner(),
      ProductSupplyChain
    )) as ProductSupplyChain;
    externalRegistry = (await deployContract(
      await ethers.getSigner(),
      ExternalRegistry
    )) as ExternalRegistry;
  });

  it("should create a product and emit ProductCreated event", async function () {
    const productId = 1234;
    const name = "Test Product";
    const price = ethers.utils.parseEther("1.0");

    await expect(productSupplyChain.createProduct(productId, name, price))
      .to.emit(productSupplyChain, "ProductCreated")
      .withArgs(productId, name, await ethers.getSigner().getAddress(), price);
  });

  it("should not allow non-owner to create a product", async function () {
    const nonOwner = await ethers.getSigner(1);
    const productId = 1234;
    const name = "Test Product";
    const price = ethers.utils.parseEther("1.0");

    await expect(
      productSupplyChain.connect(nonOwner).createProduct(productId, name, price)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("should sell a product and emit ProductSold event", async function () {
    const productId = 1234;
    const name = "Test Product";
    const price = ethers.utils.parseEther("1.0");
    const buyer = await ethers.getSigner(1).getAddress();

    await productSupplyChain.createProduct(productId, name, price);

    await expect(productSupplyChain.sellProduct(productId, buyer))
      .to.emit(productSupplyChain, "ProductSold")
      .withArgs(productId, await ethers.getSigner().getAddress(), buyer, price);
  });

  it("should not allow non-owner to sell a product", async function () {
    const nonOwner = await ethers.getSigner(1);
    const productId = 1234;
    const buyer = await ethers.getSigner(2).getAddress();

    await expect(
      productSupplyChain.connect(nonOwner).sellProduct(productId, buyer)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("should not allow selling non-existent product", async function () {
    const productId = 1234;
    const buyer = await ethers.getSigner(1).getAddress();

    await expect(productSupplyChain.sellProduct(productId, buyer)).to.be.revertedWith("You are not the owner of this product.");
  });

  it("should transfer ownership and emit OwnershipTransferred event", async function () {
    const newOwner = await ethers.getSigner(1).getAddress();

    await expect(productSupplyChain.transferOwnership(newOwner))
      .to.emit(productSupplyChain, "OwnershipTransferred")
      .withArgs(await ethers.getSigner().getAddress(), newOwner);
  });

  it("should not transfer ownership to invalid address", async function () {
    await expect(productSupplyChain.transferOwnership("0x0")).to.be.revertedWith("Invalid address");
  });

  it("should get product details", async function () {
    const productId = 1234;
    const name = "Test Product";
    const price = ethers.utils.parseEther("1.0");

    await productSupplyChain.createProduct(productId, name, price);

    const productDetails = await productSupplyChain.getProduct(productId);

    expect(productDetails.productId).to.equal(productId);
    expect(productDetails.name).to.equal(name);
    expect(productDetails.currentOwner).to.equal(await ethers.getSigner().getAddress());
    expect(productDetails.price).to.equal(price);
    expect(productDetails.state).to.equal(0);
  });

  it("should not get details of non-existent product", async function () {
    const productId = 1234;

    await expect(productSupplyChain.getProduct(productId)).to.be.revertedWith("Product does not exist.");
  });

  it("should interact with external registry and return true", async function () {
    const param = 123;

    await expect(productSupplyChain.interactWithExternalRegistry(externalRegistry, param)).to.emit(
      productSupplyChain,
      "Condition verification failed"
    );
  });

  it("should not interact with external registry with invalid condition", async function () {
    const param = 123;

    await expect(
      productSupplyChain.interactWithExternalRegistry(externalRegistry, param)
    ).to.be.revertedWith("Condition verification failed");
  });
});

