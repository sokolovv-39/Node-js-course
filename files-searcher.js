#!/usr/bin/env node

import inquirer from "inquirer"
import path from "path"
import fsp from 'node:fs/promises'
import process from "process"
import { createReadStream } from "fs"
import { Transform } from "stream"
import colors from 'colors'
import { Command } from "commander"

async function startFileSearcher(dirname) {
    console.log('dirname')
    console.log(dirname)
    const src = await fsp.stat(dirname)
    if (src.isFile()) {
        readFile(dirname, '')
    }
    else {
        fsp
            .readdir(path.join(dirname))
            .then((choices) => {
                return inquirer.prompt({
                    name: 'fileName',
                    type: 'list',
                    message: 'Choose file',
                    choices
                })
            })
            .then(async ({ fileName }) => {
                const src = await fsp.stat(path.join(dirname, fileName))
                if (src.isFile()) {
                    readFile(dirname, fileName)
                }
                else {
                    dirname = path.join(dirname, fileName)
                    startFileSearcher(path.join(dirname))
                }
            })
    }
}

function readFile(dirname, fileName) {
    const rs = createReadStream(path.join(dirname, fileName))
    const transform = new Transform({
        transform(chunk, encoding, callback) {
            const matchBeginIndex = chunk.toString().search(matchCombination)
            if (matchCombination && ~matchBeginIndex) {
                const matchedValue = colors.green(chunk.toString().substr(matchBeginIndex, matchCombination.length))
                const editedChunk = chunk.toString().slice(0, matchBeginIndex).concat(matchedValue).concat(chunk.toString().slice(matchBeginIndex + matchCombination.length))
                callback(null, editedChunk)
            }
            else callback(null, chunk)
        }
    })
    rs.pipe(transform).pipe(process.stdout)
}

const program = new Command()
program
    .name('Files Searcher')
    .description('Find and read files')
    .version('1.0.0')
program
    .option('-p, --path <type>', 'Specify the path to the file')
    .option('-s, --search <type>', 'Enter a set of characters to search for')
program.parse(process.argv)

const options = program.opts()
let __dirname = options.path ? options.path : process.cwd()
const matchCombination = options.search ? options.search : null

startFileSearcher(__dirname) 
