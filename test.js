/**
 * Created by nilsbergmann on 25.02.17.
 */


const Bootstrapper = require('./index');

const boot = new Bootstrapper({
    chain: [
        {
            promise: true,
            function: function () {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                    }, 3000);
                });
            }
        },
        {
            function: function () {
                for (let i = 0; i<1000000000;i++);
                return 0;
            }
        }
    ]
});

boot.on('progress', console.log);
boot.on('start', () => console.log("start"));
boot.on('finished', () => console.log('finished'));

boot.promise.then(() => {
    console.log("finished");
});