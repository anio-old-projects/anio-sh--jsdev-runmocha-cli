#!/usr/bin/env node --experimental-detect-module
import process from "node:process"
import fs from "node:fs/promises"
import main from "./main.mjs"

if (process.argv.length !== 3) {
	process.stderr.write(`Usage: anio_runmocha <tests_directory>\n`)
	process.exit(2)
}

try {
	const project_root = await fs.realpath(process.argv[2])

	process.chdir(project_root)

	await main(project_root)
} catch (error) {
	process.stderr.write(`${error.message}\n`)

	process.stderr.write(`\n-- stack trace--${error.stack}\n`)

	process.exit(1)
}
