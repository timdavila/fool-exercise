'use client'

import { Provider as ReduxProvider } from 'react-redux'
import { store } from '../store'
import ApolloClientProvider from "~lib/apollo-client-provider"


export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
      <ApolloClientProvider>
        <ReduxProvider store={store}>
          {children}
        </ReduxProvider>
      </ApolloClientProvider>
  )
}