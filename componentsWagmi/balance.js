import { useBalance } from 'wagmi';
export  function ShowBalance () {
    const { isError, stillLoading, data } = useBalance({
        address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      })
    if (isError) return <div>Error fetching balance</div>
    if (stillLoading) return <div>Fetching balance…</div>
    return (
        <div>
          Balance: {data?.formatted} {data?.symbol}
        </div>
      )
}