export function useApi() {
  const makeRequest = async <T>({
    url,
    method = 'GET',
    data = null,
    headers = {}
  }: ApiConfig): Promise<T> => {
    try {
      const response = await axios({
        url,
        method,
        data,
        headers
      });
      return response.data;
    } catch (error) {
      // 에러 처리
      throw error;
    }
  };

  return { makeRequest };
} 