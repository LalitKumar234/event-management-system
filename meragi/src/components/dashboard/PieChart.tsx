import React from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';

const PieChartInfo = () => {
    const data01 = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
        { name: 'Group E', value: 278 },
        { name: 'Group F', value: 189 },
    ];

    const data02 = [
        { name: 'Group A', value: 2400 },
        { name: 'Group B', value: 4567 },
        { name: 'Group C', value: 1398 },
        { name: 'Group D', value: 9800 },
        { name: 'Group E', value: 3908 },
        { name: 'Group F', value: 4800 },
    ];
    return (
        <ResponsiveContainer width="100%" height={350}>
            <PieChart width={400} height={400}>
                <Pie
                    dataKey="value"
                    isAnimationActive={true}
                    data={data01}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#fdba74"
                    label
                />
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
}

export default PieChartInfo
