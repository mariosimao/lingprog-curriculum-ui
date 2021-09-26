import client from './client';

const getSemesterAttempts = (studentId, semesterId) => {
  const path = `/students/${studentId}/semesters/${semesterId}/subject-attempts`;

  return client.get(path).then((response) => (response.data.subjectAttempts));
};

const addAttempt = (studentId, semesterId, subjectId) => {
  const path = `/students/${studentId}/semesters/${semesterId}/subject-attempts`;

  return client.post(path, { subjectId }).then((response) => (response.data.id));
};

const updateAttempt = (studentId, semesterId, attemptId, newGrade, newProfessor) => {
  const path = `/students/${studentId}/semesters/${semesterId}/subject-attempts/${attemptId}`;

  return client.put(path, {
    grade: newGrade,
    professor: newProfessor,
  });
};

const removeAttempt = (studentId, semesterId, attemptId) => {
  const path = `/students/${studentId}/semesters/${semesterId}/subject-attempts/${attemptId}`;

  return client.delete(path);
};

export {
  getSemesterAttempts,
  addAttempt,
  updateAttempt,
  removeAttempt,
};
