import Icon from './Icon';

const SummaryRow = ({ icon, children }) => (
  <li className="flex items-start gap-2.5">
    <Icon name={icon} className="w-4 h-4 mt-0.5 flex-shrink-0 text-wine-600" />
    <span>{children}</span>
  </li>
);

/**
 * Resumen previo al envío: muestra lo elegido para cada invitado y
 * permite confirmar o volver al formulario a modificarlo.
 */
const ConfirmationSummary = ({ guests, busReturnLabel, isSolo, submitting, error, onConfirm, onEdit }) => (
  <div className="animate-fade-in">
    <div className="text-center mb-6">
      <h3 className="font-handwriting text-3xl text-sage-700">Revisa tu respuesta</h3>
      <p className="text-sm text-sage-600 font-sans mt-2">
        Comprueba que todo está bien antes de confirmar.
      </p>
    </div>

    <div className="summary-card">
      {guests.map((guest) => (
        <div key={guest.id} className="summary-guest">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <h4 className="font-serif text-lg text-sage-800">
              {guest.name} {guest.surname}
            </h4>
            <span className={`status-pill ${guest.confirmedAttendance ? 'status-pill--yes' : 'status-pill--no'}`}>
              <Icon name={guest.confirmedAttendance ? 'check' : 'x'} className="w-3.5 h-3.5" strokeWidth={2.2} />
              {guest.confirmedAttendance ? 'Asistirá' : 'No asistirá'}
            </span>
          </div>

          {guest.confirmedAttendance && (
            <ul className="mt-3 space-y-2 text-sm text-sage-700 font-sans">
              <SummaryRow icon={guest.goingByBus ? 'bus' : 'car'}>
                {guest.goingByBus
                  ? `En autobús: ida a las 11:30 y vuelta a las ${busReturnLabel(guest.bus)}`
                  : 'Por su cuenta, sin autobús'}
              </SummaryRow>
              <SummaryRow icon="utensils">
                {guest.dietaryRestrictions || 'Sin restricciones alimentarias'}
              </SummaryRow>
              {guest.suggests && (
                <SummaryRow icon="music">{guest.suggests}</SummaryRow>
              )}
            </ul>
          )}
        </div>
      ))}
    </div>

    {error && (
      <div className="form-alert mt-6" role="alert">
        <Icon name="alert" className="w-5 h-5 flex-shrink-0" />
        <p>{error}</p>
      </div>
    )}

    <div className="mt-8 flex flex-col-reverse sm:flex-row gap-3 justify-center">
      <button type="button" onClick={onEdit} disabled={submitting} className="btn-secondary">
        <Icon name="pencil" className="w-4 h-4" />
        Modificar respuesta
      </button>
      <button type="button" onClick={onConfirm} disabled={submitting} className="btn-primary">
        {submitting ? (
          <>
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Enviando...
          </>
        ) : (
          <>
            <Icon name="check" className="w-4 h-4" strokeWidth={2.2} />
            {isSolo ? 'Confirmar mi respuesta' : 'Confirmar respuesta'}
          </>
        )}
      </button>
    </div>
  </div>
);

export default ConfirmationSummary;
