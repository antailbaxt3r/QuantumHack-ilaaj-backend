const { assert } = require("chai");

const DocumentContract = artifacts.require("./DocumentContract.sol");

require("chai").use(require("chai-as-promised")).should();

contract("DocumentContract", () => {
	let document;
	before(async () => {
		document = await DocumentContract.deployed();
	});

	describe("deployment", async () => {
		it("deploys successfully", async () => {
			const address = await document.address;
			assert.notEqual(address, 0x0);
			assert.notEqual(address, "");
			assert.notEqual(address, null);
			assert.notEqual(address, undefined);
		});

		it("has a name", async () => {
			const count = await document.docCount();
			assert.equal(count, 0);
		});
	});

	describe("documents", async () => {
        let result1, result2, count;
		before(async () => {
            result1 = await document.addDocument("1", "2", "P", "this.link.com");
            result2 = await document.addDocument("1", "2", "R", "this.link.com");
			count = await document.docCount();
        });
        
        it("creates prescription", async () => {
            assert.equal(count, 2)
            const event = result1.logs[0].args
            assert.equal(event.id.toNumber(), 1, 'id is correct')
            assert.equal(event.user, '1', 'user is correct')
            assert.equal(event.doctor, '2', 'doctor is correct')
            assert.equal(event.docType, 'P', 'doctype is correct')
            assert.equal(event.link, "this.link.com", 'link is correct')
        });

        it("creates report", async () => {
            assert.equal(count, 2)
            const event = result2.logs[0].args
            assert.equal(event.id.toNumber(), count.toNumber(), 'id is correct')
            assert.equal(event.user, '1', 'user is correct')
            assert.equal(event.doctor, '', 'doctor is correct')
            assert.equal(event.docType, 'R', 'doctype is correct')
            assert.equal(event.link, "this.link.com", 'link is correct')
        });
    })
});
