import { AlertCircle, CheckCircle2, Users } from 'lucide-react';
import { KpiCard } from '../ui/KpiCard';
import { SectionRule } from '../ui/SectionRule';

export const KpiSummary = ({ completionRate, pendingCount }) => (
  <div>
    <SectionRule>Key Indicators</SectionRule>
    <div className="grid grid-cols-3 gap-4 mb-6">
      <KpiCard
        label="Total Residents"
        value="42"
        sub="Members in residence"
        icon={Users}
      />
      <KpiCard
        label="Pending Logs"
        value={pendingCount}
        sub="Residents with gaps today"
        icon={AlertCircle}
      />
      <KpiCard
        label="Completion Rate"
        value={`${completionRate}%`}
        sub="This week's compliance"
        icon={CheckCircle2}
      />
    </div>
  </div>
);

