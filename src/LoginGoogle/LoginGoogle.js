import { useState } from 'react'
import GoogleLogin from 'react-google-login'

function LoginGoogle() {
    const [loginData, setLoginData] = useState(
        localStorage.getItem('loginData') ? JSON.parse(localStorage.getItem('loginData')) : null
    )
    const handleFailure = (result) => {
        alert(result)
    }
    const handleLogin = async (googleData) => {
        const res = await fetch('/api/google-login', {
            method: 'POST',
            body: JSON.stringify({
                token: googleData.tokenId
            }),
            headers: {
                'Content-type': 'application/json'
            } 
        })

        const data = await res.json()
        setLoginData(data)
        localStorage.setItem('loginData', JSON.stringify(data))
    }
    const handleLogout = () => {
        localStorage.removeItem('loginData')
        setLoginData(null)
    }

    return (
        <div>
            <h1>Login with your Google</h1>
            <div>
                {
                    loginData ? (
                        <div>
                            <h3>you logged in as {loginData.email}</h3>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        <div>
                            <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            buttonText='Login with Google'
                            onSuccess={handleLogin}
                            onFailure={handleFailure}
                            cookiePolicy={'single_host_origin'}
                            />
                        </div>
                    )
                }
            </div>
           
        </div>
    )
}

export default LoginGoogle