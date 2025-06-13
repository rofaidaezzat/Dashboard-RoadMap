
'use client'
import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


export function AppProviders({ children }: { children: ReactNode }) {
    const queryClient = new QueryClient()

    return (
    <Provider store={store}>
            <QueryClientProvider client={queryClient}>
            {children}
            </QueryClientProvider>
    </Provider>
    )
}
