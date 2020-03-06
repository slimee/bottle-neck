# @smedini/bottleneck
nano-lib to limit jobs execution.

    //job will every 100ms minimum.
    const job = () => console.log(new Date().getTime())
    const bottleneck = new Bottleneck(100)
    
    bottleneck.schedule(job)
    bottleneck.schedule(job)
    
    bottleneck.setDelay(300) //delay change happened for all non-started job
    
    bottleneck.schedule(job)
    bottleneck.schedule(job)
