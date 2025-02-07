export interface TestData extends Record<string, unknown> {
  id: string;
  name: string;
  description: string;
  created_at: string;
  is_active: boolean;
}

export interface TestResponse {
  status: string;
  data: TestData[];
  timestamp: string;
}

export interface TestState {
  data: TestData[];
  error: string | null;
}