// Posts without their own cover point at the site-wide social card, which
// would show the same logo as every post's thumbnail.
const GENERIC_SOCIAL_CARD = '/img/dimo-social-card.png';

export function coverImage(image: string | undefined): string | undefined {
  return image && image !== GENERIC_SOCIAL_CARD ? image : undefined;
}

// The text before each author name in a byline: "A, B and C".
export function bylineSeparator(index: number, count: number): string {
  if (index === 0) return '';
  return index === count - 1 ? ' and ' : ', ';
}

export function bylineNames(names: string[]): string {
  return names.map((n, i) => bylineSeparator(i, names.length) + n).join('');
}
