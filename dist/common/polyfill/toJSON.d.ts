interface IPlainObject<V> {
    [key: string]: V;
}
interface Map<K, V> {
    toJSON(): IPlainObject<V>;
}
interface Set<T> {
    toJSON(): T[];
}
