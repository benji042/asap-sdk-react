import React, { useEffect } from 'react';
import useStore from '../../store';

interface CountDownProps {
    onCountdownEnd?: () => void;
}

const CountDown: React.FC<CountDownProps> = ({ onCountdownEnd }) => {
    const { seconds, countDown } = useStore();

    useEffect(() => {
        if (seconds <= 0) {
            if (onCountdownEnd) {
                onCountdownEnd();
            }
            return;
        }

        const timer = setTimeout(() => {
            countDown();
        }, 1000);

        return () => clearTimeout(timer);
    }, [seconds, onCountdownEnd, countDown]);

    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60);
        const remainingSeconds = totalSeconds % 60;
        return [minutes.toString().padStart(2, '0'), remainingSeconds.toString().padStart(2, '0')];
    };

    return (
        <div className="flex flex-row items-center justify-center gap-2.5">
            <div className="basis-1/3 bg-red-300 rounded-md flex justify-center items-center p-2 max-w-[50px]">
                <span className='font-bold font-monserrat text-sm text-red-600 animate-pulse'>{formatTime(seconds)[0]}</span>
            </div>
            <div className="basis-1/3 flex justify-center items-center max-w-[25px]">
                <span className='font-black font-monserrat text-md'>:</span>
            </div>
            <div className="basis-1/3 bg-red-300 rounded-md flex justify-center items-center p-2 max-w-[50px]">
                <span className='font-bold font-monserrat text-sm text-red-600 animate-pulse'>{formatTime(seconds)[1]}</span>
            </div>
        </div>
    );
};

export default CountDown;