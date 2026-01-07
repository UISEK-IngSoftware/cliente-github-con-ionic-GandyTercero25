import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import './Tab3.css';
import { UserInfo } from '../interfaces/UserInfo';
import { getUserInfo } from '../services/GithubService';
import { useState } from 'react';

const Tab3: React.FC = () => {
  const[userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const loadUserInfo = async () => {
    const info = await getUserInfo();
    setUserInfo(info);
  };

  useIonViewDidEnter(() => {
    loadUserInfo();
  });


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil de Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <img alt="Foto de perfil" src="https://i.pravatar.cc/300?img=12" />
          <IonCardHeader>
            <IonCardTitle>Gandy Tercero</IonCardTitle>
            <IonCardSubtitle>gandytercero</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>Estudiante de Ingenieria Informatica</IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
