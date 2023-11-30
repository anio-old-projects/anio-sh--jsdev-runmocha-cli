import fs from "node:fs/promises"
import path from "node:path"
import process from "node:process"

import Mocha from "mocha"

async function isDirectory(p) {
	try {
		const stat = await fs.lstat(p)

		return stat.isDirectory()
	} catch {
		return false
	}
}

async function findTestFiles(dir, ret, root_dir = null) {
	if (root_dir === null) {
		root_dir = dir
	}

	const entries = await fs.readdir(dir)

	for (const entry of entries) {
		const entry_path = path.resolve(dir, entry)

		if (await isDirectory(entry_path)) {
			await findTestFiles(entry_path, ret, root_dir)
		} else if (entry_path.endsWith(".test.mjs")) {
			process.stderr.write(`[@anio-sh/runmocha] Adding '${path.relative(root_dir, entry_path)}'\n`)

			ret.push(entry_path)
		}
	}

	return ret
}

export default async function(project_root) {
	const tests_path = path.resolve(project_root, ".")
	let test_files = []
	const mocha = new Mocha()

	/*if (!(await isDirectory(tests_path))) {
		process.stderr.write(`${project_root}: no __tests__ directory found\n`)
		process.exit(2)
	}*/

	await findTestFiles(tests_path, test_files)

	for (const test_file of test_files) {
		mocha.addFile(test_file)
	}

	if (!test_files.length) {
		process.stderr.write(
			`No test files found!\n`
		)

		process.exit(2)
	}

	await mocha.loadFilesAsync()

	mocha.run(failures => {
		if (failures) {
			process.exit(1)
		}

		process.exit(0)
	})
}
