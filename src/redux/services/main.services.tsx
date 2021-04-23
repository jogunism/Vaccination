// services
import axios from 'axios';
const http = axios.create({
  baseURL: 'https://api.corona-zahlen.org',
});

export const mainService = {
  // async testMethod({ id }: { id: String }) {
  async testMethod() {
    try {
      const response = await http.get('/vaccinations');
      return await Promise.resolve(response);
    } catch (error) {
      return await Promise.reject(error);
    }
  },
};
