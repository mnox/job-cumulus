import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index('./routes/Dashboard.tsx'),
  route('customers', './routes/customers/CustomersPage.tsx'),
  route('jobs', './routes/JobsPage.tsx'),
  route('materials', './routes/MaterialsPage.tsx'),
  route('reports', './routes/ReportsPage.tsx'),
  route('schedule', './routes/SchedulePage.tsx'),
  route('suppliers', './routes/SuppliersPage.tsx'),
] satisfies RouteConfig;
