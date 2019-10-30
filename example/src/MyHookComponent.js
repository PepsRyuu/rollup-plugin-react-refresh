import React , { useState, useEffect } from 'react';

export default function MyHookComponent () {
    let [ count, setCount ] = useState(0);

    useEffect(() => {
        let interval = setInterval(() => {
            setCount(c => c + 1);
        }, 200);

        return () => {
            clearInterval(interval)
        };
    }, []);

    return (
        <h2 className="MyHookComponent">MyHookComponent: {count}</h2>
    );
}