import { RESIDENTS } from '../js/constants';
import { ResidentStatusTable } from './ResidentStatusTable';
import { StatusLegend } from './StatusLegend';

export const ResidentsStatusCard = ({ onRemindResident }) => (
  <div className="od-card">
    <div className="od-card-header flex justify-between items-start">
      <div>
        <p className="od-card-header-title">Today's Meal Submission Status</p>
        <p className="od-card-header-sub">
          Logged by session for each resident
        </p>
      </div>
      <StatusLegend />
    </div>

    <ResidentStatusTable
      residents={RESIDENTS}
      onRemindResident={onRemindResident}
    />
  </div>
);
