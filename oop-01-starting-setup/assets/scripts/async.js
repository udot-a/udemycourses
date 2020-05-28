const getPosition = opts => {
    const promise = new Promise(
        (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                success => resolve(success),
                error => {reject(error)},
                opts
            );
        }
    );

    return promise;
}

const setTimer = (duration) => {
    const promise = new Promise((resolve, reject) => {
       setTimeout(
           () => resolve("Done!"),
           duration
       );
    });
    return promise;
}

const handleTrackUser = async () => {
    console.log("Position is getting now...");

    let infoPos;

    getPosition()
        .then(postData => {
            infoPos = postData;
            return setTimer(2000);
        })
        .then(data => console.log(data, infoPos))
        .catch(err => console.warn(err))


    setTimer(2000).then(() => console.log("Timer done!"));


}
// const handleTrackUser = async () => {
//     console.log("Position is getting now...");
//
//     await setTimer(2000).then(() => console.log("Timer done!"));
//
//     try {
//         const infoPos = await  getPosition();
//
//         const data = await setTimer(1000);
//
//         console.log(data, infoPos);
//
//     } catch(error) {
//         console.warn(error)
//     }
//
//
//     // getPosition()
//     //     .then(postData => {
//     //         infoPos = postData;
//     //         return setTimer(2000);
//     //     })
//     //     .then(data => console.log(data, infoPos))
// }

btn.addEventListener("click", handleTrackUser);

// Promise.race([getPosition(), setTimer(0)])
//     .then(data => console.log(data))
//     .catch(err => console.warn("Caught...", err))

// Promise.all([getPosition(), setTimer(0)])
//     .then(data => console.log(data))

Promise.allSettled([getPosition(), setTimer(0)])
    .then(data => console.log(data));
