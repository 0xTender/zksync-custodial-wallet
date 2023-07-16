// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./BasePaymaster.sol";

import {IPaymaster, ExecutionResult, PAYMASTER_VALIDATION_SUCCESS_MAGIC} from "@matterlabs/zksync-contracts/l2/system-contracts/interfaces/IPaymaster.sol";

contract Paymaster is BasePaymaster, IPaymaster {
    constructor(
        address registry,
        address _owner,
        uint256 _limit_per_user
    ) BasePaymaster(registry, _owner, _limit_per_user) {}

    modifier onlyBootloader() {
        require(
            msg.sender == BOOTLOADER_FORMAL_ADDRESS,
            "Only bootloader can call this method"
        );
        // Continue execution if called from the bootloader.
        _;
    }

    function validateAndPayForPaymasterTransaction(
        bytes32,
        bytes32,
        Transaction calldata _transaction
    )
        external
        payable
        onlyBootloader
        returns (bytes4 magic, bytes memory _context)
    {
        // By default we consider the transaction as accepted.
        magic = PAYMASTER_VALIDATION_SUCCESS_MAGIC;
        require(
            _transaction.paymasterInput.length >= 4,
            "The standard paymaster input must be at least 4 bytes long"
        );

        bytes4 paymasterInputSelector = bytes4(
            _transaction.paymasterInput[0:4]
        );

        if (paymasterInputSelector == IPaymasterFlow.general.selector) {
            uint256 requiredETH = _transaction.gasLimit *
                _transaction.maxFeePerGas;

            require(
                isTransactionAllowed(_transaction, requiredETH),
                "Transaction not allowed"
            );
            address caller = address(uint160(_transaction.from));
            userLimits[caller] += requiredETH;

            (bool success, ) = payable(BOOTLOADER_FORMAL_ADDRESS).call{
                value: requiredETH
            }("");

            require(
                success,
                "Failed to transfer tx fee to the bootloader. Paymaster balance might not be enough."
            );
        } else {
            revert("Unsupported paymaster flow");
        }
    }

    function postTransaction(
        bytes calldata _context,
        Transaction calldata _transaction,
        bytes32,
        bytes32,
        ExecutionResult _txResult,
        uint256 _maxRefundedGas
    ) external payable override onlyBootloader {}

    receive() external payable {}
}
