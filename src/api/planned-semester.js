import client from './client';

const getSemesters = (studentId) => {
  const path = `/students/${studentId}/semesters`;

  return client.get(path).then((response) => (response.data.semesters));
};

const createSemester = (studentId, startDate, endDate) => {
  const path = `/students/${studentId}/semesters`;

  return client.post(path, { startDate, endDate }).then((response) => (response.data));
};

const updateSemester = (studentId, semesterId, name, startDate, endDate) => {
  const path = `/students/${studentId}/semesters/${semesterId}`;

  return client.put(path, { name, startDate, endDate });
};

const removeSemester = (studentId, semesterId) => {
  const path = `/students/${studentId}/semesters/${semesterId}`;

  return client.delete(path);
};

export {
  getSemesters,
  createSemester,
  updateSemester,
  removeSemester,
};
