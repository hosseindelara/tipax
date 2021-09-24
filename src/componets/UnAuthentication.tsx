import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom'
import SiteContext from '../context';
type PropsCheck = {
    path: string;
    component: any;
}
const UnAuthentication = ({ component: Component, path }: PropsCheck) => {
    const { login } = useContext(SiteContext);
    return (
        <Route
            path={path}
            render={props =>
                login ? (
                    <Redirect to={{ pathname: "/", state: { status: 302 } }} />
                ) : (
                    <Component {...props} />
                )
            }
        />
    )
}
export default UnAuthentication