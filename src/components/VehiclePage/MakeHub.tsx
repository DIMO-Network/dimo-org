import React, { type ReactNode } from 'react';
import ContentPageLayout from '../ContentPageLayout';
import type { VehicleSummary } from '../../../plugins/vehicle-pages';
import VehicleList from './VehicleList';

const SITE = 'https://dimo.org';

export default function MakeHub({
  vehicles,
}: {
  vehicles: VehicleSummary[];
}): ReactNode {
  const make = vehicles[0].make;
  const makeSlug = vehicles[0].slug.split('/')[0];
  const h1 = `${make} vehicle data API: supported models and signals`;
  const description = `${make} models that connect to DIMO, with model years, connection options and available signals for each.`;
  return (
    <ContentPageLayout
      title={`${make} Vehicle Data API: Supported Models | DIMO`}
      description={description}
      canonicalPath={`/vehicles/${makeSlug}`}
      breadcrumbs={[
        { name: 'Home', url: `${SITE}/` },
        { name: 'Vehicles', url: `${SITE}/vehicles` },
        { name: make },
      ]}
      schema={{
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: h1,
        description,
        url: `${SITE}/vehicles/${makeSlug}`,
      }}
      heroEyebrow="Vehicle data"
      heroTitle={h1}
      ctaLabel="Get API keys"
      ctaHref="https://console.dimo.org/sign-in"
    >
      <p>
        DIMO gives developers API access to {make} vehicle-state data. Each
        model page lists the model years that connect, the connection options
        and the signals you can query.
      </p>
      <VehicleList vehicles={vehicles} />
    </ContentPageLayout>
  );
}
