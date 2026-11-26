// Posts without their own cover point at the site-wide social card, which
// would show the same logo as every post's thumbnail.
const GENERIC_SOCIAL_CARD = '/img/dimo-social-card.png';

export function coverImage(image: string | undefined): string | undefined {
  return image && image !== GENERIC_SOCIAL_CARD ? image : undefined;
}

export function bylineNames(names: string[]): string {
  if (names.length <= 1) return names.join('');
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
}
