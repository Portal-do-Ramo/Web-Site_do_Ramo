import { useEffect, useState } from "react";
import styles from './styles.module.scss'

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

  useEffect(() => {
    if (value !== "") {
      setoptionYes(true);
      setEnabledSelect(true);
    }
  }, [])

  const handleOptionYes = () => {
    setoptionYes(true);
    setoptionNo(false);
    setEnabledSelect(true);
  };

  const handleOptionNo = () => {
    set("");
    setoptionYes(false);
    setoptionNo(true);
    setEnabledSelect(false);
  };

  return (
    <div className={styles.container}>
      {label && <span>{label} {required && <strong>*</strong>}</span>}
      <div className={styles.inputsRadio}>
        <div>
          <input
            id={`yes#${label}`}
            type="radio"
            checked={optionYes}
            onChange={handleOptionYes}
          />
          <label htmlFor={`yes#${label}`} >
            Sim
          </label>
        </div>
        <div>
          <input
            id={`no#${label}`}
            type="radio"
            checked={optionNo}
            onChange={handleOptionNo}
          />
          <label htmlFor={`no#${label}`}>
            Não
          </label>
        </div>
      </div>
      
      
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
          
          ) : <></>
        }

			</select>
    </div>
  );
}

/* 




*/