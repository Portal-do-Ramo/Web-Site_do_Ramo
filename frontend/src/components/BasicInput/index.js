import { IMaskInput } from 'react-imask';

//Compontente de entrada de texto, recebe props como mask, label, id etc, renderiza um campos de entrada com ou sem máscara dependendo da prop mask
export default function BasicInput({
  mask,
  label,
  id,
  placeholder,
  required,
  value,
  set,
  type
}) {
  if (mask) {
    return (
      <>
        {label && (
          <span>
            {label} {required && <strong>*</strong>}
          </span>
        )}
        <IMaskInput
          mask={mask}
          name={id}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={(event) => set(event.target.value)}
        />
      </>
    );
  }

  return (
    <>
      {label && (
        <span>
          {label} {required && <strong>*</strong>}
        </span>
      )}
      <input
        type={type}
        name={id}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(event) => set(event.target.value)}
      />
    </>
  );
}
