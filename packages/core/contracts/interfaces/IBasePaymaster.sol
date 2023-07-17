// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

interface IBasePaymaster {
    function getRegistry() external view returns (address);

    function setPerUserLimit(uint256 _limit_per_user) external;
}
