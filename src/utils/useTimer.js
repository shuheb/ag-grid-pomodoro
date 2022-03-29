import { useEffect, useState } from "react";

const useTimer = (timerStarted, initialSeconds, cb) => {

    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {

        let timer;

        if (seconds === 0) {
            cb();
        } else {

            if (timerStarted) {
                timer = setInterval(() => {
                    // decrement timer every second
                    // could have used setSeconds(prev => prev - 1) and removed the seconds dependency
                    // but this can lead to the timers being out of sync
                    setSeconds(seconds - 1)
                }, 1000);
            }
        }

        return () => {
            if (timer) { clearInterval(timer); };
        }

    }, [timerStarted, seconds, cb]);

    return [seconds, setSeconds];

};

export default useTimer;