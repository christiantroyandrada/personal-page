export function extractLatinWoff2(css, target) {
  const blocks = [...css.matchAll(/\/\* latin \*\/\s*@font-face\s*{([\s\S]*?)}/g)]
    .map((match) => match[1]);
  const block = blocks.find((value) =>
    value.includes(`font-family: '${target.family}'`)
    && value.includes(`font-style: ${target.style}`)
    && value.includes(`font-weight: ${target.weight}`)
    && value.includes("format('woff2')"));
  const url = block?.match(/src:\s*url\(([^)]+)\)/)?.[1];
  if (!url) {
    throw new Error(`Latin WOFF2 not found for ${target.family} ${target.style} ${target.weight}`);
  }
  return url;
}
