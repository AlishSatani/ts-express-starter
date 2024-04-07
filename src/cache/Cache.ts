import { createClient, RedisClientType } from "redis";
import { generateCacheKey } from "./generateCacheKey";

const cacheExpiration = 60 * 60 * 4; //* seconds * minutes * hours | 4 hours

export class Cache {
  private client: RedisClientType;
  private static instance: Cache;

  constructor() {
    if (!process.env.REDIS_URL || !process.env.REDIS_PASSWORD)
      throw new Error("Misconfiguration: no REDIS_URL or REDIS_PASSWORD");

    this.client = createClient({
      url: process.env.REDIS_URL,
      // password: process.env.REDIS_PASSWORD,
    });

    this.connect();
  }

  //! use single cache instance through out whole server
  static getInstance() {
    if (!this.instance) {
      this.instance = new Cache();
    }

    return this.instance;
  }

  async connect() {
    try {
      if (!this.client.isOpen) await this.client.connect();
    } catch (error) {
      console.error("REDIS CONNECT: ", error);
    }
  }

  async disconnect() {
    try {
      if (this.client.isOpen) await this.client.disconnect();
    } catch (error) {
      console.error("REDIS DISCONNECT: ", error);
    }
  }

  async get<T>(key: string) {
    const value = await this.client.get(key);

    if (!value) return null;

    return JSON.parse(value) as T;
  }

  set(key: string, value: any, expirationTime: number = cacheExpiration) {
    return this.client.set(key, JSON.stringify(value), {
      EX: expirationTime,
    });
  }

  async withCache<T>(
    f: (...args: any[]) => Promise<T>,
    keyConfig: Array<string | number | undefined | boolean>,
    expirationTime?: number
  ) {
    const cacheKey = generateCacheKey(keyConfig);

    return async (...args) => {
      try {
        if (!this.client.isOpen) {
          await this.client.connect();
        }

        const response = await this.get<T>(cacheKey);

        if (response) return response;
      } catch (error) {
        console.log("Cache Error: ", error);
      }

      return f(...args).then(async (response) => {
        if (!this.client.isOpen) return response;

        if (response) await this.set(cacheKey, response, expirationTime);

        return response;
      });
    };
  }
}
