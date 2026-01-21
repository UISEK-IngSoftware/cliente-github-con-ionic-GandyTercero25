export interface RepositoryItem {
    id?: number;
    name: string;
    description: string | null;
    imageurl: string | null;
    owner: string | null; 
    language: string | null;
}