import React, { useState } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  useIonViewDidEnter } from '@ionic/react';
import { getUserInfo } from '../services/GithubService';
import { UserInfo } from '../interfaces/UserInfo';

const Tab3: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

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
        {userInfo && (
          <IonCard>
            <img alt="Foto de perfil" src={userInfo.avatar_url} />
            <IonCardHeader>
              <IonCardTitle>{userInfo.name}</IonCardTitle>
              <IonCardSubtitle>{userInfo.login}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              {userInfo.bio}
            </IonCardContent>
          </IonCard>
        )}
        
        {!userInfo && <p className="ion-padding">Cargando perfil...</p>}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;