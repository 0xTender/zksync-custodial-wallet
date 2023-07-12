// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@matterlabs/zksync-contracts/l2/system-contracts/interfaces/IAccount.sol";
import {BOOTLOADER_FORMAL_ADDRESS, TransactionHelper} from "@matterlabs/zksync-contracts/l2/system-contracts/libraries/TransactionHelper.sol";
import "@openzeppelin/contracts/interfaces/IERC1271.sol";

contract UserAccount is IAccount {
    using TransactionHelper for Transaction;

    modifier onlyBootloader() {
        require(
            msg.sender == BOOTLOADER_FORMAL_ADDRESS,
            "Only bootloader can call this function"
        );
        // Continure execution if called from the bootloader.
        _;
    }

    function validateTransaction(
        bytes32,
        bytes32 _suggestedSignedHash,
        Transaction calldata _transaction
    ) external payable override onlyBootloader returns (bytes4 magic) {
        magic = _validateTransaction(_suggestedSignedHash, _transaction);
    }

    function _validateTransaction(
        bytes32 _suggestedSignedHash,
        Transaction calldata _transaction
    ) internal returns (bytes4 magic) {
        // TO BE IMPLEMENTED
    }

    function executeTransaction(
        bytes32,
        bytes32,
        Transaction calldata _transaction
    ) external payable override onlyBootloader {
        _executeTransaction(_transaction);
    }

    function _executeTransaction(Transaction calldata _transaction) internal {
        // TO BE IMPLEMENTED
    }

    function executeTransactionFromOutside(
        Transaction calldata _transaction
    ) external payable {
        _validateTransaction(bytes32(0), _transaction);
        _executeTransaction(_transaction);
    }

    function payForTransaction(
        bytes32,
        bytes32,
        Transaction calldata _transaction
    ) external payable override onlyBootloader {
        // TO BE IMPLEMENTED
    }

    function prepareForPaymaster(
        bytes32, // _txHash
        bytes32, // _suggestedSignedHash
        Transaction calldata _transaction
    ) external payable override onlyBootloader {
        // TO BE IMPLEMENTED
    }
}
