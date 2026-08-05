import type {
  BinanceRestClient,
} from "./binance-rest-client";

import {
  createHmac,
} from "node:crypto";

import type {
  ExchangeConfiguration,
} from "../../types/exchange-configuration";


export class BinanceHttpClient
  implements BinanceRestClient {


  public constructor(
    private readonly configuration:
      ExchangeConfiguration,
  ) {}


  public async get<T>(
    path: string,
    query?: Record<
      string,
      string | number | boolean
    >,
    signed = false,
  ): Promise<T> {

    return this.request(
      "GET",
      path,
      query,
      signed,
    );

  }


  public async post<T>(
    path: string,
    body?: Record<
      string,
      string | number | boolean
    >,
    signed = false,
  ): Promise<T> {

    return this.request(
      "POST",
      path,
      body,
      signed,
    );

  }


  public async delete<T>(
    path: string,
    query?: Record<
      string,
      string | number | boolean
    >,
    signed = false,
  ): Promise<T> {

    return this.request(
      "DELETE",
      path,
      query,
      signed,
    );

  }


  private buildQueryString(
    parameters?: Record<
      string,
      string | number | boolean
    >,
  ): string {

    if (!parameters) {

      return "";

    }

    return new URLSearchParams(
      Object.entries(
        parameters,
      ).map(
        ([key, value]) => [
          key,
          String(value),
        ],
      ),
    ).toString();

  }


  private buildUrl(
    path: string,
    parameters?: Record<
      string,
      string | number | boolean
    >,
  ): string {

    const url =
      new URL(
        path,
        this.configuration.restBaseUrl,
      );

    const query =
      this.buildQueryString(
        parameters,
      );

    if (query) {

      url.search = query;

    }

    return url.toString();

  }


  private createTimestamp(): number {

    return Date.now();

  }
  private createSignature(
  payload: string,
): string {

  return createHmac(
    "sha256",
    this.configuration.apiSecret,
  )
    .update(payload)
    .digest("hex");

}

  private createHeaders(): Headers {

    const headers =
      new Headers();

    headers.set(
      "X-MBX-APIKEY",
      this.configuration.apiKey,
    );

    return headers;

  }


  private async request<T>(
    method: "GET" | "POST" | "DELETE",
    path: string,
    parameters?: Record<
      string,
      string | number | boolean
    >,
    signed = false,
  ): Promise<T> {

    const requestParameters = {
      ...(parameters ?? {}),
    };

    if (signed) {

      requestParameters.timestamp =
        this.createTimestamp();

      const payload =
        this.buildQueryString(
          requestParameters,
        );

      requestParameters.signature =
        this.createSignature(
          payload,
        );

    }

    const url =
      this.buildUrl(
        path,
        requestParameters,
      );

    const response =
      await fetch(
        url,
        {
          method,
          headers:
            this.createHeaders(),
        },
      );

    if (!response.ok) {

      throw new Error(
        `HTTP ${response.status}`,
      );

    }

    return await response.json() as T;

  }

}
