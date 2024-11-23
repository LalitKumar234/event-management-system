"use client"
import React, { useState } from 'react';


interface WheelItem {
    label: string;
    color: string;
}

interface SpinWheelProps {
    items: WheelItem[];
}

const Wheel: React.FC<SpinWheelProps> = ({ items }) => {
    const [rotation, setRotation] = useState(0);

    const spinWheel = () => {
        const degrees = Math.floor(Math.random() * 360) + 360 * 5; // 5 full rotations
        setRotation(degrees);
    };

    return (
        <div className="container">
            <div
                className="wheel"
                style={{ transform: `rotate(${rotation}deg)` }}
            >
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="item"
                        style={{ backgroundColor: item.color }}
                    >
                        {item.label}
                    </div>
                ))}
            </div>
            <button onClick={spinWheel} className="spinButton">
                Spin
            </button>
        </div>
    );
};

export default Wheel;
