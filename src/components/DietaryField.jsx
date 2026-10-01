import Icon from './Icon';

export const DIET_OPTIONS = ['Vegetariano', 'Vegano', 'Sin gluten', 'Sin lactosa', 'Sin frutos secos', 'Sin marisco'];

const findOption = (token) =>
  DIET_OPTIONS.find((opt) => opt.toLowerCase() === token.toLowerCase());

/**
 * El backend guarda las restricciones como un único texto ("Vegano, Sin gluten, alergia al kiwi").
 * Se separan las opciones conocidas (botones) del resto (texto libre).
 */
export const parseDiet = (value) => {
  const tokens = (value || '').split(',').map((t) => t.trim()).filter(Boolean);
  return {
    selected: DIET_OPTIONS.filter((opt) => tokens.some((t) => findOption(t) === opt)),
    other: tokens.filter((t) => !findOption(t)).join(', '),
  };
};

export const serializeDiet = (selected, other) => {
  const text = [...DIET_OPTIONS.filter((opt) => selected.includes(opt)), other.trim()]
    .filter(Boolean)
    .join(', ');
  return text || null;
};

const DietaryField = ({ id, selected, other, onToggle, onOtherChange }) => (
  <fieldset>
    <legend className="field-label">
      <Icon name="utensils" className="w-4 h-4 text-wine-600" />
      Alergias o restricciones alimentarias
    </legend>
    <p className="field-hint">Marca lo que corresponda; si no hay ninguna, déjalo en blanco.</p>

    <div className="flex flex-wrap gap-2">
      {DIET_OPTIONS.map((opt) => {
        const inputId = `${id}-${opt.replace(/\s+/g, '-').toLowerCase()}`;
        const isSelected = selected.includes(opt);
        return (
          <label key={opt} htmlFor={inputId} className={`diet-chip ${isSelected ? 'is-selected' : ''}`}>
            <input
              id={inputId}
              type="checkbox"
              className="sr-only"
              checked={isSelected}
              onChange={() => onToggle(opt)}
            />
            {isSelected && <Icon name="check" className="w-3.5 h-3.5" strokeWidth={2.2} />}
            {opt}
          </label>
        );
      })}
    </div>

    <label htmlFor={`${id}-other`} className="sr-only">Otras alergias o intolerancias</label>
    <input
      id={`${id}-other`}
      type="text"
      value={other}
      onChange={(e) => onOtherChange(e.target.value)}
      placeholder="Otras alergias o intolerancias"
      className="text-field mt-3"
    />
  </fieldset>
);

export default DietaryField;
