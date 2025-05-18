import { configureStore, type Reducer } from '@reduxjs/toolkit';
import costFormulasSlice from '~/data/costs/CostFormula.slice';
import customersSlice from '~/data/customers/Customers.slice';
import jobsSlice from '~/data/jobs/Jobs.slice';
import materialsSlice from '~/data/materials/Materials.slice';
import { useAppSelector } from '~/data/store/root-hooks';
import toolsSlice from '~/data/tools/Tools.slice';
import uiSlice from '~/data/ui/UI.slice';
import usersSlice from '~/data/users/Users.slice';
import { matchTo } from '~/services/mock/MockAPIServiceWorker';

const AppRootStore = configureStore({
  reducer: {
    jobs: jobsSlice,
    costFormulas: costFormulasSlice,
    customers: customersSlice,
    materials: materialsSlice,
    tools: toolsSlice,
    UI: uiSlice,
    users: usersSlice,
  },
});

export default AppRootStore;
export type AppRootState = ReturnType<typeof AppRootStore.getState>;
export type AppDispatch = typeof AppRootStore.dispatch;

export const useMatchSelector = (
  root: string,
  source: string,
  relationName: string,
  joinKey: string,
  sourceIdentifier: string = 'id',
)=> {
  return useAppSelector(state => matchTo(
    resolveStateMatchSource(root, state),
    resolveStateMatchSource(source, state),
    relationName,
    joinKey,
    sourceIdentifier,
  ));
}

const resolveStateMatchSource = (identifier: string, state: AppRootState) => {
  const reducer = state[identifier];
  return !(reducer satisfies Reducer)
    ? reducer
    : reducer[identifier] || [];
}