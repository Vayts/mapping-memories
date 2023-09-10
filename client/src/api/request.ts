import { axiosPrivate } from '@src/api/axios';

export async function postRequest(uri: string, data: Record<string, string>, axiosInstance = axiosPrivate): Promise<Record<string, any>> {
  const response = await axiosInstance.post(uri, data);
  return response;
}

export async function postRequestWithFiles(uri: string, data: FormData, axiosInstance = axiosPrivate): Promise<Record<string, any>> {
  const response = await axiosInstance.post(uri, data);
  return response;
}

export async function getRequest(uri: string, axiosInstance = axiosPrivate): Promise<Record<string, any>> {
  const response = await axiosInstance.get(uri);
  return response;
}

export async function deleteRequest(uri: string, axiosInstance = axiosPrivate): Promise<Record<string, any>> {
  const response = await axiosInstance.delete(uri);
  return response;
}
