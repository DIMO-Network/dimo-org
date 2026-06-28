import type { ReactNode } from 'react';

// Override of @theme/DocBreadcrumbs/StructuredData.
//
// Docusaurus' native docs breadcrumbs emit their own BreadcrumbList JSON-LD,
// which on this site collapses to a single (current-page-only) ListItem because
// the intermediate API categories have no index pages. That duplicates — and
// conflicts with — the full Home > Docs > Page BreadcrumbList we emit from
// src/theme/DocItem/Layout. Returning null suppresses the native structured
// data while leaving the visual breadcrumb nav fully intact.
export default function DocBreadcrumbsStructuredData(): ReactNode {
  return null;
}
