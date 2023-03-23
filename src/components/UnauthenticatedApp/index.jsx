import { useAuth } from '../../hooks/useAuth';
import './styles.css';

function UnauthenticatedApp() {
    const { login , loginWithIdCode } = useAuth();

    return (
        <>
            <h2>Log in to join a chat room!</h2>
            <div>
                <button onClick={login} className="login">
                    Login with Google
                </button>
            </div>
            <div>
                <button onClick={loginWithIdCode} className="login">
                    Login with credentials(currently passed statically to test)
                </button>
            </div>
           
        </>
    );
}

export { UnauthenticatedApp };
