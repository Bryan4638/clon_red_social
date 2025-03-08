import { UserAuth } from '../types';
import axios from './axios'

export const RegisterRequest = (user: UserAuth) => {
  return axios.post(`/auth/register`, user);
};

export const LoginRequest = (user: UserAuth) => {
  return axios.post(`/auth/login`, user);
};

export const LogoutRequest = () => {
  return axios.post(`/auth/logout`)
}

export const verifyTokenRequest = async () => axios.get(`/auth/verify`);
