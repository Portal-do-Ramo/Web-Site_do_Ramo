import { useState } from "react";
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
    <div className={styles.container}>
      {label && <span>{label} {required && <strong>*</strong>}</span>}
      <div className={styles.inputsRadio}>
        <div>
          <input
            id="yes"
            type="radio"
            name="opcao"
            checked={optionYes}
            onChange={handleOptionYes}
          />
          <label htmlFor="yes" >
            Sim
          </label>
        </div>
        <div>
          <input
            id="no"
            type="radio"
            name="opcao"
            checked={optionNo}
            onChange={handleOptionNo}
          />
          <label htmlFor="no">
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