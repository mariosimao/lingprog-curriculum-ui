import client from './client';

const createStudent = (firebaseUid) => {
  const path = '/students';

  return client.post(path, { id: firebaseUid });
};

export {
  // eslint-disable-next-line import/prefer-default-export
  createStudent,
};
