import { IonItem, IonLabel,IonThumbnail } from '@ionic/react';
import './RepoItem.css';
import { RepositoryItem } from '../interfaces/RepositoryItem';


const RepoItem: React.FC<{repo:RepositoryItem}> = ({ repo }) => {
  return ( 
    <IonItem>
        <IonThumbnail slot="start"> 
            <img src={repo.imageUrl|| "https://www.shutterstock.com/image-photo/spaceman-spacesuit-flight-outer-space-600nw-2556675931.jpg"} alt={repo.name}/>
        </IonThumbnail>
        <IonLabel>
           <h2>{repo.name}</h2>
           <p>{repo.description}</p>
           <p>Propietario:{repo.owner}</p>
           <p>Lenguaje:{repo.language}</p>
           </IonLabel>
    </IonItem>
    
  );
};

export default RepoItem;
