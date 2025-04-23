import './App.css'
import BasicDragBox from "src/BasicDragBox.tsx";
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import SmoothFollowBox from "src/SmoothFollowBox.tsx";


const router = createBrowserRouter([
    {
        path: '/',
        children: [
            {
                index: true,
                element: <Navigate to={'/basic'} />,
            },
            {
                path:'basic',
                element: <div>
                    <h1 style={{ textAlign: 'center' }}>📸 Photo Wall</h1>
                    <BasicDragBox />
                </div>
            },
            {
                path:'smooth',
                element: <div>
                    <h1 style={{ textAlign: 'center' }}>📸 Photo Wall</h1>
                    <SmoothFollowBox />
                </div>
            }
        ]
    }
])

function App() {

    return (
        <RouterProvider router={router} />
    )
}

export default App
