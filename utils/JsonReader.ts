import fs from "fs";
import path from "path";

export type EnvConfig = {
  [x: string]: any;
  baseUrl: string;
  timeout: number;
};

export class JsonReader {
  private static cache: Record<string, any> = {};

  private static readFile<T>(relativePath: string): T {
    const absolutePath = path.resolve(process.cwd(), relativePath);

    if (!fs.existsSync(absolutePath)) {
      throw new Error(`File not found: ${absolutePath}`);
    }

    if (!this.cache[absolutePath]) {
      const raw = fs.readFileSync(absolutePath, "utf-8");
      this.cache[absolutePath] = JSON.parse(raw);
    }

    return this.cache[absolutePath] as T;
  }

  // inside JsonReader class
  static getData<T>(relativePath: string): T {
    return this.readFile<T>(relativePath);
  }

  // ✅ getEnv method
  static getEnv(envName?: string): EnvConfig {
    // Use CLI ENV or default 'dev'
    const key = envName?.trim() || process.env.ENV || "dev";

    const data = this.readFile<Record<string, EnvConfig>>("test-data/enviroments.json");

    if (!data[key]) {
      throw new Error(
        `Environment '${key}' not found in JSON. Available: ${Object.keys(data).join(", ")}`,
      );
    }

    return data[key];
  }
}
