// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CLR {
    uint public proposalCount;

    struct Resource {
        string dataCID;       // IPFS hash of the current version
        address coordinator;
        bytes commitment;
    }

    struct Proposal {
        string proposedVersion;      // IPFS hash of the proposed version
        uint8 status;                // 0 for open, 1 for resolved, 2 for failed
        address proposer;            // Address of the proposer
        string drnId;
    }

    mapping(string => Resource) public resources;
    mapping(uint => Proposal) public proposals;
    mapping(string => uint[]) public proposalList;
    mapping(address => Resource) public resourcesByCoordinator;

    // Event when a new Resource is created
    event ResourceCreated(string drnId, string currentVersion, address proposer);

    // Event when the proposed version is updated
    event ProposedVersionUpdated(string drnId, string proposedVersion);

    // Event when the current version is updated
    event CurrentVersionUpdated(string drnId, uint proposalId, uint8 acceptFail);

    // Function to create a new Resource currently anyone can create
    function createResource(string calldata _drnId, string memory _currentVersion) public {

        resources[_drnId] = Resource({
            dataCID: _currentVersion,
            coordinator: msg.sender,
            commitment: ""
        });

        emit ResourceCreated(_drnId, _currentVersion, msg.sender);
    }

    // Function to get the current version of the Resource's hash
    function getCurrentVersion(string calldata _drnId) public view returns (string memory) {
        return resources[_drnId].dataCID;
    }

    // Function to update the proposed version of a Resource, anyone can propose
    function updateProposedVersion(string calldata _drnId, string memory _proposedVersion) public {
        proposals[proposalCount++] = Proposal({
            proposedVersion: _proposedVersion,
            proposer: msg.sender,
            status: 0,
            drnId: _drnId
        });
        proposalList[_drnId].push(proposalCount); 

        emit ProposedVersionUpdated(_drnId, _proposedVersion);
    }

    // Function to make the proposed version the current version and mark the Resource as resolved
    function acceptProposedVersion(string calldata _drnId, uint proposalId,  uint8 _acceptFail, bytes calldata _commitment) public {
        require(proposals[proposalId].status == 0, "Resource already settled");
        if(_acceptFail == 0){
            proposals[proposalId].status = 2;
        }
        else{
            proposals[proposalId].status = 1;
            resources[_drnId].dataCID = proposals[proposalId].proposedVersion;
            resources[_drnId].commitment = _commitment;
        }


        emit CurrentVersionUpdated(_drnId, proposalId, _acceptFail);
    }
}