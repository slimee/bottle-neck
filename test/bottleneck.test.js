const Bottleneck = require('../index')

describe('Bottleneck', () => {
  test('waitDelay', () => {
    const expectedDelay = 100
    const bottleneck = new Bottleneck(expectedDelay)
    let time = new Date().getTime()
    return bottleneck.waitDelay(expectedDelay)
      .then(() => {
        const actualDelay = new Date().getTime() - time
        const delta = actualDelay - expectedDelay
        expect(delta).toBeLessThan(10)
        expect(delta).toBeGreaterThanOrEqual(0)
      })
  })
  test('schedule', () => {
    const expectedDelay = 100
    const bottleneck = new Bottleneck(expectedDelay)

    let times = []
    const job = () => times.push(new Date().getTime())
    const lastjob = () => {
      for (let i = 1; i < times.length; i++) {
        const actualDelay = times[i] - times[i - 1]
        const delta = actualDelay - expectedDelay
        expect(delta).toBeLessThan(20)
        expect(delta).toBeGreaterThanOrEqual(0)
      }
    }

    bottleneck.schedule(job)
    bottleneck.schedule(job)
    bottleneck.schedule(job)
    return bottleneck.schedule(lastjob)
  })
})
