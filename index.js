/**
 * Generate a color from a string
 *
 * @param {string} input string to generate the color
 * @param {object} options the options object
 * @param {string} options.format format of the output (hsl by default)
 * @param {number} options.saturation percentage of saturation of the color
 * @param {number} options.lightness percentage of lightness of the color
 *
 * @returns Generated color
 */
const string2color = (
  input = "",
  { format = "hsl", saturation = 100, lightness = 75 } = {}
) => {
  if (!~["hsl", "rgb"].indexOf(format))
    throw new Error(`Unsupported format ${format}`);

  if (typeof saturation !== "number" || saturation > 100 || saturation < 0)
    throw new Error(`Invalid saturation ${saturation}`);

  if (typeof lightness !== "number" || lightness > 100 || lightness < 0)
    throw new Error(`Invalid lightness ${lightness}`);

  const [h, s, l] = generateHsl(input, saturation, lightness);

  switch (format) {
    case "hsl":
      return `hsl(${h}, ${s}%, ${l}%)`;
    case "rgb": {
      const [r, g, b] = hslToRgb(h / 360, s / 100, l / 100);
      return `#${r}${g}${b}`;
    }
  }
};

/**
 * Hash the string to return a number based on the character in the string
 *
 * @param {string} input string to hash
 *
 * @returns {number} string hash
 */
const hash = input => input.split("").reduce((a, b) => a + b.charCodeAt(0), 0);

/**
 * Generate the css hsl color base on the input value.
 *
 * @param {string} input the string the color will be related to
 * @param {number} saturation percentage of saturation of the color
 * @param {number} lightness percentage of lightness of the color
 * @returns {number[]} h,s,l values in an array
 */
const generateHsl = (input, saturation, lightness) => [
  hash(input) % 360,
  saturation,
  isValidInput(input) ? lightness : 0
];

const isValidInput = input => typeof input === "string" && input;

/**
 * Thanks to @mjackson https://gist.github.com/mjackson/5311256
 *
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param {number} h The hue
 * @param {number} s The saturation
 * @param {number} l The lightness
 * @return {string[]} The hexadecimal RGB representation
 */
function hslToRgb(h, s, l) {
  var r, g, b;

  function hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return [r * 255, g * 255, b * 255].map(i => Math.round(i).toString(16));
}
export default string2color;
