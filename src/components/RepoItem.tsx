import { IonItem, IonLabel,IonThumbnail } from '@ionic/react';
import './RepoItem.css';
import { RepositoryItem } from '../interfaces/RepositoryItem';


const RepoItem: React.FC<{repo:RepositoryItem}> = ({ repo }) => {
  return ( 
    <IonItem>
        <IonThumbnail slot="start"> 
            <img src={repo.imageurl|| "https://static.vecteezy.com/system/resources/thumbnails/006/468/776/small/astronaut-flying-on-space-vector.jpg"} alt={repo.name}/>
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
