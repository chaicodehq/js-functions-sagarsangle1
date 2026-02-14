/**
 * 🎨 Holi Color Mixer - Pure Functions
 *
 * Holi ka festival hai! Rang mix karne hain. Lekin PURE FUNCTIONS use
 * karne hain — matlab:
 *   1. Input ko KABHI modify mat karo (no mutation)
 *   2. Same input pe HAMESHA same output aaye
 *   3. Koi side effects nahi (no console.log, no external state changes)
 *
 * Har color object: { name: string, r: number, g: number, b: number }
 *   where r, g, b are 0-255 (RGB values)
 *
 * Functions:
 *
 *   1. mixColors(color1, color2)
 *      - Mix two colors by averaging their RGB values
 *      - New name: `${color1.name}-${color2.name}`
 *      - Round RGB values to integers
 *      - MUST NOT modify color1 or color2
 *      - Agar either color null/invalid, return null
 *
 *   2. adjustBrightness(color, factor)
 *      - Multiply each RGB by factor, clamp to 0-255 range
 *      - Round to integers using Math.round
 *      - Name stays same
 *      - MUST NOT modify original color
 *      - Agar color null or factor not number, return null
 *
 *   3. addToPalette(palette, color)
 *      - Return NEW array with color added at end
 *      - MUST NOT modify original palette array
 *      - Agar palette not array, return [color]
 *      - Agar color null/invalid, return copy of palette
 *
 *   4. removeFromPalette(palette, colorName)
 *      - Return NEW array without the color with that name
 *      - MUST NOT modify original palette
 *      - Agar palette not array, return []
 *
 *   5. mergePalettes(palette1, palette2)
 *      - Merge two palettes into NEW array
 *      - No duplicate names (keep first occurrence)
 *      - MUST NOT modify either original palette
 *      - Agar either not array, treat as empty array
 *
 * Hint: Use spread operator [...arr], Object spread {...obj} to create
 *   copies. NEVER use push, splice, or direct property assignment on inputs.
 *
 * @example
 *   const red = { name: "red", r: 255, g: 0, b: 0 };
 *   const blue = { name: "blue", r: 0, g: 0, b: 255 };
 *   mixColors(red, blue)
 *   // => { name: "red-blue", r: 128, g: 0, b: 128 }
 *   // red and blue objects are UNCHANGED
 */
export function mixColors(color1, color2) {
  if (!color1 || !color2 || typeof color1 !== 'object' || typeof color2 !== 'object') {
    return null;
  }
  const { name: name1, r: r1, g: g1, b: b1 } = color1;
  const { name: name2, r: r2, g: g2, b: b2 } = color2;
  if (typeof name1 !== 'string' || typeof name2 !== 'string' ||
      typeof r1 !== 'number' || typeof g1 !== 'number' || typeof b1 !== 'number' ||
      typeof r2 !== 'number' || typeof g2 !== 'number' || typeof b2 !== 'number') {
    return null;
  }
  return {
    name: `${name1}-${name2}`,
    r: Math.round((r1 + r2) / 2),
    g: Math.round((g1 + g2) / 2),
    b: Math.round((b1 + b2) / 2)
  };
}

export function adjustBrightness(color, factor) {
  if (!color || typeof color !== 'object' || typeof factor !== 'number') {
    return null;
  }
  const { name, r, g, b } = color;
  if (typeof name !== 'string' || typeof r !== 'number' || typeof g !== 'number' || typeof b !== 'number') {
    return null;
  }
  const newR = Math.min(255, Math.max(0, Math.round(r * factor)));
  const newG = Math.min(255, Math.max(0, Math.round(g * factor)));
  const newB = Math.min(255, Math.max(0, Math.round(b * factor)));
  return { name, r: newR, g: newG, b: newB };
}

export function addToPalette(palette, color) {
  if (!Array.isArray(palette)) {
    return [color];
  }
  if (!color || typeof color !== 'object') {
    return [...palette];
  }
  return [...palette, color];
}

export function removeFromPalette(palette, colorName) {
  if (!Array.isArray(palette)) {
    return [];
  }
  return palette.filter(color => color.name !== colorName);
}

export function mergePalettes(palette1, palette2) {
  if (!Array.isArray(palette1)) {
    palette1 = [];
  }
  if (!Array.isArray(palette2)) {
    palette2 = [];
  }
  const seenNames = new Set();
  const merged = [];
  [...palette1, ...palette2].forEach(color => {
    if (color && typeof color === 'object' && typeof color.name === 'string' && !seenNames.has(color.name)) {
      seenNames.add(color.name);
      merged.push(color);
    }
  });
  return merged;
}
