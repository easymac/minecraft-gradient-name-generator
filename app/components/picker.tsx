'use client';
import Color from 'color';
import { GradientPicker } from 'react-linear-gradient-picker';
import type { Gradient, Palette } from '../utils';
import { WrappedColorPicker } from './color-picker';
import styles from './picker.module.css';

interface PickerProps {
  gradient: Gradient;
  setGradient: (gradient: Gradient) => void;
}

function gradientToPalette(gradient: Gradient) {
  return gradient.map(({ color, offset }) => ({
    color: color.hex(),
    offset,
  }));
}

function paletteToGradient(palette: Palette) {
  return palette.map(({ color, offset }) => ({
    color: Color(color),
    offset,
  }));
}

export const Picker = ({ gradient, setGradient }: PickerProps) => {

  const handleChange = (palette: Palette) => {
    setGradient(paletteToGradient(palette));
  }

  const palette = gradientToPalette(gradient);

  return (
    <div className={styles['picker']}>
      <GradientPicker
        palette={palette}
        onPaletteChange={handleChange}
        width={800}
        paletteHeight={40}
        maxStops={18}
        stopRemovalDrop={75}
      >
        <WrappedColorPicker />
      </GradientPicker>
    </div>
  )
}
