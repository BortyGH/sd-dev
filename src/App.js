import {useState} from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"

import {Navigation} from "./components";
import {
    Detail,
    Login,
    FourOFour,
    Overview,
    Default
} from "./pages";

function App() {
    const sdlIdFromUrl = window.location.pathname.split("/")[2];
    const loggedInSession = !!sessionStorage.getItem("username");
    const [state, setState] = useState({
        sdlId: sdlIdFromUrl !== "login" ? sdlIdFromUrl : null,
        loggedIn: loggedInSession,
    });
    const defaultComp = (
        <>
            <Navigation
                loggedIn={state.loggedIn}
                sdlNumber={state.sdlId}
                setState={(key, value) => setState({...state, [key]: value})}
                hideSearch
            />
            <Default
                loggedIn={state.loggedIn}
                sdlNumber={state.sdlId}
                setState={(key, value) => setState({...state, [key]: value})}
            />
        </>
    )

    const detailComp = (
        <>
            <Navigation
                loggedIn={state.loggedIn}
                sdlNumber={state.sdlId}
                setState={(key, value) => setState({...state, [key]: value})}
            />
            <Detail
                loggedIn={state.loggedIn}
                sdlId={state.sdlId}
                setId={(id) => setState({...state, sdlId: id})}
            />
        </>
    )

    const routes = createBrowserRouter([
        {
            path: '/',
            element: defaultComp
        },
        {
            path: 'notFound',
            element: defaultComp
        },
        {
            path: "new",
            element: detailComp
        },
        {
            path: "shipment/:sdlId",
            element: detailComp
        },
        {
            path: 'overview',
            element: (
                <>
                    <Navigation
                        loggedIn={state.loggedIn}
                        sdlNumber={state.sdlId}
                        setState={(key, value) => setState({...state, [key]: value})}
                    />
                    <Overview loggedIn={state.loggedIn}/>
                </>
            )
        },
        {
            path: "login",
            element: (
                <Login
                    sdlId={state.sdlId}
                    loggedIn={state.loggedIn}
                    setLogin={() => setState({...state, loggedIn: true})}
                />
            )
        },
        {
            path: "*",
            element: <FourOFour />
        },
    ])

    return <RouterProvider router={routes}/>
}

export default App;
