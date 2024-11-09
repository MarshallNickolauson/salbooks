import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { StrictMode } from 'react';
import store from './store.js';
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import MainLayout from './layouts/MainLayout';
import NotFoundScreen from './screens/NotFoundScreen';
import HomeScreen from './screens/HomeScreen';
import ExampleScreen from './screens/ExampleScreen.jsx';
import IntroductionScreen from './screens/IntroductionScreen.jsx';
import BookPrefaceScreen from './screens/BookPrefaceScreen.jsx';
import ChapterContentScreen from './screens/ChapterContentScreen.jsx';
import PartPrefaceScreen from './screens/PartPrefaceScreen.jsx';

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<MainLayout />}>
                <Route path='*' element={<NotFoundScreen />} />
                <Route index element={<HomeScreen />} />
                <Route path='/example' element={<ExampleScreen />} />

                <Route path='/books/:bookTitle/introduction' element={<IntroductionScreen />} />
                <Route path='/books/:bookTitle/preface' element={<BookPrefaceScreen />} />
                <Route path='/books/:bookTitle/:partNumber/preface' element={<PartPrefaceScreen />} />
                <Route path='/books/:bookTitle/:partNumber/:chapterNumber' element={<ChapterContentScreen />} />
            </Route>
        )
    );

    return <RouterProvider router={router} />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
