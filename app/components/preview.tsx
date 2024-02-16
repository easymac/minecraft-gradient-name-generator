import { useState } from 'react';
import Color from 'color';
import { applyGradient, type Gradient } from '../utils';
import styles from './preview.module.css';

import bg01 from '@/public/backgrounds/bg_01.jpg';
import bg02 from '@/public/backgrounds/bg_02.jpg';
import bg03 from '@/public/backgrounds/bg_03.jpg';
import bg04 from '@/public/backgrounds/bg_04.jpg';
import bg05 from '@/public/backgrounds/bg_05.jpg';

const BACKGROUNDS = [bg01, bg02, bg03, bg04, bg05];

interface PreviewProps {
  inputString: string;
  setInputString: (inputString: string) => void;
  gradient: Gradient;
}

export const Preview = (
  { inputString, setInputString, gradient }: PreviewProps
) => {
  const [backgroundIndex, setBackgroundIndex] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputString(e.target.value);
  }

  const charColors = applyGradient(gradient, inputString);

  const charEls = charColors.map(({ character, color }, i) => (
    <span key={i} style={{ color: color.hex() }}>{character}</span>
  ));

  function shadowColor(color: Color) {
    return Color(color.array().map(x => Math.floor(x / 4)));
  }

  const charShadowEls = charColors.map(({ character, color }, i) => (
    <span key={i} style={{ color: shadowColor(color).string() }}>
      {character}
    </span>
  ));

  const background = BACKGROUNDS[backgroundIndex % BACKGROUNDS.length];


  return (
    <div
      className={styles['preview']}
      style={{ backgroundImage: `url(${background.src})`}}
    >
      <div className={styles['name']}>
        <input
          className={styles['editable']}
          defaultValue={inputString}
          onChange={handleChange}
          autoFocus
        />
        <div className={styles['visible']}>{charEls}</div>
        <div className={styles['shadow']}>{charShadowEls}</div>
      </div>
      <div className={styles['background-buttons']}>
        <button onClick={() => setBackgroundIndex(backgroundIndex + 1)}>
          Change background
        </button>
      </div>
    </div>
  )
}