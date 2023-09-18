import { IMaskInput } from 'react-imask'

export default function BasicInput(
  { mask,
    label,
    id,
    placeholder,
    required,
    value,
    set,
    type
  })
{
  
  if (mask) {
    return <>
      {label && <span>{label}<strong>*</strong></span>}
        <IMaskInput 
					mask={mask}
					name={id}
					placeholder={placeholder}
					required={required}
          value={value}
          onChange={(event) => set(event.target.value)}
				/>
    </>
  }

  return <>
    {label && <span>{label}<strong>*</strong></span>} 
      <input 
        type={type}
        name={id} 
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(event) => set(event.target.value)}
        />        
  </>  

}