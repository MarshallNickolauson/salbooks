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
import LoginScreen from './screens/LoginScreen.jsx';
import PrivateRoutes from './components/PrivateRoutes';
import AdminRoutes from './components/AdminRoutes';
import ProfileScreen from './screens/ProfileScreen.jsx';
import AdminScreen from './screens/AdminScreen.jsx';
import UsersListScreen from './screens/UsersListScreen.jsx';
import SingleUserScreen from './screens/SingleUserScreen.jsx';

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<MainLayout />}>
                <Route path='*' element={<NotFoundScreen />} />
                <Route index element={<HomeScreen />} />
                <Route path='/example' element={<ExampleScreen />} />

                <Route path='/login' element={<LoginScreen />} />

                <Route path='/books/:bookTitle/introduction' element={<IntroductionScreen />} />
                <Route path='/books/:bookTitle/preface' element={<BookPrefaceScreen />} />
                <Route path='/books/:bookTitle/:partNumber/preface' element={<PartPrefaceScreen />} />
                <Route path='/books/:bookTitle/:partNumber/:chapterNumber' element={<ChapterContentScreen />} />

                <Route path='' element={<PrivateRoutes />}>
                    <Route path='/profile' element={<ProfileScreen />} />
                </Route>

                <Route path='' element={<AdminRoutes />}>
                    <Route path='/admin' element={<AdminScreen />} />
                    <Route path='/admin/users' element={<UsersListScreen />} />
                    <Route path='/admin/users/:id' element={<SingleUserScreen />} />
                </Route>
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
