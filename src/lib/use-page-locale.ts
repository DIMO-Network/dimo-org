import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { pagePath } from './seo';

// The current locale and the locale-independent path of the current page.
export function usePageLocale(): { locale: string; path: string } {
  const {
    siteConfig: { baseUrl },
    i18n: { currentLocale },
  } = useDocusaurusContext();
  const { pathname } = useLocation();
  return { locale: currentLocale, path: pagePath(pathname, baseUrl) };
}
