// Plural Component
export default function Plural(num, word) {
  if (num > 1) {
    // If Greater Quantities
    // Return Plural Word
    return num + " " + word + "s";
  } else {
    // Else Return Singular Word
    return num + " " + word;
  }
}
