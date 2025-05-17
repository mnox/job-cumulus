import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import RootStore, { type RootState, type AppDispatch } from './root-store.config';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;