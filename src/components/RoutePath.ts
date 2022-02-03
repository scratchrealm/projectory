type RoutePath = '/home' | '/about' | string
export const isRoutePath = (x: string): x is RoutePath => {
    if (x.startsWith('/resource/')) return true
    if (x.startsWith('/credential/')) return true
    if (['/home', '/about'].includes(x)) return true
    return false
}

export default RoutePath