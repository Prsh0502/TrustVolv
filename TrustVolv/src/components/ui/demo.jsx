import React from 'react';
import { AnimatedCard, CardBody, CardTitle, CardDescription, CardVisual, Visual3 } from './animated-card-chart';

export default function DemoAnimatedCard() {
  return (
    <AnimatedCard style={{ maxWidth: '400px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
      <CardBody style={{ padding: '24px' }}>
        <CardTitle>Response Rate Optimization</CardTitle>
        <CardDescription>Hover over the chart to see dynamic statistics.</CardDescription>
        <CardVisual style={{ marginTop: '20px' }}>
          <Visual3 mainColor="#FF5E7A" secondaryColor="#F59E0B" />
        </CardVisual>
      </CardBody>
    </AnimatedCard>
  );
}
