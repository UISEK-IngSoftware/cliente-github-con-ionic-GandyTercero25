import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import './Tab1.css';
import RepoItem from '../components/RepoItem';
import { fetchRepositories } from '../services/GithubService';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { useState } from 'react';

const Tab1: React.FC = () => {
  const [repos, setRepos] = useState<RepositoryItem[]>([]);

  const loadRepos = async () => {
    const reposData = await fetchRepositories();
    setRepos(reposData);
  };

  useIonViewDidEnter(() => {
    loadRepos();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {repos.map((repo, index) => (
            <RepoItem 
              key={index}
              name={repo.name}
              imageUrl={repo.imageUrl || 'https://via.placeholder.com/150'} 
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;