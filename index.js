import process from 'node:process';
import colors from 'colors'

function isPrime(n) {
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false
    }
    isOnePrime = true
    return true
}

let setColor = 'green';
let isOnePrime = false;

if (Number(process.argv[2]) && Number(process.argv[3])) {
    for (let i = +process.argv[2]; i <= +process.argv[3]; i++) {
        if (isPrime(i) === true) {
            if (setColor === 'green') {
                console.log(colors.green(i));
                setColor = 'yellow';
            }
            else if (setColor === 'yellow') {
                console.log(colors.yellow(i));
                setColor = 'red';
            }
            else {
                console.log(colors.red(i));
                setColor = 'green'
            }
        }
    }
    if (isOnePrime === false) console.log(colors.red('There is not a single prime number in the range'))
}
else console.error('ArgumentsError: All arguments must be numbers')