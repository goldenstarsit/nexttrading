export interface BinanceRestClient {

  get<T>(
    path: string,
    query?: Record<
      string,
      string | number | boolean
    >,
    signed?: boolean,
  ): Promise<T>;


  post<T>(
    path: string,
    body?: Record<
      string,
      string | number | boolean
    >,
    signed?: boolean,
  ): Promise<T>;


  delete<T>(
    path: string,
    query?: Record<
      string,
      string | number | boolean
    >,
    signed?: boolean,
  ): Promise<T>;

}
