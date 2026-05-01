import { useMemo, useState } from 'react';
import {
  generateCalendarDays,
  getGreetingConfig,
} from '../components/global/dashboard/data/dateHelpers';
import { useToast } from '../components/global/dashboard/hooks/useToast';
import { FontLoader } from '../components/global/styles/FontLoader';
import { Toast } from '../components/global/dashboard/ui/Toast';
import { RESIDENTS } from '../components/admin/dashboard/js/constants';
import { Navbar } from '../components/admin/dashboard/layout/Navbar';
import { PageHeader } from '../components/admin/dashboard/layout/PageHeader';
import { Sidebar } from '../components/admin/dashboard/layout/Sidebar';
import { TabBar } from '../components/admin/dashboard/layout/TabBar';
import { DayDetailModal } from '../components/admin/dashboard/modals/DayDetailModal';
import { RemindModal } from '../components/admin/dashboard/modals/RemindModal';
import { GlobalStyles } from '../components/admin/dashboard/styles/styles';
import { CalendarTab } from '../components/admin/dashboard/tabs/CalendarTab';
import { OverviewTab } from '../components/admin/dashboard/tabs/OverviewTab';
import { ResidentsTab } from '../components/admin/dashboard/tabs/ResidentsTab';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [calendarLoading, setCalendarLoading] = useState(false);
  const [remindOpen, setRemindOpen] = useState(false);
  const [remindSending, setRemindSending] = useState(false);
  const [detailDate, setDetailDate] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const { toasts, show: showToast } = useToast();
  const greeting = useMemo(() => getGreetingConfig(), []);
  const days = useMemo(
    () => generateCalendarDays(calendarDate),
    [calendarDate]
  );

  const completionRate = Math.round(
    (RESIDENTS.reduce((acc, r) => acc + r.week, 0) /
      RESIDENTS.reduce((acc, r) => acc + r.total, 0)) *
      100
  );

  const pendingCount = RESIDENTS.filter((r) =>
    Object.values(r.meals).some((v) => !v)
  ).length;

  const navigateMonth = (delta) => {
    setCalendarLoading(true);
    setTimeout(() => {
      setCalendarDate(
        new Date(calendarDate.getFullYear(), calendarDate.getMonth() + delta)
      );
      setCalendarLoading(false);
    }, 300);
  };

  const handleDayClick = (day) => {
    if (!day.currentMonth) return;
    setDetailDate(day.fullDate);
    setDetailOpen(true);
  };

  const handleSendReminder = async () => {
    setRemindSending(true);
    await new Promise((resolve) => setTimeout(resolve, 1400));
    setRemindSending(false);
    setRemindOpen(false);
    showToast('Reminders sent to 3 residents.', 'success');
  };

  const handleRemindResident = (resident) => {
    showToast(`Reminder sent to ${resident.name}.`, 'success');
  };

  return (
    <>
      <FontLoader />
      <GlobalStyles />

      <div
        className="od-body flex flex-col min-h-screen"
        style={{ background: '#f5f0e6', color: '#3b1a0a' }}
      >
        <Navbar />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="flex flex-col flex-1 overflow-auto">
            <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

            <main className="flex-1 p-6 md:p-8">
              <PageHeader
                activeTab={activeTab}
                greeting={greeting}
                onRemind={() => setRemindOpen(true)}
              />

              {activeTab === 'overview' && (
                <OverviewTab
                  completionRate={completionRate}
                  pendingCount={pendingCount}
                />
              )}

              {activeTab === 'residents' && (
                <ResidentsTab onRemindResident={handleRemindResident} />
              )}

              {activeTab === 'calendar' && (
                <CalendarTab
                  calendarDate={calendarDate}
                  calendarLoading={calendarLoading}
                  days={days}
                  onDayClick={handleDayClick}
                  onNavigateMonth={navigateMonth}
                />
              )}
            </main>
          </div>
        </div>
      </div>

      <RemindModal
        open={remindOpen}
        onClose={() => setRemindOpen(false)}
        onSend={handleSendReminder}
        sending={remindSending}
      />
      <DayDetailModal
        open={detailOpen}
        date={detailDate}
        onClose={() => setDetailOpen(false)}
      />

      <Toast toasts={toasts} />
    </>
  );
}
