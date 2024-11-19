interface BaseConfig {
    apps: string[];
}

interface PostgresConfig extends BaseConfig {
    db: "postgres";
    dbConfig: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
    };
}

interface SqliteConfig extends BaseConfig {
    db: "sqlite";
    dbConfig: {
        uri: string;
    };
}

export type Configuration = PostgresConfig | SqliteConfig;
