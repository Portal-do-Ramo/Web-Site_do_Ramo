import Link from 'next/link'

export default function BasicSelect(
  { label,
    value,
    set,
    defaultValue,
    list,
    required
  })
{

  return (
    <>
      
      {
        label && 
        <span>
          {label} {required && <strong>*</strong>}
        </span>

      }
       {label == 'Equipe' && 
            <a href="/equipes" target="_blank">
                Confira as equipes do ramo clicando aqui!
            </a>
        }




      <select 
				required={required}
				value={value} 
        onChange={(event) => set(event.target.value)}
			>
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

			</select>
    </>
  );
}