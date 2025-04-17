import { defineStore } from 'pinia';
import { ref } from 'vue';

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role: Role;
  password: string;
  avatar: string;
  cart?: any;
  address?: any;
  departments?: Department ;
  signature: string;
  title: string;
};

type Department = {
  text: string;
  value: string;
};
type Role = {
  id: string;
  name: string;
};

type Credentials = {
  email: string;
  password: string;
};

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const accessToken = ref<string | null>(null);
  const isLoading = ref<boolean>(false);

  async function logout() {
    try {
      await useApi('/auth/logout', {
        method: 'POST',
        data: {
          refresh_token: localStorage.getItem('refresh_token'),
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      user.value = null;
      accessToken.value = null;
      localStorage.removeItem('refresh_token');
      return navigateTo('/auth');
    }
  }

  async function refresh() {
    if (localStorage.getItem('refresh_token')) {
      try {
        const refresh_data = await useApi<{ data: { access_token: string; refresh_token: string } }>('/auth/refresh', {
          method: 'POST',
          headers: { Authorization: '' },
          data: { refresh_token: localStorage.getItem('refresh_token') },
        });
        accessToken.value = refresh_data.data.access_token;
        localStorage.setItem('refresh_token', refresh_data.data.refresh_token);
        if (!user.value) await fetchUser();
        return true;
      } catch (error) {
        console.error('Token refresh error:', error);
        localStorage.removeItem('refresh_token');
        return false;
      }
    }
    return false;
  }

  async function login(credentials: Credentials) {
    isLoading.value = true;
    try {
      const login = await useApi<{ data: { access_token: string; refresh_token: string } }>('/auth/login', {
        method: 'POST',
        data: credentials,
      });
      localStorage.setItem('refresh_token', login.data.refresh_token);
      accessToken.value = login.data.access_token;
      await fetchUser();
      
      return navigateTo('/');
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchUser() {
    try {
      const response = await useApi<{ data: User[] }>(
        `/users?filter[id]=$CURRENT_USER&fields=id,first_name,last_name,email,avatar, role.id ,role.name,departments,signature,title`,
        {
          method: 'GET',
        }
      );
  
      const currentUser = response.data[0];
      if (currentUser) {
        user.value = currentUser;
        return currentUser;
      } else {
        throw new Error('User not found in response');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }
  // Update the user profile

  async function updateUserProfile(
    updateData: Partial<User>,
    avatarFile?: File,
    signatureFile?: File
  ) {
    if (!user.value) {
      throw new Error('User is not authenticated');
    }
    try {
      if (avatarFile) {
        const formData = new FormData();
        formData.append('file', avatarFile);

        const fileRes: any = await useApi('/files', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          data: formData,
        });

        updateData.avatar = fileRes.data.id;
      }
      if (signatureFile) {
        const signatureForm = new FormData();
        signatureForm.append('file', signatureFile);
      
        const signatureRes = await useApi<{ data: { id: string } }>('/files', {
          method: 'POST',
          headers: {},
          data: signatureForm,
        });
      
        updateData.signature = signatureRes.data.id;
      }
      
      await useApi(`/users/${user.value.id}`, {
        method: 'PATCH',
        data: updateData,
      });
      
      // await refresh();
      await fetchUser();
      // user.value = { ...user.value, ...updateData };
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  }
  
  async function checkAuth() {
    const hasToken = !!localStorage.getItem('refresh_token');
    if (hasToken) {
      return await refresh();
    }
    return false;
  }

  return {
    user,
    accessToken,
    isLoading,
    login,
    logout,
    refresh,
    fetchUser,
    checkAuth,
    updateUserProfile
  };
});