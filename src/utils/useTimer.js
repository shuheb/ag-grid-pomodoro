import { useEffect, useState } from "react";

const useTimer = (timerStarted, initialSeconds, taskCompletedCallback) => {

    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        let timer;

        if (timerStarted) {
            if (seconds === 0) {
                taskCompletedCallback()
            } else if (seconds > 0) {
                timer = setInterval(() => {
                    // could have used setSeconds(prev => prev - 1) and removed the seconds dependency
                    // but this can lead to the timers being out of sync
                    setSeconds(seconds - 1)
                }, 1000);
            }
        }

        return () => {
            if (timer) { clearInterval(timer); };
        }

    }, [timerStarted, seconds, taskCompletedCallback]);

    return [seconds, setSeconds];
};

export default useTimer;