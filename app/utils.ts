import Color from 'color';

export type CharColor = { character: string; color: Color };
export type Stop = { color: Color; offset: number };
export type Gradient = Stop[];

export type Palette = { color: string; offset: number }[];

export function debounce(fn: Function, delay: number, immediate: boolean) {
  let timeout: ReturnType<typeof setTimeout> | null;
  return function(this: any) {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) fn.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout!);
    timeout = setTimeout(later, delay);
    if (callNow) fn.apply(context, args);
  }
}

export function parseUrl(url: string) {
  try {
    const [ username, gradientString ] = url.split('#').slice(1);

    const stops = gradientString.split('::').map(stop => {
      const [ color, offset ] = stop.split('@');
      return { color: Color(color), offset: parseFloat(offset) };
    });

    return { username, stops };
  } catch (e) {
    return false;
  }
}

export function colorAtPercent<Color>(gradient: Gradient, percent: number) {
  gradient.sort((a, b) => a.offset - b.offset);
  if (percent <= gradient[0].offset) return gradient[0].color;
  if (percent >= gradient[gradient.length - 1].offset) {
    return gradient[gradient.length - 1].color;
  }

  for (let i = 1; i < gradient.length; i++) {
    const prev = gradient[i - 1];
    const next = gradient[i];
    if (percent >= prev.offset && percent <= next.offset) {
      const percentDiff = (percent - prev.offset) / (next.offset - prev.offset);
      return prev.color.mix(next.color, percentDiff);
    }
  }
  return gradient[0].color;
}

export function applyGradient(
  gradient: Gradient,
  inputString: string,
): CharColor[] {
  const charColors: CharColor[] = [];
  for (let i = 0; i < inputString.length; i++) {
    const percent = i / (inputString.length - 1);
    const color = colorAtPercent(gradient, percent);
    charColors.push({ character: inputString[i], color });
  }
  return charColors;
}