import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonInput,
  IonText
} from "@ionic/react";
import { useHistory } from 'react-router-dom';
import { logoGithub } from 'ionicons/icons';
import './Login.css'
import AuthService from '../services/AuthService';


const Login: React.FC = () => {
    const history = useHistory();

    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if(!username || !token){
            setError('Todos los campos son requeridos');
            return;
        }
    const success = AuthService.login(username, token);
    if(success){
        history.push('/tab1');
    } else {
        setError('Error de autenticación. Verifica tus credenciales.');
    }
  }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">
                <div className="login-container">
                    <IonIcon icon={logoGithub} className="login-logo"/>
                    <h1> Inicio de sesion GitHub</h1>
                    <form onSubmit={handleLogin}>
                        <IonInput
                            className="Login-field"
                            label="Usuario de Github"
                            labelPlacement="floating"
                            fill="outline"
                            type="text"
                            value= {username}
                            onIonInput={e => setUsername(e.detail.value ?? '')}
                            required   
                        />
                        <IonInput
                            className="Login field"
                            label="Token de Github"
                            labelPlacement="floating"
                            fill="outline"
                            type="password"
                            value={token}
                            onIonInput={e => setToken(e.detail.value ?? '')}
                            required
                        />
                        {error && (
                            <IonText color= "danger" className="error-message">
                                <p>{error}</p>
                            </IonText>
                        )}


                        <IonButton expand="block" type="submit" className="login-button">
                            Iniciar Sesión
                        </IonButton>
                        <IonText color="medium" className="login-hint">
                            <p>Ingresa tu usuario y tu Token de Github</p>
                        </IonText>
                    </form>
                </div>
            </IonContent>
        </IonPage>
    );
}
export default Login;