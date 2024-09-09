import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import {DIProvider} from "./contexts/DIContext";
import store from "./infrastructure/state/store";
import {Provider} from "react-redux";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient()


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <DIProvider>
                <ToastContainer position="top-right" autoClose={5000} hideProgressBar/>
                <QueryClientProvider client={queryClient}>
                    <App/>
                </QueryClientProvider>
            </DIProvider>
        </Provider>
    </StrictMode>
)
