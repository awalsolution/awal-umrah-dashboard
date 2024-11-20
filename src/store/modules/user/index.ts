import { defineStore } from 'pinia';
import { ref } from 'vue';
import { ACCESS_TOKEN, CURRENT_USER } from '@src/utils/storage/variables';
import { storage } from '@src/utils/storage';
import { loginApi, getUserInfoApi } from '@src/api/auth';
import _ from 'lodash';

export const useUserStore = defineStore('app-user', () => {
  const token = ref(storage.get(ACCESS_TOKEN, ''));
  const permissions = ref([]);
  const roles = ref([]);
  const currentUser = ref(storage.get(CURRENT_USER, {}));

  const hasData = () => currentUser.value.id;

  const setToken = (newToken: string) => {
    token.value = newToken;
  };

  const setPermissions = (newPermissions: any) => {
    permissions.value = newPermissions;
  };

  const setRoles = (newRole: any) => {
    roles.value = newRole;
  };

  const setCurrentUser = (newInfo: any) => {
    currentUser.value = newInfo;
  };

  const login = async (params: any) => {
    const res: any = await loginApi(params);
    console.log(res);
    const { data, code } = res;
    if (code === 200 && data?.token) {
      const ex = 7 * 24 * 60 * 60;
      storage.set(ACCESS_TOKEN, data.token, ex);
      setToken(data.token);
    }

    return res;
  };

  const getCurrentUserWithApiRequest = async () => {
    const res: any = await getUserInfoApi();
    if (res.data) {
      const permissionsList = await allPermissions(res.data);
      setPermissions(permissionsList);
      setRoles(res.data.roles);
      setCurrentUser(res.data);
    } else {
      throw new Error('api not responding correctly!');
    }

    return res.data;
  };

  const allPermissions = async (user: any) => {
    let rolePermissions: any = [];

    if (user?.roles) {
      for (const role of user.roles) {
        rolePermissions = [...role.permissions.map((permission: any) => permission.name)];
      }
    }

    const userPermissions = user?.permissions.map((permission: any) => permission.name) || [];

    return _.uniq([...userPermissions, ...rolePermissions]);
  };

  const logout = async () => {
    setPermissions([]);
    setRoles([]);
    setCurrentUser({});
    storage.remove(ACCESS_TOKEN);
    storage.remove(CURRENT_USER);
    return { message: 'User Logout Successfully!' };
  };

  return {
    token,
    permissions,
    roles,
    hasData,
    currentUser,
    login,
    logout,
    getCurrentUserWithApiRequest
  };
});
