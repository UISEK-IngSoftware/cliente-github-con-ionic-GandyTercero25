import axios from 'axios';
import { RepositoryItem } from '../interfaces/RepositoryItem';


const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_API_TOKEN = 'ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // Reemplaza con tu token de acceso personal de GitHub

export const fecthRepositories = async (): Promise<RepositoryItem[]> => {
    try {
        const response = await axios.get(`${GITHUB_API_URL}/users/repos`, {
            headers: {
                Authorization: `Bearer ${GITHUB_API_TOKEN}`,
            },
            params: {
                per_page: 100,
                sort: 'created',
                direction: 'desc',
            },
        });
        const repositories: RepositoryItem[] = response.data.map((repo: any) => ({
            name: repo.name,
            description: repo.description,
            imageUrl: repo.owner ? repo.owner.avatar_url : null,
            owner: repo.owner ? repo.owner.login : null,
            language: repo.language,
        }));
        return repositories; 

    }catch (error) {
        console.error('Hubo un error al obtener repositorios:', error);
        return [];
    }
}