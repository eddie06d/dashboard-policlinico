export const getCitasByState= (citas: any) => {
  const citasByState = citas.reduce((acc: any[], cita: any) => {
    if(!acc.find((u: any) => (u.name === 'Pacientes Atendidos' && cita.atendido) || (u.name === 'Pacientes No Atendidos' && !cita.atendido))) {
      acc.push({
        name: cita.atendido ? 'Pacientes Atendidos':'Pacientes No Atendidos',
        value: 1
      });
    }else {
      let index = 0;
      if(cita.atendido) index = acc.findIndex((u: any) => u.name === 'Pacientes Atendidos');
      else index = acc.findIndex((u: any) => u.name === 'Pacientes No Atendidos');
      acc[index].value++;
    }
    return acc;
  }, []);
  return citasByState;
};
