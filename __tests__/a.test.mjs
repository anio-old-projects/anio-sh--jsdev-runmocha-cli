import assert from "assert"

const add = (await import("../src/add.mjs")).default

it("should add to numbers from an es module", () => {
	assert.equal(add(3, 5), 8)
})
