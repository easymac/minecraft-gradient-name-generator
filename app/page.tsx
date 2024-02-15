'use client';
import Color from 'color';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Preview } from './components/preview';
import { Picker } from './components/picker';
import { Code } from './components/code';
import { Gradient, parseUrl } from './utils';
import styles from "./page.module.css";

import DefaultGradients from './data/gradients.json';

export default function Home() {
  const pathname = usePathname();
  const parsedUrl = parseUrl(pathname);
  let initialGradient, initialString;
  if (parsedUrl) {
    initialGradient = parsedUrl.stops;
    initialString = parsedUrl.username;
  } else {
    initialString = 'Username';
    initialGradient = [
      { offset: 0, color: Color('#31CFB4') },
      { offset: 1, color: Color('#7E20CF') },
    ];
  }

  const [inputString, setInputString] = useState(initialString);
  const [gradient, setGradient] = useState(initialGradient);

  const randomize = () => {
    const randomIndex = Math.floor(Math.random() * DefaultGradients.length);
    const randomGradient = DefaultGradients[randomIndex];
    const newGradient = randomGradient.colors.map((color, i) => ({
      color: Color(color),
      offset: i / (randomGradient.colors.length - 1),
    }));
    setGradient(newGradient);
  }

  const reverse = () => {
    const newGradient = gradient.map((stop, i) => {
      return { color: stop.color, offset: 1 - stop.offset };
    });
    setGradient(newGradient);
  }

  return (
    <main className={styles['main']}>
      <h1>Gradient generator</h1>
      <p className={styles['instructions']}>
        Click username to edit preview.
      </p>
      <Preview
        inputString={inputString}
        setInputString={setInputString}
        gradient={gradient}
      />
      <button onClick={randomize}>Randomize</button>
      <button onClick={reverse}>Reverse</button>
      <Picker gradient={gradient} setGradient={setGradient} />
      <p className={styles['instructions']}>
        Send this code to your favorite staff member!
      </p>
      <Code inputString={inputString} gradient={gradient as Gradient} />
    </main>
  );
}
