import { fetchAlarmEvents } from "../services/index";

export const useFetchAlarmEvents =
  ({ setLoading, setErrors, setData, setPage }) =>
  async (page, query) => {
    setLoading(true);
    try {
      const { data } = await fetchAlarmEvents(page, query);
      setData(data);
      setLoading(false);
      setPage(page);
    } catch (err) {
      setErrors(err.error);
      setLoading(false);
    }
  };
