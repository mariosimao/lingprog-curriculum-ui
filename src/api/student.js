import client from './client';

const createStudent = (firebaseUid) => {
  const path = '/students';

  return client.post(path, { id: firebaseUid });
};

export default {
  createStudent,
};
