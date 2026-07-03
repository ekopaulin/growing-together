import React from 'react';
import { renderToString } from 'react-dom/server';
import Hero from './src/components/Hero.jsx';

try {
  const html = renderToString(<Hero />);
  console.log("SUCCESS");
} catch (e) {
  console.error("CRASH:", e);
}
