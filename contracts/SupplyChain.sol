// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2; // Enable experimental ABI encoder

import "./Roles.sol";

contract SupplyChain is Roles {
    address public Owner;

    constructor() public {
        Owner = msg.sender;
    }

    modifier onlyByOwner() {
        require(msg.sender == Owner, "Only owner can perform this action");
        _;
    }

    enum STAGE {
        Init,
        RawMaterialSupply,
        Manufacture,
        Distribution,
        Retail,
        Sold
    }

    struct RawMaterialSupplier {
        address addr;
        uint256 id;
        string name;
        string place;
    }

    struct Manufacturer {
        address addr;
        uint256 id;
        string name;
        string place;
    }

    struct Distributor {
        address addr;
        uint256 id;
        string name;
        string place;
    }

    struct Retailer {
        address addr;
        uint256 id;
        string name;
        string place;
    }

    struct MedicineDetails {
        string name;
        string description;
        uint256 batchNumber;
        uint256 expirationDate;
    }

    struct MedicineTracking {
        uint256 RMSid;
        uint256 MANid;
        uint256 DISid;
        uint256 RETid;
        string qrCode; // QR code data
        string storageConditions; // New field for storage conditions
        STAGE stage;
    }

    struct Medicine {
        uint256 id;
        MedicineDetails details;
        MedicineTracking tracking;
    }

    uint256 public rmsCtr = 0;
    uint256 public manCtr = 0;
    uint256 public disCtr = 0;
    uint256 public retCtr = 0;
    uint256 public medicineCtr = 0;

    mapping(uint256 => RawMaterialSupplier) public RMS;
    mapping(uint256 => Manufacturer) public MAN;
    mapping(uint256 => Distributor) public DIS;
    mapping(uint256 => Retailer) public RET;
    mapping(uint256 => Medicine) public MedicineStock;

    event MedicineAdded(uint256 id, string name, uint256 batchNumber);
    event MedicineUpdated(uint256 id, STAGE stage);
    event QRCodeGenerated(uint256 id, string qrCode);
    event StorageConditionsUpdated(uint256 id, string conditions);

    // Add raw material supplier
    function addRMS(address _address, string memory _name, string memory _place) public onlyAdmin {
        rmsCtr++;
        RMS[rmsCtr] = RawMaterialSupplier(_address, rmsCtr, _name, _place);
    }

    // Add manufacturer
    function addManufacturer(address _address, string memory _name, string memory _place) public onlyAdmin {
        manCtr++;
        MAN[manCtr] = Manufacturer(_address, manCtr, _name, _place);
    }

    // Add distributor
    function addDistributor(address _address, string memory _name, string memory _place) public onlyAdmin {
        disCtr++;
        DIS[disCtr] = Distributor(_address, disCtr, _name, _place);
    }

    // Add retailer
    function addRetailer(address _address, string memory _name, string memory _place) public onlyAdmin {
        retCtr++;
        RET[retCtr] = Retailer(_address, retCtr, _name, _place);
    }

    // Add a function to retrieve medicine details
    function getMedicineDetails(uint256 _id) public view returns (Medicine memory) {
        require(MedicineStock[_id].id != 0, "Medicine does not exist");
        return MedicineStock[_id];
    }

    // Add medicine
    function addMedicine(
        string memory _name,
        string memory _description,
        uint256 _batchNumber,
        uint256 _expirationDate,
        uint256 _RMSid
    ) public onlySupplier {
        require(RMS[_RMSid].addr != address(0), "Invalid raw material supplier ID");

        medicineCtr++;
        MedicineStock[medicineCtr] = Medicine(
            medicineCtr,
            MedicineDetails(_name, _description, _batchNumber, _expirationDate),
            MedicineTracking(_RMSid, 0, 0, 0, "", "", STAGE.RawMaterialSupply) // Set initial stage to RawMaterialSupply
        );
        emit MedicineAdded(medicineCtr, _name, _batchNumber);
    }

    // Update manufacturing details
    function updateManufacturingDetails(uint256 _id, uint256 _MANid) public onlyManufacturer {
        require(MedicineStock[_id].tracking.stage == STAGE.RawMaterialSupply, "Medicine not in RawMaterialSupply stage");
        require(MAN[_MANid].addr != address(0), "Invalid manufacturer ID");

        MedicineStock[_id].tracking.MANid = _MANid;
        MedicineStock[_id].tracking.stage = STAGE.Manufacture;
        emit MedicineUpdated(_id, STAGE.Manufacture);
    }

    // Update distribution details
    function updateDistributionDetails(uint256 _id, uint256 _DISid) public onlyDistributor {
        require(MedicineStock[_id].tracking.stage == STAGE.Manufacture, "Medicine not in Manufacture stage");
        require(DIS[_DISid].addr != address(0), "Invalid distributor ID");

        MedicineStock[_id].tracking.DISid = _DISid;
        MedicineStock[_id].tracking.stage = STAGE.Distribution;
        emit MedicineUpdated(_id, STAGE.Distribution);
    }

    // Update retail details
    function updateRetailDetails(uint256 _id, uint256 _RETid) public onlyRetailer {
        require(MedicineStock[_id].tracking.stage == STAGE.Distribution, "Medicine not in Distribution stage");
        require(RET[_RETid].addr != address(0), "Invalid retailer ID");

        MedicineStock[_id].tracking.RETid = _RETid;
        MedicineStock[_id].tracking.stage = STAGE.Retail;
        emit MedicineUpdated(_id, STAGE.Retail);
    }

    // Mark medicine as sold
    function markAsSold(uint256 _id) public onlyRetailer {
        require(MedicineStock[_id].tracking.stage == STAGE.Retail, "Medicine not in Retail stage");

        MedicineStock[_id].tracking.stage = STAGE.Sold;
        emit MedicineUpdated(_id, STAGE.Sold);
    }

    // Update storage conditions
    function updateStorageConditions(uint256 _id, string memory _conditions) public onlyDistributor {
        require(MedicineStock[_id].tracking.stage == STAGE.Distribution, "Medicine not in Distribution stage");

        MedicineStock[_id].tracking.storageConditions = _conditions;
        emit StorageConditionsUpdated(_id, _conditions);
    }

    // Generate QR code (placeholder for integration)
    function generateQRCode(uint256 _id, string memory _qrCode) public onlyAdmin {
        MedicineStock[_id].tracking.qrCode = _qrCode;
        emit QRCodeGenerated(_id, _qrCode);
    }
}