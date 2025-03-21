const Roles = artifacts.require("Roles");

contract("Roles", (accounts) => {
    let rolesInstance;

    const admin = accounts[0];
    const supplier = accounts[1];
    const manufacturer = accounts[2];
    const distributor = accounts[3];
    const retailer = accounts[4];
    const consumer = accounts[5];

    beforeEach(async () => {
        rolesInstance = await Roles.new({ from: admin });
    });

    it("should set the deployer as the admin", async () => {
        const currentAdmin = await rolesInstance.admin();
        assert.equal(currentAdmin, admin, "Admin is not set correctly");
    });

    it("should assign a role to a user", async () => {
        await rolesInstance.assignRole(supplier, 1, { from: admin }); // Role 1 = Supplier
        const role = await rolesInstance.getUserRole(supplier);
        assert.equal(role.toNumber(), 1, "Role not assigned correctly");
    });

    it("should not allow non-admin to assign roles", async () => {
        try {
            await rolesInstance.assignRole(manufacturer, 2, { from: supplier }); // Role 2 = Manufacturer
            assert.fail("Non-admin was able to assign a role");
        } catch (error) {
            assert.include(error.message, "Only admin can perform this action", "Error message mismatch");
        }
    });

    it("should revoke a role from a user", async () => {
        await rolesInstance.assignRole(distributor, 3, { from: admin }); // Role 3 = Distributor
        await rolesInstance.revokeRole(distributor, { from: admin });
        const role = await rolesInstance.getUserRole(distributor);
        assert.equal(role.toNumber(), 0, "Role not revoked correctly");
    });

    it("should not allow non-admin to revoke roles", async () => {
        await rolesInstance.assignRole(retailer, 4, { from: admin }); // Role 4 = Retailer
        try {
            await rolesInstance.revokeRole(retailer, { from: supplier });
            assert.fail("Non-admin was able to revoke a role");
        } catch (error) {
            assert.include(error.message, "Only admin can perform this action", "Error message mismatch");
        }
    });

    it("should transfer admin privileges", async () => {
        await rolesInstance.transferAdmin(manufacturer, { from: admin });
        const newAdmin = await rolesInstance.admin();
        assert.equal(newAdmin, manufacturer, "Admin privileges not transferred correctly");
    });

    it("should not allow non-admin to transfer admin privileges", async () => {
        try {
            await rolesInstance.transferAdmin(distributor, { from: supplier });
            assert.fail("Non-admin was able to transfer admin privileges");
        } catch (error) {
            assert.include(error.message, "Only admin can perform this action", "Error message mismatch");
        }
    });

    it("should allow role-specific actions", async () => {
        await rolesInstance.assignRole(supplier, 1, { from: admin }); // Role 1 = Supplier
        const tx = await rolesInstance.supplierAction({ from: supplier });
        assert.isTrue(tx.receipt.status, "Supplier action failed");
    });

    it("should not allow unauthorized role-specific actions", async () => {
        await rolesInstance.assignRole(consumer, 5, { from: admin }); // Role 5 = Consumer
        try {
            await rolesInstance.supplierAction({ from: consumer });
            assert.fail("Unauthorized role was able to perform supplier action");
        } catch (error) {
            assert.include(error.message, "Only suppliers can perform this action", "Error message mismatch");
        }
    });
});