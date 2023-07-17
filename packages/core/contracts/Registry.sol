// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IBasePaymaster.sol";
import "./Paymaster.sol";

contract Registry is Ownable {
    mapping(address => IBasePaymaster) public paymasters;

    function registerPaymaster(
        address paymasterOwner,
        IBasePaymaster paymaster
    ) external onlyOwner {
        paymasters[paymasterOwner] = paymaster;
    }

    modifier onlyOwnerOrPaymasterOwner(IBasePaymaster paymaster) {
        require(
            msg.sender == owner() ||
                paymasters[msg.sender] == IBasePaymaster(paymaster),
            "Only owner or paymaster owner can call this method"
        );
        // Continue execution if called from the owner or paymaster owner.
        _;
    }

    function createPaymaster(uint256 limit_per_user) external {
        Paymaster paymaster = new Paymaster(
            address(this),
            msg.sender,
            limit_per_user
        );
        paymasters[msg.sender] = IBasePaymaster(address(paymaster));

        emit CreatePaymaster(msg.sender, address(paymaster), limit_per_user);
    }

    event CreatePaymaster(
        address from,
        address paymaster,
        uint256 limit_per_user
    );
}
