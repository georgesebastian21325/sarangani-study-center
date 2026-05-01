export function RoleToggle({ role, handleRoleSwitch }) {
  return (
    <div className="role-toggle">
      <button
        className={`role-btn ${role === 'resident' ? 'active' : ''}`}
        onClick={() => handleRoleSwitch('resident')}
      >
        Resident
      </button>
      <button
        className={`role-btn ${role === 'admin' ? 'active' : ''}`}
        onClick={() => handleRoleSwitch('admin')}
      >
        Admin
      </button>
    </div>
  );
}
