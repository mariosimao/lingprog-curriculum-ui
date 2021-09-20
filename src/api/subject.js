import client from './client';

const getSubjects = () => {
  const path = '/subjects';

  return client.get(path).then((response) => (response.data.subjects));
};

const createSubject = (code, name, credits) => {
  const path = '/subjects';

  return client.post(path, { code, name, credits }).then((response) => (response.data.subject.id));
};

export default {
  getSubjects,
  createSubject,
};
