// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "./interfaces/IBasePaymaster.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@matterlabs/zksync-contracts/l2/system-contracts/libraries/TransactionHelper.sol";

abstract contract BasePaymaster is IBasePaymaster, Ownable {
    using TransactionHelper for Transaction;

    address private _registry;
    uint256 public limit_per_user = 0;

    mapping(address => bool) public blacklistedUsers;
    mapping(address => mapping(bytes4 => bool)) public allowedContracts;

    mapping(address => uint256) public userLimits;

    constructor(address registry, address _owner, uint256 _limit_per_user) {
        _registry = registry;
        limit_per_user = _limit_per_user;

        _transferOwnership(_owner);
        // transfer
    }

    modifier onlyRegistryOrOwner() {
        require(
            msg.sender == _registry || msg.sender == owner(),
            "Only registry can call this method"
        );
        // Continue execution if called from the registry.
        _;
    }

    function setAllowedContracts(
        address[] calldata contracts,
        bytes4[] calldata selectors,
        bool[] calldata allowed
    ) public onlyRegistryOrOwner {
        //
        require(
            contracts.length == selectors.length &&
                allowed.length == selectors.length,
            "length mismatch"
        );

        for (uint i = 0; i < selectors.length; i++) {
            allowedContracts[contracts[i]][selectors[i]] = allowed[i];
            emit SetAllowedContracts(contracts[i], selectors[i], allowed[i]);
        }
    }

    function setPerUserLimit(
        uint256 _limit_per_user
    ) external override onlyRegistryOrOwner {
        limit_per_user = _limit_per_user;
    }

    function blacklistUser(
        address blacklistAddress,
        bool enabled
    ) external onlyRegistryOrOwner {
        blacklistedUsers[blacklistAddress] = enabled;
        emit BlacklistUser(blacklistAddress, enabled);
    }

    function isTransactionAllowed(
        Transaction calldata _transaction,
        uint256 requiredEth
    ) public view virtual returns (bool) {
        address callee = address(uint160(_transaction.to));
        address caller = address(uint160(_transaction.from));

        require(
            userLimits[caller] + requiredEth <= limit_per_user ||
                limit_per_user == 0,
            "Failed to transact"
        );

        return allowedContracts[callee][bytes4(_transaction.data[0:4])];
    }

    /// VIEW FUNCTIONS ///
    function getRegistry() public view override returns (address) {
        return _registry;
    }

    event BlacklistUser(address blacklistAddress, bool enabled);
    event SetAllowedContracts(
        address contractAddress,
        bytes4 selector,
        bool allowed
    );
}
