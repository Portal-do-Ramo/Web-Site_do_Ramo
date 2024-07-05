import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { toast } from 'react-toastify';
import { AiFillEye, AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { DeleteAlertModal } from '../DeleteAlertModal';
import styles from '../../pages/marketing/PSE/styles.module.scss';

import api from '../../services/api';

import Modal from 'react-modal';

function PSENaoAgendado() {
  const router = useRouter();
  const [beginDate, setBeginDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [editPSEModalIsOpen, setEditPSEModalIsOpen] = useState(false);

  const [firstDay, setFirstDay] = useState('');
  const [secondDay, setSecondDay] = useState('');
  const [thirdDay, setThirdDay] = useState('');
  const [fourthDay, setFourthDay] = useState('');
  const [fifthDay, setFifthDay] = useState('');
  const [showFifthDay, setShowFifthDay] = useState(false);
	const [deleteDayModalIsOpen, setDeleteDayModalIsOpen] = useState(false);
  const [dayToRemove, setDayToRemove] = useState('');
  useEffect(() => {
    let date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    setBeginDate(date.toISOString().slice(0, 16));
    setEndDate(date.toISOString().slice(0, 16));
  }, []);

	function openDeleteDayModal(day) {
    setDayToRemove(day);
    setDeleteDayModalIsOpen(true);
  }

  function closeDeleteDayModal() {
    setDayToRemove('');
    setDeleteDayModalIsOpen(false);
  }
	
	function removeDay(day) {
		switch (day) {
			case 1:
				setFirstDay('');
				closeDeleteDayModal();
				break;
			case 2:
				setSecondDay('');
				closeDeleteDayModal();
				break;
			case 3:
				setThirdDay('');
				closeDeleteDayModal();
				break;
			case 4:
				setFourthDay('');
				closeDeleteDayModal();
				break;
			case 5:
				setFifthDay('');
				closeDeleteDayModal();
				break;
			default:
				break;
		}
	}


	function handleAccessPSEFile() {
    const link = process.env.NEXT_PUBLIC_PSE_SPREADSHEET_LINK;

    if (link) {
      window.open(link, '_blank');
    } else {
      console.error('PSE_SPREADSHEET_LINK is not defined.');
    }
  }

  //Agenda um novo PSE
  async function handleSchedulePSE() {
    /* 
      2023-11-04T12:19:00.000-03:00
    */
    let schedulePSEObject = {
      startDate: `${beginDate}:00.000-03:00`,
      endDate: `${endDate}:00.000-03:00`,
      dinamycDate_1: `${firstDay}:00.000-03:00`,
      dinamycDate_2: `${secondDay}:00.000-03:00`,
      dinamycDate_3: `${thirdDay}:00.000-03:00`,
      dinamycDate_4: `${fourthDay}:00.000-03:00`
    };
    if (showFifthDay) {
      schedulePSEObject.dinamycDate_5 = `${fifthDay}:00.000-03:00`;
    }
    // console.log('schedulePSEObject ', schedulePSEObject )

    try {
      await toast.promise(api.post('/pse/schedule', schedulePSEObject), {
        pending: 'Carregando',
        success: 'Novo PSE agendado',
        error: 'Não foi possível agendar um novo PSE'
      });

      setTimeout(() => {
        router.reload();
      }, 2000);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  function openEditPSEModal() {
    setEditPSEModalIsOpen(true);
  }

	function closeEditPSEModal() {
		setEditPSEModalIsOpen(false);
	}

  return (
    <>
      <section className={styles.showInformation}>
        <img src='/pseilustration.svg'></img>
        <div className={styles.container}>
          <span>Não há registro de processo seletivo ativo</span>
          <p>Registre um novo PSE para habilitar outras funções</p>
        </div>
      </section>

      <section className={styles.schedulePSESection}>
        <span>Cadastre um novo PSE!</span>
        <div className={styles.rowDates}>
          <section className={styles.datesContainer}>
            <div className={styles.begin}>
              <input
                className={styles.dateInput}
                type='datetime-local'
                max='9999-12-31T23:59'
                name='beginDate'
                id='beginDate'
                onChange={(e) => setBeginDate(e.target.value)}
                value={beginDate}
              />
            </div>

            <p> até </p>

						<div className={styles.end}>
							<input
							className={styles.dateInput}
								type="datetime-local"
								max="9999-12-31T23:59"
								name="endDate"
								onChange={(e) => setEndDate(e.target.value)}
								value={endDate}
							/>
						</div>
					</section>
					
					<button type='button' onClick={openEditPSEModal}>Agendar</button>
					<Modal 
						isOpen={editPSEModalIsOpen}
						onRequestClose={closeEditPSEModal}
						className={styles.modal}
						overlayClassName={styles.overlay}
						contentLabel="Example Modal"
					>
						<div className={styles.modalAgendamento}>
							<h2>Agendamento das dinâmicas</h2>
							<div className={styles.InputsBlock}>
								<div className={styles.days}>
									<label htmlFor="firstDay">1° Dia:</label>
									<input 
											type="datetime-local"
											max="9999-12-31T23:59"
											name="firstDay"
											id="firstDay"
											onChange={(e) => setFirstDay(e.target.value)}
											value={firstDay}
										/>
										<button type="button" className={styles.Trash} onClick={()=>openDeleteDayModal(1)}>
											<FaTrash size={24} />    
										</button>  
								</div>
								<div className={styles.days}>
									<label htmlFor="secondDay">2° Dia:</label>
									<input 
										type="datetime-local"
										max="9999-12-31T23:59"
										name="secondDay"
										id="secondDay"
										onChange={(e) => setSecondDay(e.target.value)}
										value={secondDay}
									/>
										<button type="button" className={styles.Trash} onClick={()=>openDeleteDayModal(2)}>
											<FaTrash size={24} />    
										</button>  
								</div>
								<div className={styles.days}>
									<label htmlFor="thirdDay">3° Dia:</label>
										<input 
											type="datetime-local"
											max="9999-12-31T23:59"
											name="thirdDay"
											id="thirdDay"
											onChange={(e) => setThirdDay(e.target.value)}
											value={thirdDay}
										/>
										<button type="button" className={styles.Trash} onClick={()=>openDeleteDayModal(3)}>
											<FaTrash size={24} />    
										</button>    
								</div>
								<div className={styles.days}>
									<label htmlFor="fourthDay">4° Dia:</label>
										<input 
											type="datetime-local"
											max="9999-12-31T23:59"
											name="fourthDay"
											id="fourthDay"
											onChange={(e) => setFourthDay(e.target.value)}
											value={fourthDay}
										/>            
										<button type="button" className={styles.Trash} onClick={()=>openDeleteDayModal(4)}>
											<FaTrash size={24} />    
										</button>  
								</div>
								{showFifthDay ? (
									<>
										<div className={styles.days}>
											<label htmlFor="fifthDay">5° Dia:</label>
												<input 
													type="datetime-local"
													max="9999-12-31T23:59"
													name="fifthDay"
													id="fifthDay"
													onChange={(e) => setFifthDay(e.target.value)}
													value={fifthDay}
												/>       
											<button type="button" className={styles.Trash} onClick={()=>openDeleteDayModal(5)}>
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
                <button className={styles.Cancel} onClick={closeEditPSEModal}>
                  Cancelar
                </button>
                <button
                  className={styles.Create}
                  type='submit'
                  onClick={handleSchedulePSE}
                >
                  Criar PSE
                </button>
              </div>
            </div>
            {/* <Agendamento beginDate={beginDate} endDate={endDate}/> */}
          </Modal>
        </div>
      </section>

      <section className={styles.accessPSEFile}>
        <span>Visualizar inscritos:</span>
        <button
          type='button'
          onClick={handleAccessPSEFile}
        >
          <span>Acessar planilha de inscritos</span> <AiFillEye />
        </button>
      </section>
			<DeleteAlertModal
        modalIsOpen={deleteDayModalIsOpen}
        handleCloseModal={closeDeleteDayModal}
        title="Excluir Data"
        text={`Tem certeza que deseja excluir o ${dayToRemove}º dia?`}
        clickFunction={() => removeDay(dayToRemove)}
      />
    </>
  );
}

export { PSENaoAgendado };
