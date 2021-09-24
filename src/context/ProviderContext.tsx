import { ReactChild, useState } from 'react';
import { useCookies } from 'react-cookie';
import SiteContext from '.'
type PropsCheck = {
    children: ReactChild
}
const ProviderContext = ({ children }: PropsCheck) => {
    const [cookies, setCookie, removeCookie] = useCookies<string>(['Authentication']);
    const [username, setUsername] = useState<string>('');
    const [login, setLogin] = useState<boolean>(cookies.Authentication ? true : false);
    const handleToken = (token: string, date: string):void => {
        setCookie('Authentication', token, 
        // { path: '/', expires: new Date(date), httpOnly: false, sameSite: 'strict' }
        { path: '/',  httpOnly: false, sameSite: 'strict' }
        )
        setLogin(true)
    }
    const handleExit=()=>{
        removeCookie('Authentication')
        setLogin(false)
    }
    return (
        <SiteContext.Provider value={
            {
                username,
                token: cookies.Authentication,
                baseuri: 'https://uitestapi.tipax.ir/api/v1/',
                handleToken,
                login,
                handleExit,
            }
        }
        >
            {children}
        </SiteContext.Provider>
    )
}
export default ProviderContext