export interface RepositoryItem {
    id?: number;
    name: string;
    description: string | null;
    imageurl: string | null;
    owner: string | null; 
    language: string | null;
}

export interface RepositoryUpdatePayload {
    name?: string;
    description?: string | null;
    homepage?: string;
    private?: boolean;
    has_issues?: boolean;
    has_projects?: boolean;
    has_wiki?: boolean;
}