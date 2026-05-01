import { useEffect, useMemo, useState } from 'react';
import {
  generateCalendarDays,
  getGreetingConfig,
  isPastDate,
} from '../components/global/dashboard/data/dateHelpers';
import { useToast } from '../components/global/dashboard/hooks/useToast';
import { FontLoader } from '../components/global/dashboard/styles/FontLoader';
import { Toast } from '../components/global/dashboard/ui/Toast';
import { ResidentCalendar } from '../components/resident/dashboard/calendar/ResidentCalendar';
import { EMPTY_REQUEST } from '../components/resident/dashboard/data/constants';
import { Navbar } from '../components/resident/dashboard/layout/Navbar';
import { PageHeader } from '../components/resident/dashboard/layout/PageHeader';
import { ConfirmModal } from '../components/resident/dashboard/modals/ConfirmModal';
import { MealModal } from '../components/resident/dashboard/modals/MealModal';
import { RequestModal } from '../components/resident/dashboard/modals/RequestModal';
import { GlobalStyles } from '../components/resident/dashboard/styles/styles';

export default function ResidentDashboard() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeDate, setActiveDate] = useState(null);
  const [mealModalOpen, setMealModalOpen] = useState(false);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [mealSelections, setMealSelections] = useState({});
  const [requestData, setRequestData] = useState({});
  const [calendarLoading, setCalendarLoading] = useState(true);
  const [mealSaving, setMealSaving] = useState(false);
  const [requestSaving, setRequestSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const { toasts, show: showToast } = useToast();

  const user = { name: 'John Doe' };
  const greeting = useMemo(() => getGreetingConfig(), []);
  const days = useMemo(() => generateCalendarDays(currentDate), [currentDate]);
  const activeDateKey = activeDate?.toDateString();
  const totalMealsLogged = Object.values(mealSelections).reduce(
    (acc, meals) => acc + meals.length,
    0
  );

  useEffect(() => {
    const timer = setTimeout(() => setCalendarLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  const navigateMonth = (delta) => {
    setCalendarLoading(true);
    setTimeout(() => {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + delta)
      );
      setCalendarLoading(false);
    }, 350);
  };

  const handleDayClick = (day) => {
    if (!day.currentMonth || isPastDate(day.fullDate)) return;
    setActiveDate(day.fullDate);
    setMealModalOpen(true);
  };

  const handleRequestClick = (event, day) => {
    event.stopPropagation();
    if (!day.currentMonth || isPastDate(day.fullDate)) return;
    setActiveDate(day.fullDate);
    setRequestModalOpen(true);
  };

  const handleMealSave = async () => {
    setMealSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setMealSaving(false);
    setMealModalOpen(false);
    showToast('Meal selections saved!', 'success');
  };

  const handleRequestSave = async () => {
    setRequestSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setRequestSaving(false);
    setRequestModalOpen(false);
    showToast('Special request saved!', 'success');
  };

  const handleSubmit = async () => {
    setSubmitError(null);
    setSubmitting(true);
    try {
      await new Promise((resolve, reject) => {
        setTimeout(
          () =>
            Math.random() > 0.15
              ? resolve()
              : reject(new Error('Network error')),
          1600
        );
      });
      setSubmitting(false);
      setConfirmOpen(false);
      showToast('Meals logged successfully!', 'success', 4000);
    } catch {
      setSubmitting(false);
      setSubmitError('Something went wrong. Please try again.');
      showToast('Submission failed. Please retry.', 'error');
    }
  };

  const closeConfirmModal = () => {
    setConfirmOpen(false);
    setSubmitError(null);
  };

  return (
    <>
      <FontLoader />
      <GlobalStyles />

      <div
        className="od-body min-h-screen"
        style={{ background: '#f5f0e6', color: '#3b1a0a' }}
      >
        <Navbar userName={user.name} />

        <main className="max-w-6xl mx-auto p-4 md:p-8">
          <PageHeader
            greeting={greeting}
            userName={user.name}
            totalMealsLogged={totalMealsLogged}
            onLogMeal={() => setConfirmOpen(true)}
          />

          <ResidentCalendar
            currentDate={currentDate}
            days={days}
            mealSelections={mealSelections}
            loading={calendarLoading}
            onDayClick={handleDayClick}
            onNavigateMonth={navigateMonth}
            onRequestClick={handleRequestClick}
          />
        </main>

        <ConfirmModal
          open={confirmOpen}
          onClose={closeConfirmModal}
          mealSelections={mealSelections}
          requestData={requestData}
          onSubmit={handleSubmit}
          submitting={submitting}
          submitError={submitError}
        />
        <MealModal
          open={mealModalOpen}
          date={activeDate}
          value={mealSelections[activeDateKey] || []}
          onChange={(value) =>
            setMealSelections((prev) => ({
              ...prev,
              [activeDate.toDateString()]: value,
            }))
          }
          onSave={handleMealSave}
          onClose={() => setMealModalOpen(false)}
          saving={mealSaving}
        />
        <RequestModal
          open={requestModalOpen}
          date={activeDate}
          request={requestData[activeDateKey] || EMPTY_REQUEST}
          setRequest={(dateKey, data) =>
            setRequestData((prev) => ({ ...prev, [dateKey]: data }))
          }
          onSave={handleRequestSave}
          onClose={() => setRequestModalOpen(false)}
          saving={requestSaving}
        />

        <Toast toasts={toasts} fontSize="17px" />
      </div>
    </>
  );
}
