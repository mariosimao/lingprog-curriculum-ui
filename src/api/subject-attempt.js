import client from './client';

const addAttempt = (studentId, semesterId, subjectId) => {
  const path = `/students/${studentId}/semesters/${semesterId}/attempts`;

  return client.post(path, { subjectId }).then((response) => (response.data.attempt.id));
};

const updateAttempt = (studentId, semesterId, attemptId, newGrade, newProfessor) => {
  const path = `/students/${studentId}/semesters/${semesterId}/attempts/${attemptId}`;

  return client.put(path, {
    grade: newGrade,
    professor: newProfessor,
  });
};

const removeAttempt = (studentId, semesterId, attemptId) => {
  const path = `/students/${studentId}/semesters/${semesterId}/attempts/${attemptId}`;

  return client.delete(path);
};

export default {
  addAttempt,
  updateAttempt,
  removeAttempt,
};
