import { HttpClient } from '@angular/common/http';

export type HttpGetOptions = Parameters<HttpClient['get']>[1];
export type HttpPostOptions = Parameters<HttpClient['post']>[2];
