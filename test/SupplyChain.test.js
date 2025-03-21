const SupplyChain = artifacts.require("SupplyChain");

contract("SupplyChain", (accounts) => {
    let supplyChainInstance;

    const admin = accounts[0];
    const supplier = accounts[1];
    const manufacturer = accounts[2];
    const distributor = accounts[3];
    const retailer = accounts[4];

    beforeEach(async () => {
        supplyChainInstance = await SupplyChain.new({ from: admin });

        // Assign roles
        await supplyChainInstance.assignRole(supplier, 1, { from: admin }); // Role 1 = Supplier
        await supplyChainInstance.assignRole(manufacturer, 2, { from: admin }); // Role 2 = Manufacturer
        await supplyChainInstance.assignRole(distributor, 3, { from: admin }); // Role 3 = Distributor
        await supplyChainInstance.assignRole(retailer, 4, { from: admin }); // Role 4 = Retailer
    });

    it("should allow a supplier to add raw materials", async () => {
        await supplyChainInstance.addRMS(supplier, "Supplier A", "Location A", { from: admin });
        const rms = await supplyChainInstance.RMS(1);
        assert.equal(rms.name, "Supplier A", "Raw material supplier not added correctly");
    });

    it("should allow a supplier to add medicine", async () => {
        await supplyChainInstance.addRMS(supplier, "Supplier A", "Location A", { from: admin });
        await supplyChainInstance.addMedicine(
            "Medicine A",
            "Description A",
            12345,
            20250101,
            1,
            { from: supplier }
        );
        const medicine = await supplyChainInstance.MedicineStock(1);
        assert.equal(medicine.details.name, "Medicine A", "Medicine not added correctly");
        assert.equal(parseInt(medicine.tracking.stage), 1, "Medicine stage not initialized to RawMaterialSupply");
    });

    it("should allow a manufacturer to update manufacturing details", async () => {
        await supplyChainInstance.addRMS(supplier, "Supplier A", "Location A", { from: admin });
        await supplyChainInstance.addMedicine(
            "Medicine A",
            "Description A",
            12345,
            20250101,
            1,
            { from: supplier }
        );
        await supplyChainInstance.addManufacturer(manufacturer, "Manufacturer A", "Location B", { from: admin });
        await supplyChainInstance.updateManufacturingDetails(1, 1, { from: manufacturer });
        const medicine = await supplyChainInstance.MedicineStock(1);
        assert.equal(parseInt(medicine.tracking.MANid), 1, "Manufacturer ID not updated correctly");
        assert.equal(parseInt(medicine.tracking.stage), 2, "Medicine stage not updated to Manufacture");
    });

    it("should allow a distributor to update distribution details", async () => {
        await supplyChainInstance.addRMS(supplier, "Supplier A", "Location A", { from: admin });
        await supplyChainInstance.addMedicine(
            "Medicine A",
            "Description A",
            12345,
            20250101,
            1,
            { from: supplier }
        );
        await supplyChainInstance.addManufacturer(manufacturer, "Manufacturer A", "Location B", { from: admin });
        await supplyChainInstance.updateManufacturingDetails(1, 1, { from: manufacturer });
        await supplyChainInstance.addDistributor(distributor, "Distributor A", "Location C", { from: admin });
        await supplyChainInstance.updateDistributionDetails(1, 1, { from: distributor });
        const medicine = await supplyChainInstance.MedicineStock(1);
        assert.equal(parseInt(medicine.tracking.DISid), 1, "Distributor ID not updated correctly");
        assert.equal(parseInt(medicine.tracking.stage), 3, "Medicine stage not updated to Distribution");
    });

    it("should allow a retailer to update retail details", async () => {
        await supplyChainInstance.addRMS(supplier, "Supplier A", "Location A", { from: admin });
        await supplyChainInstance.addMedicine(
            "Medicine A",
            "Description A",
            12345,
            20250101,
            1,
            { from: supplier }
        );
        await supplyChainInstance.addManufacturer(manufacturer, "Manufacturer A", "Location B", { from: admin });
        await supplyChainInstance.updateManufacturingDetails(1, 1, { from: manufacturer });
        await supplyChainInstance.addDistributor(distributor, "Distributor A", "Location C", { from: admin });
        await supplyChainInstance.updateDistributionDetails(1, 1, { from: distributor });
        await supplyChainInstance.addRetailer(retailer, "Retailer A", "Location D", { from: admin });
        await supplyChainInstance.updateRetailDetails(1, 1, { from: retailer });
        const medicine = await supplyChainInstance.MedicineStock(1);
        assert.equal(parseInt(medicine.tracking.RETid), 1, "Retailer ID not updated correctly");
        assert.equal(parseInt(medicine.tracking.stage), 4, "Medicine stage not updated to Retail");
    });

    it("should allow a retailer to mark medicine as sold", async () => {
        await supplyChainInstance.addRMS(supplier, "Supplier A", "Location A", { from: admin });
        await supplyChainInstance.addMedicine(
            "Medicine A",
            "Description A",
            12345,
            20250101,
            1,
            { from: supplier }
        );
        await supplyChainInstance.addManufacturer(manufacturer, "Manufacturer A", "Location B", { from: admin });
        await supplyChainInstance.updateManufacturingDetails(1, 1, { from: manufacturer });
        await supplyChainInstance.addDistributor(distributor, "Distributor A", "Location C", { from: admin });
        await supplyChainInstance.updateDistributionDetails(1, 1, { from: distributor });
        await supplyChainInstance.addRetailer(retailer, "Retailer A", "Location D", { from: admin });
        await supplyChainInstance.updateRetailDetails(1, 1, { from: retailer });
        await supplyChainInstance.markAsSold(1, { from: retailer });
        const medicine = await supplyChainInstance.MedicineStock(1);
        assert.equal(parseInt(medicine.tracking.stage), 5, "Medicine stage not updated to Sold");
    });

    it("should allow a distributor to update storage conditions", async () => {
        await supplyChainInstance.addRMS(supplier, "Supplier A", "Location A", { from: admin });
        await supplyChainInstance.addMedicine(
            "Medicine A",
            "Description A",
            12345,
            20250101,
            1,
            { from: supplier }
        );
        await supplyChainInstance.addManufacturer(manufacturer, "Manufacturer A", "Location B", { from: admin });
        await supplyChainInstance.updateManufacturingDetails(1, 1, { from: manufacturer });
        await supplyChainInstance.addDistributor(distributor, "Distributor A", "Location C", { from: admin });
        await supplyChainInstance.updateDistributionDetails(1, 1, { from: distributor });
        await supplyChainInstance.updateStorageConditions(1, "Temperature: 5°C, Humidity: 60%", { from: distributor });
        const medicine = await supplyChainInstance.MedicineStock(1);
        assert.equal(medicine.tracking.storageConditions, "Temperature: 5°C, Humidity: 60%", "Storage conditions not updated correctly");
    });
});