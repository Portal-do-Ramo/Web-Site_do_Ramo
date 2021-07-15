export function convertDurationToTimeString(duration){
  const hours = Math.floor(duration/3600);
  const minutes = Math.floor((duration%3600)/60);
  

  if ( hours > 1 ) {
    const horas = hours + " " + "horas";
    return horas;
  } else {
    const minutos = minutes + " " + "minutos"
    return minutos;
  }
}