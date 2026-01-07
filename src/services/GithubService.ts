import axios from 'axios';
import AuthService from './AuthService';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { UserInfo } from '../interfaces/UserInfo';


const GITHUB_API_URL = import.meta.env.VITE_API_URL; 
const githubApi = axios.create({
    baseURL: GITHUB_API_URL,
});

githubApi.interceptors.request.use((config) => {
    const authHeader = AuthService.getAuthHeader();
    if (authHeader) {
        config.headers.Authorization = authHeader;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const fetchRepositories = async (): Promise<RepositoryItem[]> => {
    try {
        const response = await githubApi.get(`/user/repos`, {
            params: { per_page: 100, sort: 'created', direction: 'desc', affiliation: 'owner' },
        });

        if (!Array.isArray(response.data)) {
            console.error('GitHub no devolvió un array. Respuesta:', response.data);
            return [];
        }

        return response.data.map((repo: any) => ({
            name: repo.name,
            description: repo.description,
            imageUrl: repo.owner?.avatar_url || 'https://via.placeholder.com/150',
            owner: repo.owner?.login || '',
            language: repo.language || '',
        }));
    } catch (error) {
        console.error('Error en la petición:', error);
        return [];
    }
};

export const createRepository = async (repo: RepositoryItem): Promise<void> => {
    try {
        const response = await githubApi.post(`/user/repos`, {
            name: repo.name,
            description: repo.description,
            private: false 
        }, {

        });
        console.log('Repositorio creado con éxito', response.data);
    } catch (error) {
        console.error('Hubo un error al crear el repositorio', error);
    }
};

export const getUserInfo = async (): Promise<UserInfo> => {
    try {
        const response = await githubApi.get(`/user`, {

        });
        return response.data as UserInfo;
    } catch (error) {
        console.error('Hubo un error al obtener la información del usuario', error);
        const userNotFound: UserInfo = {
            login: 'undefined',
            name: 'Usuario no encontrado',
            bio: 'No se pudo obtener la información del usuario.',
            avatar_url: 'https://cdn-icons-png.flaticon.com/512/6858/6858504.png'
        };
        return userNotFound;
    }
};