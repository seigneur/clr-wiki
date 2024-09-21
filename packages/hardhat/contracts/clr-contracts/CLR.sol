// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CLR {
    // Mapping to store IPFS hashes against user addresses
    mapping(address => string) private ipfsHashes;

    // Function to set the IPFS hash
    function setIPFSHash(string memory _ipfsHash) public {
        ipfsHashes[msg.sender] = _ipfsHash;
    }

    // Function to get the IPFS hash for the caller
    function getIPFSHash() public view returns (string memory) {
        return ipfsHashes[msg.sender];
    }
}