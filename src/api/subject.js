import client from './client';

const getSubjects = () => {
  const path = '/subjects';

  return client.get(path).then((response) => (response.data.subjects));
};

const createSubject = (code, name, credits) => {
  const path = '/subjects';

  return client.post(
    path, {
      code,
      name,
      credits,
      prerequisites: [],
      corequisites: [],
    },
  ).then((response) => (response.data.id));
};

const deleteSubject = (subjectId) => {
  const path = `/subjects/${subjectId}`;

  return client.delete(path);
};

export {
  getSubjects,
  createSubject,
  deleteSubject,
};
