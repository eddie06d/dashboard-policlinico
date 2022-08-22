export const getUsersByDistrict = (users: any) => {
  const usersByDistrict = users.reduce((acc: any[], user: any) => {
    if(!acc.find((u: any) => u.name === user.distrito)) {
      acc.push({
        name: user.distrito,
        value: 1
      });
    } else {
      const index = acc.findIndex((u: any) => u.name === user.distrito);
      acc[index].value++;
    }
    return acc;
  }, []);
  return usersByDistrict;
};
