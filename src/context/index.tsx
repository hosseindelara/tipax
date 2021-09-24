import { createContext } from "react";

type Context = {
    username: string,
    token: any,
    handleToken: Function,
    baseuri: string,
    login: boolean,
    handleExit: Function
}
const SiteContext = createContext<Context>({
    username: '',
    token: '',
    handleToken: () => { },
    baseuri: '',
    login: false,
    handleExit: () => { }
})
export default SiteContext