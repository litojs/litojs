export type PropsType<T> = T extends (props: infer P) => unknown ? P : never;
