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

  const handleDelete = (repoToDelete: RepositoryItem) => {
    presentAlert({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de que quieres eliminar el repositorio ${repoToDelete.name}?`,
      buttons: [
        'Cancelar',
        {
          text: 'Eliminar',
          handler: async () => {
            if (!repoToDelete.owner) return;

            const originalRepos = [...repos];

            // Optimistic UI Update
            const newRepos = repos.filter(r => r.id !== repoToDelete.id);
            SetRepos(newRepos);
            closeAllSlidingItems();

            try {
              await deleteRepository(repoToDelete.owner, repoToDelete.name);
            } catch (error) {
              console.error("Failed to delete repository:", error);
              SetRepos(originalRepos);
              presentAlert({
                header: 'Error',
                message: 'No se pudo eliminar el repositorio. Por favor, inténtalo de nuevo.',
                buttons: ['OK'],
              });
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

  const handleSave = async (updatedRepoData: RepositoryItem) => {
    if (!editingRepo || !editingRepo.owner) return;

    const originalRepos = [...repos];
    const originalRepoName = editingRepo.name; 

    // Optimistically update the UI with the full data structure
    const newRepos = repos.map(r => (r.id === updatedRepoData.id ? updatedRepoData : r));
    SetRepos(newRepos);

    setEditingRepo(null);
    closeAllSlidingItems();

    try {
      // But only send the allowed fields to the API
      const updatePayload = {
        name: updatedRepoData.name,
        description: updatedRepoData.description,
      };
      await updateRepository(editingRepo.owner, originalRepoName, updatePayload);
    } catch (error) {
      console.error("Failed to update repository:", error);
      SetRepos(originalRepos);
      presentAlert({
        header: 'Error',
        message: 'No se pudo actualizar el repositorio. Por favor, inténtalo de nuevo.',
        buttons: ['OK'],
      });
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
