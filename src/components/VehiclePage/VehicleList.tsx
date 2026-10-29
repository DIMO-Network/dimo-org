import React from 'react';
import Link from '@docusaurus/Link';
import type { VehicleSummary } from '../../../plugins/vehicle-pages';
import { formatYears } from './content';

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
          ({formatYears(v.years)})
        </li>
      ))}
    </ul>
  );
}
