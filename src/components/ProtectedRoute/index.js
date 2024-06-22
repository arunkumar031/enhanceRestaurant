import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = props => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken) {
    return <Route {...props} />
  }
  return <Redirect to="/login" />
}

export default ProtectedRoute
