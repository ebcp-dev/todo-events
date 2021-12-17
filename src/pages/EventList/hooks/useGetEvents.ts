import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const useGetEvents = (someFetchActionCreator) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(someFetchActionCreator());
  }, []);
};
