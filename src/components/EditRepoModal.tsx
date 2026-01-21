import { IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonTextarea } from '@ionic/react';
import React, { useState } from 'react';
import { RepositoryItem } from '../interfaces/RepositoryItem';

interface EditRepoModalProps {
    repo: RepositoryItem | null;
    onClose: () => void;
    onSave: (repo: RepositoryItem) => void;
}

const EditRepoModal: React.FC<EditRepoModalProps> = ({ repo, onClose, onSave }) => {
    const [name, setName] = useState(repo?.name || '');
    const [description, setDescription] = useState(repo?.description || '');

    const handleSave = () => {
        if (repo) {
            onSave({ ...repo, name, description });
        }
    };

    return (
        <IonModal isOpen={repo !== null}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Editar Repositorio</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonInput
                    label="Nombre"
                    labelPlacement='stacked'
                    value={name}
                    onIonChange={(e) => setName(e.detail.value!)}
                />
                <IonTextarea
                    label="Descripción"
                    labelPlacement='stacked'
                    value={description}
                    onIonChange={(e) => setDescription(e.detail.value!)}
                />
                <IonButton expand="block" onClick={handleSave}>Guardar</IonButton>
                <IonButton expand="block" color="light" onClick={onClose}>Cancelar</IonButton>
            </IonContent>
        </IonModal>
    );
};

export default EditRepoModal;
