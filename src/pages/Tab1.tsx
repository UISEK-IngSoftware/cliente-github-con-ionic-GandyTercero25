import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar, useIonViewDidEnter, IonItemSliding, IonItemOptions, IonItemOption, IonIcon, useIonAlert, IonItem } from '@ionic/react';
import React, { useRef } from 'react';
import { useState } from 'react';
import './Tab1.css';
import RepoItem from '../components/RepoItem';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { fetchRepositories, deleteRepository, updateRepository } from '../services/GithubService';
import { pencil, trash } from 'ionicons/icons';
import EditRepoModal from '../components/EditRepoModal';

const Tab1: React.FC = () => {
  const [repos, SetRepos] = React.useState<RepositoryItem[]>([]);
  const [presentAlert] = useIonAlert();
  const [editingRepo, setEditingRepo] = useState<RepositoryItem | null>(null);
  const listRef = useRef<HTMLIonListElement>(null);

  const loadRepos = async () => {
    const reposData = await fetchRepositories();
    SetRepos(reposData);
  };

  const closeAllSlidingItems = () => {
    listRef.current?.closeSlidingItems();
  }

  const handleDelete = (repo: RepositoryItem) => {
    presentAlert({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de que quieres eliminar el repositorio ${repo.name}?`,
      buttons: [
        'Cancelar',
        {
          text: 'Eliminar',
          handler: async () => {
            if (repo.owner) {
              await deleteRepository(repo.owner, repo.name);
              loadRepos();
              closeAllSlidingItems();
            }
          },
        },
      ],
    });
  };

  const handleEdit = (repo: RepositoryItem) => {
    setEditingRepo(repo);
    closeAllSlidingItems();
  };

  const handleSave = async (repo: RepositoryItem) => {
    if (editingRepo && editingRepo.owner) {
      await updateRepository(editingRepo.owner, editingRepo.name, repo);
      setEditingRepo(null);
      loadRepos();
      closeAllSlidingItems();
    }
  };

  useIonViewDidEnter(() => {
    console.log("IownViewDidEnter - Cargando Repositorios")
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
        <IonList ref={listRef}>
          {repos.map((repo, index) =>
            <IonItemSliding key={index}>
              <RepoItem
                repo={repo}
              />
              <IonItemOptions side="end">
                <IonItemOption onClick={() => handleEdit(repo)}>
                  <IonIcon slot="icon-only" icon={pencil}></IonIcon>
                </IonItemOption>
                <IonItemOption color="danger" onClick={() => handleDelete(repo)}>
                  <IonIcon slot="icon-only" icon={trash}></IonIcon>
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          )}

        </IonList>

        <EditRepoModal
          repo={editingRepo}
          onClose={() => setEditingRepo(null)}
          onSave={handleSave}
        />

      </IonContent>
    </IonPage>
  );
};

export default Tab1;
