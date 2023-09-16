import { Route, Switch } from 'react-router-dom'
import Try from './components/pages/my_try/Try'

const Routes = () => {
    return (
        <Switch>
            <Route path={'/'} component={Try} />
        </Switch>
    )
}

export default Routes
