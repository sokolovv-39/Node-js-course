import process from 'node:process'
import EventEmitter from 'node:events'

class Timer {
    emmiter = new EventEmitter()
    constructor(date, id) {
        this.remainingTime = (date - new Date().setMilliseconds(0)) / 1000
        this.id = id
        this.emmiter.on('showRemTime', this.showRemTime.bind(this))
        this.timerStart()
    }

    timerStart() {
        console.log(`Timer №${this.id} is running!`)
        const timerId = setInterval(() => {
            this.remainingTime -= 1
            this.emmiter.emit('showRemTime', timerId)
        }, 1000)
    }

    showRemTime(timerId) {
        if (this.remainingTime > 0) {
            let timestamp = this.remainingTime
            //Допустим, что в каждом месяце 30 дней
            let years = Math.floor(timestamp / 31104000)
            if (years > 0) timestamp -= years * 31104000
            let months = Math.floor(timestamp / 2592000)
            if (months > 0) timestamp -= months * 2592000
            let days = Math.floor(timestamp / 86400)
            if (days > 0) timestamp -= days * 86400
            let hours = Math.floor(timestamp / 3600)
            if (hours > 0) timestamp -= hours * 3600
            let minutes = Math.floor(timestamp / 60)
            if (minutes > 0) timestamp -= minutes * 60
            let seconds = timestamp
            console.log(`Timer №${this.id} remaining time: ${years} years ${months} months ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`)
        }
        else {
            clearInterval(timerId);
            console.log(`Timer №${this.id} is up!`)
        }
    }
}

for (let i = 2; i < process.argv.length; i++) {
    let date = process.argv[i].split('-').reverse().join('-')
    let hour = Number(date.slice(11))
    date = date.slice(0, 10)
    new Timer(new Date(date).setHours(hour, 0, 0, 0), i - 1)
}

