export const getDoctorsBySpecialty = (doctors: any) => {
  const doctorsBySpecialty = doctors.reduce((acc: any[], doctor: any) => {
    if(!acc.find((u: any) => u.name === doctor.especialidad)) {
      acc.push({
        name: doctor.especialidad,
        value: 1
      });
    } else {
      const index = acc.findIndex((u: any) => u.name === doctor.especialidad);
      acc[index].value++;
    }
    return acc;
  }, []);
  return doctorsBySpecialty;
};
