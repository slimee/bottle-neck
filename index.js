module.exports = class Bottleneck {
  constructor(delay) {
    this.setDelay(delay)
    this.jobWindow = Promise.resolve()
    this.waitDelay = () => new Promise(accept => setTimeout(accept, this.delay))
  }

  setDelay(delay) {
    this.delay = delay
  }

  schedule(job) {
    const jobEnd = this.jobWindow.then(job)

    this.jobWindow = this.jobWindow
      .then(this.waitDelay)

    return jobEnd
  }
}