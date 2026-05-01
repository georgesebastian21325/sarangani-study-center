import SaranganiLogo from '../../../../public/sarangani-logo-without-text.png';
import { ChapelIllustration } from '../../global/styles/ChapelIllustration';
import { MEAL_CHIPS } from '../js/mealChips.js';

export default function LeftPanel() {
  return (
    <div className="login-left">
      <ChapelIllustration />
      <div className="left-overlay" />

      {/* Top badge */}
      <div className="left-top-badge">
        <img src={SaranganiLogo} alt="Sarangani Study Center" />
      </div>

      {/* Bottom content */}
      <div className="left-content">
        {/* Meal chips — same as dashboards */}
        <div className="left-chips">
          {MEAL_CHIPS.map(({ label, color }) => (
            <span
              key={label}
              className="left-chip"
              style={{
                color,
                background: `${color}18`,
                borderColor: `${color}50`,
              }}
            >
              {label}
            </span>
          ))}
        </div>

        <h2 className="left-title">
          Sarangani
          <br />
          Study Center
        </h2>
        <div className="left-rule" />
        <p className="left-quote">
          "The ordinary tasks of each day
          <br />
          are the material of our sanctification."
        </p>
        <p className="left-quote-attr">— St. Josemaría Escrivá</p>
      </div>
    </div>
  );
}
