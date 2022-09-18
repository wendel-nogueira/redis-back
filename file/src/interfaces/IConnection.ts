interface IConnection {
    socket: {
        host: string;
        port: number;
    }
    password: string;
}

export { IConnection };