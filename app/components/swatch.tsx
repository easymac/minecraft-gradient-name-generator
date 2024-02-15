import colors from '@/app/data/colors.json';
import styles from './swatch.module.css';

const SWATCHES = Object.values(colors).map(c => Object.values(c));

interface SwatchProps {
  onChange: (color: any) => void;
}
export const Swatch = ({ onChange }: SwatchProps) => {
  const handleClick = (color: any) => {
    onChange({ hex: color });
  }

  const swatchEls = SWATCHES.map((s, i) => {
    const colorEls = s.map((c, j) => {
      return (
        <div
          className={styles['color']}
          style={{ backgroundColor: c }}
          onClick={() => handleClick(c)}
          key={`${i}-${j}`}
        />
      )
    })
    return (
      <div className={styles['column']} key={i}>{colorEls}</div>
    )
  });

  return <div className={styles['swatch']}>{swatchEls}</div>;
}