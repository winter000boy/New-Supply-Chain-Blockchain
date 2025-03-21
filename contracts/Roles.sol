// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Roles {
    address public admin;

    enum Role { None, Supplier, Manufacturer, Distributor, Retailer, Consumer }
    mapping(address => Role) public userRoles;
    mapping(uint256 => string) public roleDescriptions; // Use uint256 instead of Role

    event RoleAssigned(address indexed user, Role role, string description);
    event RoleRevoked(address indexed user, Role role, string description);
    event AdminTransferred(address indexed oldAdmin, address indexed newAdmin);
    event RoleActionPerformed(address indexed user, Role role, string action);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlySupplier() {
        require(userRoles[msg.sender] == Role.Supplier, "Only suppliers can perform this action");
        _;
    }

    modifier onlyManufacturer() {
        require(userRoles[msg.sender] == Role.Manufacturer, "Only manufacturers can perform this action");
        _;
    }

    modifier onlyDistributor() {
        require(userRoles[msg.sender] == Role.Distributor, "Only distributors can perform this action");
        _;
    }

    modifier onlyRetailer() {
        require(userRoles[msg.sender] == Role.Retailer, "Only retailers can perform this action");
        _;
    }

    modifier onlyConsumer() {
        require(userRoles[msg.sender] == Role.Consumer, "Only consumers can perform this action");
        _;
    }

    constructor() public {
        admin = msg.sender;

        // Initialize role descriptions
        roleDescriptions[uint256(Role.None)] = "No Role Assigned";
        roleDescriptions[uint256(Role.Supplier)] = "Raw Material Supplier";
        roleDescriptions[uint256(Role.Manufacturer)] = "Manufacturer";
        roleDescriptions[uint256(Role.Distributor)] = "Distributor";
        roleDescriptions[uint256(Role.Retailer)] = "Retailer";
        roleDescriptions[uint256(Role.Consumer)] = "Consumer";
    }

    // Assign a role to a user
    function assignRole(address _user, Role _role) public onlyAdmin {
        require(_role != Role.None, "Invalid role");
        require(userRoles[_user] == Role.None, "User already has a role");

        userRoles[_user] = _role;
        emit RoleAssigned(_user, _role, roleDescriptions[uint256(_role)]);
    }

    // Revoke a user's role
    function revokeRole(address _user) public onlyAdmin {
        require(userRoles[_user] != Role.None, "User has no role assigned");

        Role revokedRole = userRoles[_user];
        userRoles[_user] = Role.None;
        emit RoleRevoked(_user, revokedRole, roleDescriptions[uint256(revokedRole)]);
    }

    // Transfer admin privileges to another user
    function transferAdmin(address _newAdmin) public onlyAdmin {
        require(_newAdmin != address(0), "Invalid address for new admin");
        emit AdminTransferred(admin, _newAdmin);
        admin = _newAdmin;
    }

    // Utility function to check if a user has a specific role
    function hasRole(address _user, Role _role) public view returns (bool) {
        return userRoles[_user] == _role;
    }

    // Get the role of a user
    function getUserRole(address _user) public view returns (Role) {
        return userRoles[_user];
    }

    // Get the description of a role
    function getRoleDescription(Role _role) public view returns (string memory) {
        return roleDescriptions[uint256(_role)];
    }

    // Example: Function restricted to suppliers
    function supplierAction() public onlySupplier {
        emit RoleActionPerformed(msg.sender, Role.Supplier, "Supplier Action Performed");
        // Logic for suppliers
    }

    // Example: Function restricted to manufacturers
    function manufacturerAction() public onlyManufacturer {
        emit RoleActionPerformed(msg.sender, Role.Manufacturer, "Manufacturer Action Performed");
        // Logic for manufacturers
    }

    // Example: Function restricted to distributors
    function distributorAction() public onlyDistributor {
        emit RoleActionPerformed(msg.sender, Role.Distributor, "Distributor Action Performed");
        // Logic for distributors
    }

    // Example: Function restricted to retailers
    function retailerAction() public onlyRetailer {
        emit RoleActionPerformed(msg.sender, Role.Retailer, "Retailer Action Performed");
        // Logic for retailers
    }

    // Example: Function restricted to consumers
    function consumerAction() public onlyConsumer {
        emit RoleActionPerformed(msg.sender, Role.Consumer, "Consumer Action Performed");
        // Logic for consumers
    }
}