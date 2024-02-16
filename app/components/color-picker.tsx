import { Hue, Saturation, EditableInput } from 'react-color/lib/components/common';
import { CustomPicker, CustomPickerProps, CustomPickerInjectedProps } from 'react-color';
import { Swatch } from './swatch';
import styles from './color-picker.module.css';
import Color from 'color';
interface ColorPickerProps extends CustomPickerProps {
  onChange: (color: any) => void;
}
export function ColorPicker(props: ColorPickerProps) {
  const color = Color(props.color);
  const handleChange = (c: any) => {
    if (c.hex) {
      try {
        const newColor = Color(c.Hex);
        props.onChange({ hex: newColor.hex()})
      } catch (e) {
        // Not a color. Do nothing.
      }
    } else {
      const newColor = Color({
        ...color.object(),
        ...c
      });
      props.onChange({ hex: newColor.hex() });
    }
  }
  return (
    <div className={styles['color-picker']}>
      <p className={styles['instructions']}>
        Click the slider above to add stops. Drag the stops off to remove.
      </p>
      <div className={styles['wrapper']}>
        <SaturationPicker {...props} color={color.hex()} />
        <div className={styles['hue-wrapper']}>
          <HuePicker {...props} color={color.hex()} />
          <div className={styles['input-wrapper']}>
            <EditableInput onChange={handleChange} value={color.hex()} label='hex' />
            <EditableInput onChange={handleChange} value={color.red()} label='r' />
            <EditableInput onChange={handleChange} value={color.green()} label='g' />
            <EditableInput onChange={handleChange} value={color.blue()} label='b' />
          </div>
        </div>
      </div>
      <Swatch onChange={props.onChange} />
    </div>
  )
}

interface WrappedColorPickerProps extends CustomPickerProps {
  onSelect?: (color: string) => void;
}
export function WrappedColorPicker(props: WrappedColorPickerProps) {
  const handleChange = (c: any) => {
    if (props.onSelect) props.onSelect(c.hex)
  }
  return (
    <ColorPicker
      {...props}
      onChange={handleChange}
    />
  );
}

const HuePointer = ({ hsl }: any) => {
  return (
    <div
      className={styles['hue-pointer']}
      style={{
        backgroundColor: `hsl(${hsl.h}, 100%, 50%)`,
      }}
    />
  );
}

const SaturationPointer = ({ hex }: any) => (
  <div
    className={styles['saturation-pointer']}
    style={{ backgroundColor: hex }}
  />
)

const CustomHuePicker = (props: CustomPickerInjectedProps) => {
  return (
    <div className={styles['hue-picker']}>
      <Hue {...props} pointer={HuePointer} />
    </div>
  );
}

const CustomSaturationPicker = (props: CustomPickerInjectedProps) => {
  return (
    <div className={styles['saturation-picker']}>
      <Saturation {...props} pointer={SaturationPointer} />
    </div>
  );
}

const HuePicker = CustomPicker(CustomHuePicker);
const SaturationPicker = CustomPicker(CustomSaturationPicker);