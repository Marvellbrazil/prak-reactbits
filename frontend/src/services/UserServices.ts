import api from "@/API/axios";

export interface User {
    id?: number;
    name: string;
    email: string;
    password?: string;
}

export const UserServices = {
    // GET
    getAll: async (): Promise<User[]> => {
        const response = await api.get('/users');
        return response.data;
    },

    // POST
    create: async (data: User): Promise<User[]> => {
        const response = await api.post('/users', data);
        return response.data;
    },

    // PUT
    update: async (id: number, data: Partial<User>): Promise<User> => {
        const response = await api.put(`/users/${id}`, data);
        return response.data;
    },

    // DELETE
    delete: async (id: number): Promise<void> => {
        const response = await api.delete(`/users/${id}`);
        return response.data;
    }
}