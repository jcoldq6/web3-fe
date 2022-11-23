// wagmi libs
import {WagmiConfig, createClient, defaultChains, configureChains,} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import {ShowBalance} from "./componentsWagmi/balance"
import { NetworkSwitcher } from './componentsWagmi/switchNetwork';
import { Profile } from './componentsWagmi/profile';


// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider({ apiKey: 'yourAlchemyApiKey' }),
  publicProvider(),
])
 
// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
})
 

// Pass client to React Context Provider
function App() {  
  return (
    <WagmiConfig client={client}>
        <Profile />
        <ShowBalance />
        <NetworkSwitcher />
    </WagmiConfig>
  )
}
export default App 