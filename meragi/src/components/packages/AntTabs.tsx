"use client"
import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio, Tabs } from 'antd';

type TabPosition = 'left' | 'right' | 'top' | 'bottom';

const AntTabs: React.FC = () => {
  const [mode, setMode] = useState<TabPosition>('top');

  const handleModeChange = (e: RadioChangeEvent) => {
    setMode(e.target.value);
  };

  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        tabPosition={mode}
        style={{ height: 220 }}
        items={new Array(30).fill(null).map((_, i) => {
          const id = String(i);
          return {
            label: `Tab-${id}`,
            key: id,
            // disabled: i === 28,
            children: `Content of tab ${id}`,
          };
        })}
      />
    </div>
  );
};

export default AntTabs;