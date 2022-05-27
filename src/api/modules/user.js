import service from '@/api/http.js';

const user = {
  get: (params) => service.get(`/posts`, params),
};

export default user;