import { useEffect, useRef, useState } from 'react';
import { useGuests } from '../contexts/GuestContext';
import ChoiceGroup from './ChoiceGroup';
import ConfirmationSummary from './ConfirmationSummary';
import DietaryField, { parseDiet, serializeDiet } from './DietaryField';
import Icon from './Icon';

const RETURN_OPTIONS = [
  { value: '21h', label: '21:00', icon: 'sunset', desc: 'Vuelta temprana' },
  { value: '00h', label: '00:00', icon: 'moon', desc: 'Tras la fiesta' },
];

const isValidReturn = (value) => RETURN_OPTIONS.some((opt) => opt.value === value);
const busReturnLabel = (value) => RETURN_OPTIONS.find((opt) => opt.value === value)?.label ?? value;

// Orden en el que se revisan los campos para llevar al usuario al primer error
const FIELD_ORDER = ['attendance', 'bus', 'busTime'];
const fieldId = (guestId, field) => `guest-${guestId}-${field}`;

/**
 * En el backend confirmedAttendance y goingByBus valen false por defecto, así que
 * "false" puede significar "todavía no ha contestado". Solo se marca de inicio lo que
 * seguro es una respuesta; lo demás queda sin elegir y hay que contestarlo.
 */
const toFormGuest = (guest) => {
  const attending = guest.confirmedAttendance === true ? true : null;
  const bus = isValidReturn(guest.bus) ? guest.bus : '';
  // Si ya confirmó asistencia, pasó por la pregunta del bus: su goingByBus es una respuesta real
  const goingByBus = attending ? (guest.goingByBus ?? Boolean(bus)) : null;
  const diet = parseDiet(guest.dietaryRestrictions);

  return {
    id: guest.id,
    name: guest.name,
    surname: guest.surname,
    kid: guest.kid,
    confirmedAttendance: attending,
    goingByBus,
    bus: goingByBus ? bus : '',
    savedBus: bus,
    dietSelected: diet.selected,
    dietOther: diet.other,
    suggests: guest.suggests || '',
  };
};

const toGuestPayload = (guest, groupId) => {
  const attending = guest.confirmedAttendance === true;
  const goingByBus = attending && guest.goingByBus === true;
  return {
    id: guest.id,
    name: guest.name,
    surname: guest.surname,
    confirmedAttendance: attending,
    kid: guest.kid,
    dietaryRestrictions: serializeDiet(guest.dietSelected, guest.dietOther),
    suggests: guest.suggests.trim() || null,
    goingByBus,
    bus: goingByBus ? guest.bus : null,
    groupGuestId: groupId,
  };
};

const validateGuest = (guest, isSolo) => {
  const errors = {};
  if (guest.confirmedAttendance === null) {
    errors.attendance = isSolo ? 'Indica si podrás venir' : 'Indica si podrá venir';
  } else if (guest.confirmedAttendance) {
    if (guest.goingByBus === null) errors.bus = 'Indica si irá en autobús';
    else if (guest.goingByBus && !guest.bus) errors.busTime = 'Elige la hora de vuelta';
  }
  return errors;
};

const GuestGroupForm = ({ onSuccess }) => {
  const {
    selectedGuest,
    groupGuests,
    isLoading,
    error,
    updateGroupGuests,
    resetFormState,
  } = useGuests();

  const [formData, setFormData] = useState([]);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState('edit');
  const [submitting, setSubmitting] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    setFormData(groupGuests.map(toFormGuest));
    setErrors({});
    setStep('edit');
  }, [groupGuests]);

  const isSolo = formData.length === 1;
  const groupId = selectedGuest?.group?.id;
  const groupName = selectedGuest?.group?.name?.trim()
    || (selectedGuest ? `${selectedGuest.name} ${selectedGuest.surname}` : '');

  const goToStep = (nextStep) => {
    setStep(nextStep);
    requestAnimationFrame(() => {
      rootRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const updateGuest = (id, changes, fieldsToClear = []) => {
    setFormData((prev) => prev.map((g) => (g.id === id ? { ...g, ...changes } : g)));
    if (fieldsToClear.length === 0) return;
    setErrors((prev) => {
      if (!prev[id]) return prev;
      const guestErrors = { ...prev[id] };
      fieldsToClear.forEach((field) => delete guestErrors[field]);
      const next = { ...prev };
      if (Object.keys(guestErrors).length > 0) next[id] = guestErrors;
      else delete next[id];
      return next;
    });
  };

  const setAttendance = (guest, value) => {
    updateGuest(guest.id, { confirmedAttendance: value }, FIELD_ORDER);
  };

  const setGoingByBus = (guest, value) => {
    updateGuest(
      guest.id,
      { goingByBus: value, bus: value ? guest.bus || guest.savedBus : '' },
      ['bus', 'busTime']
    );
  };

  const toggleDiet = (guest, option) => {
    const dietSelected = guest.dietSelected.includes(option)
      ? guest.dietSelected.filter((opt) => opt !== option)
      : [...guest.dietSelected, option];
    updateGuest(guest.id, { dietSelected });
  };

  const focusFirstError = (nextErrors) => {
    const guest = formData.find((g) => nextErrors[g.id]);
    const field = FIELD_ORDER.find((f) => nextErrors[guest.id][f]);
    const el = document.getElementById(fieldId(guest.id, field));
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.querySelector('input')?.focus({ preventScroll: true });
  };

  const handleReview = (e) => {
    e.preventDefault();
    const nextErrors = {};
    formData.forEach((guest) => {
      const guestErrors = validateGuest(guest, isSolo);
      if (Object.keys(guestErrors).length > 0) nextErrors[guest.id] = guestErrors;
    });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      focusFirstError(nextErrors);
      return;
    }
    resetFormState();
    goToStep('review');
  };

  const handleEdit = () => {
    resetFormState();
    goToStep('edit');
  };

  const handleConfirm = async () => {
    setSubmitting(true);
    try {
      await updateGroupGuests(groupId, formData.map((g) => toGuestPayload(g, groupId)));
      onSuccess?.({
        attendingCount: formData.filter((g) => g.confirmedAttendance).length,
        totalCount: formData.length,
      });
    } catch (err) {
      // El contexto ya expone el mensaje de error, que se muestra junto a los botones
      console.error('Error updating guests:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-10 animate-pulse">
        <div className="inline-block h-16 w-16 rounded-full bg-sage-200 opacity-75"></div>
        <p className="mt-4 text-sage-600 font-sans">Cargando tu invitación...</p>
      </div>
    );
  }

  if (!selectedGuest || groupGuests.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-sage-600 font-sans">{error || 'No se ha seleccionado ningún invitado'}</p>
      </div>
    );
  }

  const pendingNames = formData.filter((g) => errors[g.id]).map((g) => g.name);

  return (
    <div ref={rootRef} className="w-full max-w-2xl mx-auto animate-fade-in scroll-mt-6">
      <h2 className="section-title">Confirmación de asistencia</h2>

      <div className="text-center mb-8">
        <p className="text-[11px] uppercase tracking-[0.3em] text-sage-500 font-sans">Invitación para</p>
        <p className="font-serif text-2xl md:text-3xl text-sage-800 mt-1 tracking-wide">{groupName}</p>
        {step === 'edit' && (
          <p className="text-sm text-sage-600 font-sans mt-3 max-w-md mx-auto leading-relaxed">
            {isSolo
              ? 'Cuéntanos si podrás acompañarnos. Antes de enviarlo verás un resumen.'
              : 'Indica quién podrá acompañarnos. Antes de enviarlo verás un resumen.'}
          </p>
        )}
      </div>

      {step === 'review' ? (
        <ConfirmationSummary
          guests={formData.map((g) => ({ ...g, ...toGuestPayload(g, groupId) }))}
          busReturnLabel={busReturnLabel}
          isSolo={isSolo}
          submitting={submitting}
          error={error}
          onConfirm={handleConfirm}
          onEdit={handleEdit}
        />
      ) : (
        <form onSubmit={handleReview} noValidate>
          <div className="space-y-6">
            {formData.map((guest) => {
              const guestErrors = errors[guest.id] || {};
              return (
                <section key={guest.id} className="guest-card" aria-labelledby={`guest-${guest.id}-name`}>
                  <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
                    <h3 id={`guest-${guest.id}-name`} className="font-serif text-xl text-sage-800 tracking-wide">
                      {guest.name} {guest.surname}
                    </h3>
                    {guest.kid && (
                      <span className="kid-badge">
                        <Icon name="child" className="w-3.5 h-3.5" />
                        Adolescente/Niño
                      </span>
                    )}
                  </div>

                  <ChoiceGroup
                    id={fieldId(guest.id, 'attendance')}
                    name={`attendance-${guest.id}`}
                    legend={isSolo ? '¿Asistirás a la boda?' : '¿Asistirá a la boda?'}
                    options={[
                      { value: true, label: isSolo ? 'Sí, allí estaré' : 'Sí, asistirá', icon: 'check', tone: 'positive' },
                      { value: false, label: isSolo ? 'No podré ir' : 'No podrá ir', icon: 'x' },
                    ]}
                    value={guest.confirmedAttendance}
                    onChange={(value) => setAttendance(guest, value)}
                    error={guestErrors.attendance}
                  />

                  {guest.confirmedAttendance && (
                    <div className="mt-6 space-y-6 animate-fade-in">
                      <div className="bus-box">
                        <ChoiceGroup
                          id={fieldId(guest.id, 'bus')}
                          name={`bus-${guest.id}`}
                          legend={isSolo ? '¿Irás en autobús?' : '¿Irá en autobús?'}
                          hint="Sale a las 11:30 desde la Avd. Montendre y vuelve después de la celebración."
                          options={[
                            { value: true, label: 'Sí, en autobús', icon: 'bus' },
                            { value: false, label: isSolo ? 'No, iré por mi cuenta' : 'No, por su cuenta', icon: 'car' },
                          ]}
                          value={guest.goingByBus}
                          onChange={(value) => setGoingByBus(guest, value)}
                          error={guestErrors.bus}
                        />

                        {guest.goingByBus && (
                          <div className="mt-5 animate-fade-in">
                            <ChoiceGroup
                              id={fieldId(guest.id, 'busTime')}
                              name={`bus-time-${guest.id}`}
                              legend="¿A qué hora será la vuelta?"
                              options={RETURN_OPTIONS}
                              value={guest.bus || null}
                              onChange={(value) => updateGuest(guest.id, { bus: value }, ['busTime'])}
                              error={guestErrors.busTime}
                            />
                          </div>
                        )}
                      </div>

                      <DietaryField
                        id={`guest-${guest.id}-diet`}
                        selected={guest.dietSelected}
                        other={guest.dietOther}
                        onToggle={(option) => toggleDiet(guest, option)}
                        onOtherChange={(value) => updateGuest(guest.id, { dietOther: value })}
                      />

                      <div>
                        <label htmlFor={`guest-${guest.id}-song`} className="field-label">
                          <Icon name="music" className="w-4 h-4 text-wine-600" />
                          Una canción que no puede faltar
                        </label>
                        <input
                          id={`guest-${guest.id}-song`}
                          type="text"
                          value={guest.suggests}
                          onChange={(e) => updateGuest(guest.id, { suggests: e.target.value })}
                          placeholder="Artista y canción (opcional)"
                          className="text-field"
                        />
                      </div>
                    </div>
                  )}
                </section>
              );
            })}
          </div>

          {/* Los avisos van junto al botón, que es donde está mirando quien acaba de pulsarlo */}
          <div className="mt-8 space-y-3" aria-live="polite">
            {pendingNames.length > 0 && (
              <div className="form-alert" role="alert">
                <Icon name="alert" className="w-5 h-5 flex-shrink-0" />
                <p>
                  {isSolo
                    ? 'Te falta responder alguna pregunta (marcada en rojo).'
                    : `Falta responder alguna pregunta de: ${pendingNames.join(', ')}.`}
                </p>
              </div>
            )}
            {error && (
              <div className="form-alert" role="alert">
                <Icon name="alert" className="w-5 h-5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-center">
            <button type="submit" className="btn-primary">
              Revisar y confirmar
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default GuestGroupForm;
