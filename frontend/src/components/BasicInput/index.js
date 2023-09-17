import { IMaskInput } from 'react-imask'

export default function BasicInput ({item}) {
  
  if (item.mask) {
    return <>
      {item.label && <span>{item.label}<strong>*</strong></span>}
        <IMaskInput 
					mask={item.mask}
					name={item.id}
					placeholder='(21) 9xxxx-xxxx'
					required={item.required}
          value={item.value}
          onChange={(event) => item.set(event.target.value)}
				/>
    </>
  }

  return <>
    {item.label && <span>{item.label}<strong>*</strong></span>} 
      <input 
        type={item.type}
        name={item.id} 
        placeholder={item.placeholder}
        required={item.required}
        value={item.value}
        onChange={(event) => item.set(event.target.value)}
        />        
  </>  

}