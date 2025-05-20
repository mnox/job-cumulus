import { configureStore } from '@reduxjs/toolkit';
import costFormulasSlice from '~/data/costs/CostFormula.slice';
import customersSlice from '~/data/customers/Customers.slice';
import jobsSlice from '~/data/jobs/Jobs.slice';
import materialsSlice from '~/data/materials/Materials.slice';
import toolsSlice from '~/data/tools/Tools.slice';
import uiSlice from '~/data/ui/UI.slice';
import usersSlice from '~/data/users/Users.slice';

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