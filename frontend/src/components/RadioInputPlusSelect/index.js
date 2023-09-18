import { useState } from "react";

export default function RadioInputPlusSelect(
  { label,
    value,
    set,
    defaultValue,
    list,
    required
  })
{
  const [optionYes, setoptionYes] = useState(false);
  const [optionNo, setoptionNo] = useState(false);
  const [enabledSelect, setEnabledSelect] = useState(false);


  const handleOptionYes = () => {
    setoptionYes(true);
    setoptionNo(false);
    setEnabledSelect(true);
  };

  const handleOptionNo = () => {
    set('')
    setoptionYes(false);
    setoptionNo(true);
    setEnabledSelect(false);
  };

  return (
    <div>
      {label && <span>{label} {required && <strong>*</strong>}</span>}

      <span>
        <input
          type="radio"
          name="opcao"
          checked={optionYes}
          onChange={handleOptionYes}
        />
        Sim
      </span>
      <span>
        <input
          type="radio"
          name="opcao"
          checked={optionNo}
          onChange={handleOptionNo}
        />
        Não
      </span>
      
      <select 
				required={required}
				value={value} 
        onChange={(event) => set(event.target.value)}
			>
        
        {
          enabledSelect ? (
            <>
              <option value="" disabled defaultValue hidden>{defaultValue}</option>
              {
                list.map((item, idx) => {
					        return (
					  	      <option key={idx} value={item}>
					  	    	  {item}
					  	      </option>
                  )
                })
              }
            </>
          
          ) : <option value="" disabled defaultValue hidden>{defaultValue}</option>
        }

			</select>
    </div>
  );
}
