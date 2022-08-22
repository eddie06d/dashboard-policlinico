export const getCitasBySpecialty = (citas: any) => {
  const citasBySpecialty = citas.reduce((acc: any[], cita: any) => {
    if(!acc.find((u: any) => u.name === cita.especialidad)) {
      acc.push({
        name: cita.especialidad,
        value: 1
      });
    } else {
      const index = acc.findIndex((u: any) => u.name === cita.especialidad);
      acc[index].value++;
    }
    return acc;
  }, []);
  return citasBySpecialty;
};
