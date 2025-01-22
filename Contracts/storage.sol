// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DocumentStorage {
    mapping(bytes32 => uint256) private documentTimestamps;

    event HashStored(bytes32 indexed hash, address indexed signer);

    function storeHash(bytes32 hash) public {
        require(documentTimestamps[hash] == 0, "Hash already stored");
        documentTimestamps[hash] = block.timestamp;
        emit HashStored(hash, msg.sender);
    }

    function verifyHash(bytes32 hash) public view returns (bool exists, uint256 timestamp) {
        timestamp = documentTimestamps[hash];
        exists = timestamp != 0;
    }
}