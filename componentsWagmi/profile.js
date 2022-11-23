import {useAccount,useConnect,useDisconnect,useEnsName,} from 'wagmi'

export function Profile() {
    const { address, connector, isConnected } = useAccount()
    const { data: ensName } = useEnsName({ address })
    // console.log(useEnsName)
    const { connect, connectors, error, isLoading, pendingConnector } =
      useConnect()
    const { disconnect } = useDisconnect()
    
    if (isConnected) {
      return (
        <div>

          {/* $ mean :const age = 3 | console.log(`I'm ${age} years old!`) */}  
          <div>Connected to  {connector?.name }  </div>

          <div>Address: {ensName ? `${ensName} (${address})` : address}</div>
          <button onClick={disconnect}>Disconnect</button>
        </div>
      )
    }
       
    return (
      <div>
        {connectors.map((connector) => (
          <button
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect({ connector })}
          >
            {connector.name}
            {!connector.ready && ' (unsupported)'}
            {isLoading &&
              connector.id === pendingConnector?.id &&
              ' (connecting)'}
          </button>
          
        ))}
        {error && <div>{error.message}</div>}
      </div>
    )
  }
