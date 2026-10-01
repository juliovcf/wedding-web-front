import Icon from './Icon';

/**
 * Grupo de opciones tipo radio presentado como tarjetas.
 * value === null significa que todavía no se ha elegido nada.
 */
const ChoiceGroup = ({ id, name, legend, hint, options, value, onChange, error }) => {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined;

  return (
    <fieldset id={id} className={`choice-group ${error ? 'has-error' : ''}`} aria-describedby={describedBy}>
      <legend className="field-label">{legend}</legend>
      {hint && <p id={hintId} className="field-hint">{hint}</p>}

      <div className={`grid gap-2.5 ${options.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {options.map((opt) => {
          const inputId = `${id}-${String(opt.value)}`;
          const isSelected = value === opt.value;
          return (
            <label
              key={String(opt.value)}
              htmlFor={inputId}
              className={`choice-card ${opt.tone ? `choice-card--${opt.tone}` : ''} ${isSelected ? 'is-selected' : ''}`}
            >
              <input
                id={inputId}
                type="radio"
                name={name}
                className="sr-only"
                checked={isSelected}
                onChange={() => onChange(opt.value)}
              />
              {opt.icon && <Icon name={opt.icon} className="choice-card__icon" />}
              <span className="choice-card__label">{opt.label}</span>
              {opt.desc && <span className="choice-card__desc">{opt.desc}</span>}
            </label>
          );
        })}
      </div>

      {error && (
        <p id={errorId} className="field-error">
          <Icon name="alert" className="w-4 h-4 flex-shrink-0" />
          {error}
        </p>
      )}
    </fieldset>
  );
};

export default ChoiceGroup;
