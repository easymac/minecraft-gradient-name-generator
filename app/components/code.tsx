import { useState, useRef } from 'react';
import Color from 'color';
import { Gradient, applyGradient } from '../utils';
import styles from './code.module.css';

interface CodeProps {
  inputString: string;
  gradient: Gradient;
}
export const Code = ({ inputString, gradient }: CodeProps) => {
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const charColors = applyGradient(gradient, inputString);
  
  const result = charColors
    .map(charColor => `&${charColor.color.hex()}${charColor.character}`)
    .join('');

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className={styles['code']}>
      <input
        onFocus={e => e.target.select()}
        ref={inputRef}
        readOnly
        value={result}
      />
      <button onClick={handleCopy}>
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  )
}