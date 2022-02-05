export const coinToLimit = (coin: string) => {
  if (coin == null) {
    return coin
  }
  switch (coin) {
    case 'USDT (ERC20)':
      return '200'
    case 'USDT (OMNI)':
      return '200'
    case 'BTC':
      return '0.03'
    case 'ETH':
      return '0.1'
    case 'BCH':
      return '0.1'
    case 'LTC':
      return '0.1'
    case 'DASH':
      return '0.1'
    case 'ZEC':
      return '0.03'
    case 'DCR':
      return '0.1'
    case 'GRD':
      return '200'
    case 'FIL':
      return '0.2'
    default:
      return ''
  }
}
