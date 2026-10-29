import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import ContentPageLayout from '../ContentPageLayout';
import type { VehicleSummary } from '../../../plugins/vehicle-pages';
import VehicleList from './VehicleList';

const SITE = 'https://dimo.org';
const H1 = 'Vehicle data API coverage by make and model';
const DESCRIPTION =
  'Which vehicles connect to DIMO, by make and model: model years, connection options and the signals developers can query.';

export default function VehicleIndex({
  vehicles,
}: {
  vehicles: VehicleSummary[];
}): ReactNode {
  const makes = [...new Set(vehicles.map(v => v.make))];
  return (
    <ContentPageLayout
      title="Vehicle Data API Coverage by Make & Model | DIMO"
      description={DESCRIPTION}
      canonicalPath="/vehicles"
      breadcrumbs={[{ name: 'Home', url: `${SITE}/` }, { name: 'Vehicles' }]}
      schema={{
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: H1,
        description: DESCRIPTION,
        url: `${SITE}/vehicles`,
      }}
      heroEyebrow="Vehicle data"
      heroTitle={H1}
      ctaLabel="Get API keys"
      ctaHref="https://console.dimo.org/sign-in"
    >
      <p>
        DIMO gives developers API access to vehicle-state data: diagnostics,
        fault codes, battery and fuel health, odometer, and maintenance signals.
        Pick a make to see which model years connect and what you can query.
      </p>
      {makes.map(make => {
        const ofMake = vehicles.filter(v => v.make === make);
        return (
          <section key={make}>
            <h2>
              <Link to={`/vehicles/${ofMake[0].slug.split('/')[0]}`}>
                {make}
              </Link>
            </h2>
            <VehicleList vehicles={ofMake} />
          </section>
        );
      })}
    </ContentPageLayout>
  );
}
