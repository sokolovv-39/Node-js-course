import fs from 'node:fs'
import readline from 'node:readline'
import fsp from 'node:fs/promises'

const rl = readline.createInterface({
    input: fs.createReadStream('access_tmp.log'),
    crlfDelay: Infinity,
});

rl.on('line', (line) => {
    if (/89.123.1.41/.test(line))
        fsp.writeFile('1_IP.log', `${line}\n`, { flag: 'a' })
    if (/34.48.240.111/.test(line)) {
        fsp.writeFile('2_IP.log', `${line}\n`, { flag: 'a' })
    }
});
