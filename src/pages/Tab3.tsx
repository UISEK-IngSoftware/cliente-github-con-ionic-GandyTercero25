import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

import './Tab3.css';

const Tab3: React.FC = () => {
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
            <img alt="Silhouette of mountains" src="https://pics.filmaffinity.com/077111620186735-nm_200.jpg" />
            <IonCardHeader>
              <IonCardTitle>José Escobar</IonCardTitle>
              <IonCardSubtitle>josescobar</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>Breve Descripción.</IonCardContent>
          </IonCard>
          </IonContent>
        </IonPage>
        );
};

        export default Tab3;
