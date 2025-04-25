import './App.css'
import BasicDragBox from "src/component/BasicDragBox.tsx";
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import SmoothFollowBox from "src/component/SmoothFollowBox.tsx";
import PhotoWall from "src/component/PhotoWall.tsx";
import DraggableBox from './component/DraggableBox';
import SmoothDragBox from "src/component/SmoothDragBox.tsx";
import SpreadBoxes from "src/component/SpreadBoxes.tsx";


const router = createBrowserRouter([
    {
        path: '/',
        children: [
            {
                index: true,
                element: <Navigate to={'/1'} />,
            },
            {
                path:'1',
                element: <div>
                    <h1 style={{ textAlign: 'center' }}>1 basic</h1>
                    <BasicDragBox />
                </div>
            },
            {
                path:'2',
                element: <div>
                    <h1 style={{ textAlign: 'center' }}>2 smooth</h1>
                    <SmoothFollowBox />
                </div>
            },
            {
                path:'3',
                element: <div>
                    <h1 style={{ textAlign: 'center' }}>3 draggable</h1>
                    <DraggableBox />
                </div>
            },
            {
                path:'4',
                element: <div>
                    <h1 style={{ textAlign: 'center' }}>4 smooth drag</h1>
                    <SmoothDragBox />
                </div>
            },
            {
                path:'5',
                element: <div>
                    <h1 style={{ textAlign: 'center' }}>5 spread boxes</h1>
                    <SpreadBoxes />
                </div>
            },
            {
                path:'photowall',
                element: <div>
                    <h1 style={{ textAlign: 'center' }}>photowall</h1>
                    <PhotoWall />
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
