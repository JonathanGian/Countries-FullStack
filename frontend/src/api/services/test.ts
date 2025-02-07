import { TestResponse } from '../../types/test';
import { api } from '../axios';

export const testApi = {
  getTestData: () => api.get<TestResponse, TestResponse>('/test/supabase'),
}; 