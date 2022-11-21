import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { CountriesStatesCities } from "./components/CountriesStatesCities";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
    {
        path: '/world-cities',
        element: <CountriesStatesCities />
    }
];

export default AppRoutes;
