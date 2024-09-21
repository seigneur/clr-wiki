// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CLR {

    struct Resource {
        string currentVersion;       // IPFS hash of the current version
        string proposedVersion;      // IPFS hash of the proposed version
        uint8 status;                // 1 for resolved, 0 for failed,2 for open
        address proposer;            // Address of the proposer
        address coordinator;
    }

    mapping(uint256 => Resource) public Resources;
    mapping(address => Resource) public ResourcesByCoordinator;

    // Event when a new Resource is created
    event ResourceCreated(uint256 drnId, string currentVersion, address proposer);

    // Event when the proposed version is updated
    event ProposedVersionUpdated(uint256 drnId, string proposedVersion);

    // Event when the current version is updated
    event CurrentVersionUpdated(uint256 drnId, string newCurrentVersion);

    // Function to create a new Resource
    function createResource(uint256 _drnId, string memory _currentVersion) public {
        require(Resources[_drnId].status == 0, "Resource already exists");

        Resources[_drnId] = Resource({
            currentVersion: _currentVersion,
            proposedVersion: "",
            status: 2,
            proposer: address(0),
            coordinator: msg.sender
        });

        emit ResourceCreated(_drnId, _currentVersion, msg.sender);
    }

    // Function to get the current version of the Resource's hash
    function getCurrentVersion(uint256 _drnId) public view returns (string memory) {
        return Resources[_drnId].currentVersion;
    }

    // Function to update the proposed version of a Resource
    function updateProposedVersion(uint256 _drnId, string memory _proposedVersion, address _proposer) public {
        require(Resources[_drnId].status == 2, "Resource already settled");
        require(msg.sender == Resources[_drnId].coordinator, "Only coordinator can update the proposed version");

        Resources[_drnId].proposedVersion = _proposedVersion;
        Resources[_drnId].proposer = _proposer;

        emit ProposedVersionUpdated(_drnId, _proposedVersion);
    }

    // Function to make the proposed version the current version and mark the Resource as resolved
    function acceptProposedVersion(uint256 _drnId, uint8 _acceptFail) public {
        require(Resources[_drnId].status == 2, "Resource already settled");
        require(bytes(Resources[_drnId].proposedVersion).length > 0, "No proposed version to accept");

        Resources[_drnId].currentVersion = Resources[_drnId].proposedVersion;
        Resources[_drnId].proposedVersion = "";
        Resources[_drnId].status = _acceptFail;  // Mark as resolved

        emit CurrentVersionUpdated(_drnId, Resources[_drnId].currentVersion);
    }
}