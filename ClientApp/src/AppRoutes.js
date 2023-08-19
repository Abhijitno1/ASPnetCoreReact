import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { CountriesStatesCities } from "./components/CountriesStatesCities";
import ReduxDemo from "./components/ReduxDemo";
import { JavascriptPlayer } from "./components/JavaScriptPlayer";

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

    },
    {
        path: '/redux-demo',
        element: <ReduxDemo />
    },
    {
        path: '/jsplayer',
        element: <JavascriptPlayer />
    }
];

export default AppRoutes;
