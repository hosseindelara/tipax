import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom'
import SiteContext from '../context';
type propsCheck = {
    component: any
    path: string
}
export const Authentication: React.FC<any> = ({ component: Component, path }) => {
    const { login } = useContext(SiteContext);
    return (
        <Route
            path={path}
            render={props =>
                login ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: "/login", state: { status: 302 } }} />
                )
            }
        />
    )
}