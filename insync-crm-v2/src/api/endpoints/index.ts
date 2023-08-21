import { BaseResponse, PageResponse } from '@src/types/request';
import Request from '@src/api/axios';

export const getRecordsApi = (endpoint: any, params: any) => {
  return Request.get<PageResponse<any[]>>(endpoint, {
    ...params,
  });
};

export const getRecordApi = (endpoint: any) => {
  return Request.get<BaseResponse<any>>(endpoint);
};

export const createRecordApi = (endpoint: any, data: any) => {
  return Request.post<BaseResponse<any>>(endpoint, { ...data });
};

export const updateRecordApi = (endpoint: any, data: any) => {
  return Request.put<BaseResponse<any>>(endpoint, {
    ...data,
  });
};

export const deleteRecordApi = (endpoint: any) => {
  return Request.delete<BaseResponse<any>>(endpoint);
};
