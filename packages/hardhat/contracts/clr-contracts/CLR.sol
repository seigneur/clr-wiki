// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DisputeManager {

    struct Dispute {
        string currentVersion;       // IPFS hash of the current version
        string proposedVersion;      // IPFS hash of the proposed version
        uint8 status;                // 1 for resolved, 0 for failed,2 for open
        address proposer;            // Address of the proposer
        address coordinator;
    }

    mapping(uint256 => Dispute) public disputes;
    mapping(address => Dispute) public disputesByCoordinator;

    // Event when a new dispute is created
    event DisputeCreated(uint256 drnId, string currentVersion, address proposer);

    // Event when the proposed version is updated
    event ProposedVersionUpdated(uint256 drnId, string proposedVersion);

    // Event when the current version is updated
    event CurrentVersionUpdated(uint256 drnId, string newCurrentVersion);

    // Function to create a new dispute
    function createDispute(uint256 _drnId, string memory _currentVersion) public {
        require(disputes[_drnId].status == 0, "Dispute already exists");

        disputes[_drnId] = Dispute({
            currentVersion: _currentVersion,
            proposedVersion: "",
            status: 2,
            proposer: address(0),
            coordinator: msg.sender
        });

        emit DisputeCreated(_drnId, _currentVersion, msg.sender);
    }

    // Function to get the current version of the dispute's hash
    function getCurrentVersion(uint256 _drnId) public view returns (string memory) {
        return disputes[_drnId].currentVersion;
    }

    // Function to update the proposed version of a dispute
    function updateProposedVersion(uint256 _drnId, string memory _proposedVersion, address _proposer) public {
        require(disputes[_drnId].status == 2, "Dispute already settled");
        require(msg.sender == disputes[_drnId].coordinator, "Only coordinator can update the proposed version");

        disputes[_drnId].proposedVersion = _proposedVersion;
        disputes[_drnId].proposer = _proposer;

        emit ProposedVersionUpdated(_drnId, _proposedVersion);
    }

    // Function to make the proposed version the current version and mark the dispute as resolved
    function acceptProposedVersion(uint256 _drnId, uint8 _acceptFail) public {
        require(disputes[_drnId].status == 2, "Dispute already settled");
        require(bytes(disputes[_drnId].proposedVersion).length > 0, "No proposed version to accept");

        disputes[_drnId].currentVersion = disputes[_drnId].proposedVersion;
        disputes[_drnId].proposedVersion = "";
        disputes[_drnId].status = _acceptFail;  // Mark as resolved

        emit CurrentVersionUpdated(_drnId, disputes[_drnId].currentVersion);
    }
}
