import express, { Router, Application } from 'express';

interface Options {
  port: number;
  routes: Router;
}

export class Server {
  public readonly app: Application = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  async start() {
    // Middlewares
    this.app.use( express.json());

    // Usar las rutas globales que se definieron
    this.app.use( this.routes);

    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}