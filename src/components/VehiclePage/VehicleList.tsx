import React from 'react';
import Link from '@docusaurus/Link';
import type { VehicleSummary } from '../../../plugins/vehicle-pages';
import { sinceYear } from './content';

export default function VehicleList({
  vehicles,
}: {
  vehicles: VehicleSummary[];
}) {
  return (
    <ul>
      {vehicles.map(v => (
        <li key={v.slug}>
          <Link to={`/vehicles/${v.slug}`}>
            {v.make} {v.model}
          </Link>{' '}
          ({sinceYear(v.years.from)})
        </li>
      ))}
    </ul>
  );
}
