import { useEffect, useState } from "react";

const useTimer = (timerStarted, initialSeconds) => {

    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {

        let timer;

        if (timerStarted) {
            timer = setInterval(() => {
                setSeconds(prev => prev - 1)
            }, 1000);
        }

        return () => {
            if (timer) { clearInterval(timer); };
        }

    }, [timerStarted]);

    return [seconds, setSeconds];

};

export default useTimer;