/**
 * Created by nilsbergmann on 25.02.17.
 */


const Bootstrapper = require('./dist/bundle');

const boot = new Bootstrapper({
    ignoreError: true,
    parallel: true,
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
                throw "Some error";
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
}).catch(console.error);