import { ResidentsStatusCard } from '../residents/ResidentsStatusCard';
import { SectionRule } from '../ui/SectionRule';

export const ResidentsTab = ({ onRemindResident }) => (
  <div className="od-fade-in">
    <SectionRule>Resident Logging Tracker</SectionRule>
    <ResidentsStatusCard onRemindResident={onRemindResident} />
  </div>
);

