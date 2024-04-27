import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { AiFillEye, AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";

/* async function handleDownloadPSEFile() {
  const { data } = await api.get('/download/pse.csv', { responseType: 'blob' });
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'pse.csv');
  link.click();
} */

import styles from '../../pages/marketing/PSE/styles.module.scss';
import api from '../../services/api';

function PSEEmAndamento({ start, end, isDownloadActive }) {
  const [beginDate, setBeginDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [firstDay, setFirstDay] = useState('');
  const [secondDay, setSecondDay] = useState('');
  const [thirdDay, setThirdDay] = useState('');
  const [fourthDay, setFourthDay] = useState('');
  const [fifthDay, setFifthDay] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [showFifthDay, setShowFifthDay] = useState(false);
  const [editPSEModalIsOpen, setEditPSEModalIsOpen] = useState(false);
  const router = useRouter();

  const adjustTime = (date) =>
    new Date(new Date(date).getTime() - 3 * 60 * 60 * 1000);

	useEffect(() => {
		const dateFormatterOptions = {
			timeZone: 'America/Sao_Paulo',
			hour: 'numeric',
			minute: 'numeric',
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		};
		
		const dateTimeFormatter = new Intl.DateTimeFormat('pt-BR', dateFormatterOptions);
		
		const formattedStartDate = dateTimeFormatter.format(new Date(start));
		const formattedEndDate = dateTimeFormatter.format(new Date(end));
		
		setBeginDate(`${formattedStartDate.split(',')[0]} - ${formattedStartDate.split(' ')[1]}`);
		setEndDate(`${formattedEndDate.split(',')[0]} - ${formattedEndDate.split(' ')[1]}`);
		
		let beginDateFormatted = new Date(start);
		// beginDateFormatted.setMinutes(beginDateFormatted.getMinutes() - beginDateFormatted.getTimezoneOffset());
		beginDateFormatted.setUTCHours(beginDateFormatted.getUTCHours() - 3); // Ajuste de 3 horas para o fuso horário do Brasil

    let endDateFormatted = new Date(end);
    // endDateFormatted.setMinutes(endDateFormatted.getMinutes() - endDateFormatted.getTimezoneOffset());
    endDateFormatted.setUTCHours(endDateFormatted.getUTCHours() - 3); // Ajuste de 3 horas para o fuso horário do Brasil

    document.getElementById('beginDateInput').value = beginDateFormatted
      .toISOString()
      .slice(0, 16);
    document.getElementById('endDateInput').value = endDateFormatted
      .toISOString()
      .slice(0, 16);
    getDinamycDatesPSE();
  }, []);

  function openModal() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  /* function converterData(dateString) {
    const match = dateString.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);

    if (!match) {
      throw new Error('Formato de entrada inválido. Use yyyy-MM-ddThh:mm.');
    }

    const [, ano, mes, dia, hora, minuto] = match;

    if (
      parseInt(mes) < 1 ||
      parseInt(mes) > 12 ||
      parseInt(dia) < 1 ||
      parseInt(dia) > 31 ||
      parseInt(hora) < 0 ||
      parseInt(hora) > 23 ||
      parseInt(minuto) < 0 ||
      parseInt(minuto) > 59
    ) {
      throw new Error('Valores de data ou hora fora do intervalo válido.');
    }

    const isoDate = `${ano}-${mes}-${dia}T${hora}:${minuto}`;
    return isoDate;
  } */

  //Abre a planilha de inscritos do PSE em uma nova aba
  function handleAccessPSEFile() {
    const link = process.env.NEXT_PUBLIC_PSE_SPREADSHEET_LINK;

    if (link) {
      window.open(link, '_blank');
    } else {
      console.error('PSE_SPREADSHEET_LINK is not defined.');
    }
  }

  //Requisita as datas das dinâmicas do PSE
  async function getDinamycDatesPSE() {
    try {
      // const response = await api.get("/dinamycDates");
      const response = await api.get('/pse');

      const {
        dinamycDate_1,
        dinamycDate_2,
        dinamycDate_3,
        dinamycDate_4,
        dinamycDate_5
      } = response.data;

			dinamycDate_1 ? setFirstDay(adjustTime(dinamycDate_1).toISOString().slice(0, 16)) : null
			dinamycDate_2 ? setSecondDay(adjustTime(dinamycDate_2).toISOString().slice(0, 16)) : null
			dinamycDate_3 ? setThirdDay(adjustTime(dinamycDate_3).toISOString().slice(0, 16)) : null
			dinamycDate_4 ? setFourthDay(adjustTime(dinamycDate_4).toISOString().slice(0, 16)) : null
			dinamycDate_5 ? setFifthDay(adjustTime(dinamycDate_5).toISOString().slice(0, 16)) : null
						
		} catch (error) {

			console.error(error);
			return null;
		}
	}

  function openEditPSEModal() {
    console.log(fifthDay);
    setEditPSEModalIsOpen(true);
  }
  function closeEditPSEModal() {
    setEditPSEModalIsOpen(false);
  }

  async function handleUpdatePSE() {
    // const date = new Date();

    // let offset = date.getTimezoneOffset();

    // offset = offset / 60;

    // offset = "00" + offset;

		let beginDateFormatted = `${document.getElementById("beginDateInput").value}:00.000-03:00`;
    let endDateFormatted = `${document.getElementById("endDateInput").value}:00.000-03:00`; 
		let schedulePSEObject = {
			startDate: beginDateFormatted,
			endDate: endDateFormatted,
			dinamycDate_1: firstDay ? `${firstDay}:00.000-03:00` : null ,
			dinamycDate_2: secondDay ? `${secondDay}:00.000-03:00` : null ,
			dinamycDate_3: thirdDay ? `${thirdDay}:00.000-03:00` : null ,
			dinamycDate_4: fourthDay ? `${fourthDay}:00.000-03:00` : null ,
			dinamycDate_5: fifthDay ? `${fifthDay}:00.000-03:00` : null 
		}

    try {
      await Promise.all([
        toast.promise(api.patch('/pse/schedule', schedulePSEObject), {
          pending: 'Carregando',
          success: 'PSE atualizado!',
          error: 'Não foi possível atualizar o PSE'
        }),
        !fifthDay ? api.patch(`/pse/dinamycDate/dinamycDate_5`) : null
      ]);

			setTimeout(() => {
				router.reload();
			}, 2000);
		} catch (error) {
			return null;
		}
	}

	async function handleCancelPSE() {
		await api.delete("/pse/schedule");
		router.reload();
	}

	async function handleRemoveDate(name) {
		await api.patch(`/pse/dinamycDate/${name}`);
		router.reload();
	}

	function removeDay(day) {
		switch (day) {
			case 1:
				handleRemoveDate('dinamycDate_1');
				setFirstDay('');
				break;
			case 2:
				handleRemoveDate('dinamycDate_2');
				setSecondDay('');
				break;
			case 3:
				handleRemoveDate('dinamycDate_3');
				setThirdDay('');
				break;
			case 4:
				handleRemoveDate('dinamycDate_4');
				setFourthDay('');
				break;
			case 5:
				handleRemoveDate('dinamycDate_5');
				setFifthDay('');
				break;
			default:
				break;
		}
	}

  return (
    <>
      <section className={styles.showInformation}>
        <img src='/pseilustration.svg'></img>
        <div className={styles.container}>
          <span>Processo seletivo em andamento!</span>
          <div className={styles.dates}>
            <div className={styles.begin}>{beginDate}</div>

            <div className={styles.divider}></div>

            <div className={styles.end}>{endDate}</div>
          </div>
        </div>
      </section>

      <section className={styles.schedulePSESection}>
        <span>Editar PSE!</span>
        <div className={styles.rowDates}>
          <section className={styles.datesContainer}>
            <div className={styles.beginFixed}>
              <input
                type='datetime-local'
                max='9999-12-31T23:59'
                name='beginDate'
                id='beginDateInput'
                className={styles.beginDateInputOff}
                disabled={true}
              />
            </div>

            <p> até </p>

            <div className={styles.end}>
              <input
                type='datetime-local'
                max='9999-12-31T23:59'
                name='endDate'
                id='endDateInput'
                className={styles.dateInput}
              />
            </div>
          </section>

          <button type='button' onClick={openEditPSEModal}>
            Editar
          </button>
        </div>
      </section>
      <Modal
        isOpen={editPSEModalIsOpen}
        onRequestClose={closeEditPSEModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
        contentLabel='Example Modal'
      >
        <div className={styles.modalAgendamento}>
          <h2>Editar datas das dinâmicas</h2>
          <div className={styles.InputsBlock}>
            <div className={styles.days}>
              <label for='firstDay'>1° Dia:</label>
              {/* <input id="firstDay" placeholder="dd/mm/yy" type="date"/>
									<div className={styles.Line}></div>
									<input placeholder="00:00" type="time"/> */}
									<input 
											type="datetime-local"
											max="9999-12-31T23:59"
											name="firstDay"
											id="firstDay"
											onChange={(e) => setFirstDay(e.target.value)}
											value={firstDay}
										/>
										<button type="button" className={styles.Trash} onClick={()=>removeDay(1)}>
											<FaTrash size={24} />    
										</button>
								</div>
								<div className={styles.days}>
									<label for="secondDay">2° Dia:</label>
									{/* <input type="date" id="secondDay" placeholder="dd/mm/yy"/>
									<div className={styles.Line}></div>
									<input type="time" placeholder="00:00"/> */}
									<input 
										type="datetime-local"
										max="9999-12-31T23:59"
										name="secondDay"
										id="secondDay"
										onChange={(e) => setSecondDay(e.target.value)}
										value={secondDay}
									/>
									<button type="button" className={styles.Trash} onClick={()=>removeDay(2)}>
											<FaTrash size={24} />    
										</button>
								</div>
								<div className={styles.days}>
									<label for="thirdDay">3° Dia:</label>
									{/* <input type="date" id="thirdDay" placeholder="dd/mm/yy"/>
									<div className={styles.Line}></div>
									<input type="time" placeholder="00:00"/> */}
										<input 
											type="datetime-local"
											max="9999-12-31T23:59"
											name="thirdDay"
											id="thirdDay"
											onChange={(e) => setThirdDay(e.target.value)}
											value={thirdDay}
										/>
										<button type="button" className={styles.Trash} onClick={()=>removeDay(3)}>
											<FaTrash size={24} />    
										</button>
								</div>
								<div className={styles.days}>
									<label for="fourthDay">4° Dia:</label>
									{/* <input type="date" id="fourthDay" placeholder="dd/mm/yy"/>
									<div className={styles.Line}></div>
									<input type="time" placeholder="00:00"/> */}

										<input 
											type="datetime-local"
											max="9999-12-31T23:59"
											name="fourthDay"
											id="fourthDay"
											onChange={(e) => setFourthDay(e.target.value)}
											value={fourthDay}
										/>            
										<button type="button" className={styles.Trash} onClick={()=>removeDay(4)}>
											<FaTrash size={24} />    
										</button>
								</div>
								{fifthDay || showFifthDay ? (
									<>
										<div className={styles.days}>
											<label for="fifthDay">5° Dia:</label>
											{/* <input type="date" id="fifthDay" placeholder="dd/mm/yy"/>
											<div className={styles.Line}></div>
											<input type="time" placeholder="00:00"/> */} 
		
												<input 
													type="datetime-local"
													max="9999-12-31T23:59"
													name="fifthDay"
													id="fifthDay"
													onChange={(e) => setFifthDay(e.target.value)}
													value={fifthDay}
												/>            
											<button type="button" className={styles.Trash} onClick={()=>removeDay(5)}>
												<FaTrash size={24} />    
											</button>
										</div>
										<button type="button" className={styles.addDay} onClick={()=>{
											setShowFifthDay(false)
											setFifthDay('')
										}}>
											<AiOutlineMinusCircle />
										</button>
											
									</>
									):(
										<button type="button" className={styles.addDay} onClick={()=>setShowFifthDay(true)}>
											<AiOutlinePlusCircle />
										</button>
									)
								}

								{/* <CiCirclePlus size={20} weight="fill" /> */}
								
							</div>
							<div className={styles.buttonsBox}>
								<button className={styles.Cancel} onClick={closeEditPSEModal}>Cancelar</button>
								<button className={styles.Create} type="submit" onClick={handleUpdatePSE}>Atualizar PSE</button>
							</div>
						</div>
						{/* <Agendamento beginDate={beginDate} endDate={endDate}/> */}
					</Modal>

				<section className={styles.closePSE}>
					<span>Encerrar o PSE!</span>
					<p>
						Ao cancelar o processo seletivo externo as informações
						de início e término do processo serão removidas.
					</p>	


        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          className={styles.modal}
          overlayClassName={styles.overlay}
          contentLabel='Example Modal'
          shouldCloseOnEsc={true}
        >
          <img src='/finish.svg'></img>
          <h1>Encerrar PSE</h1>
          <p>Tem certeza que você deseja cancelar o PSE?</p>
          <div className={styles.rowButton}>
            <button
              type='button'
              className={styles.cancel}
              onClick={handleCloseModal}
            >
              Cancelar
            </button>
            <button
              type='button'
              className={styles.finishButton}
              onClick={handleCancelPSE}
            >
              Sim, encerrar
            </button>
          </div>
        </Modal>
        <div className={styles.buttonContainerPSEEmAndamento}>
          <button
            type='button'
            onClick={openModal}
            className={styles.closePSEButton}
          >
            Encerrar PSE
          </button>

          <button
            type='button'
            onClick={handleAccessPSEFile}
            className={styles.spreadsheetButton}
          >
            <span>Acessar planilha de inscritos</span> <AiFillEye />
          </button>
        </div>
      </section>
    </>
  );
}

export { PSEEmAndamento };
