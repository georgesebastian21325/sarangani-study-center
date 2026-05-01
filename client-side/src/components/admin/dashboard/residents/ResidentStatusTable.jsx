import { ResidentRow } from './ResidentRow';
import { ResidentTableHead } from './ResidentTableHead';

export const ResidentStatusTable = ({ residents, onRemindResident }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <ResidentTableHead />
      <tbody>
        {residents.map((resident) => (
          <ResidentRow
            key={resident.id}
            resident={resident}
            onRemind={onRemindResident}
          />
        ))}
      </tbody>
    </table>
  </div>
);

