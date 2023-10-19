export class Future<T> {
  private readonly value: Promise<T>;
  private rejecter?: (error?: Error) => void;
  private resolver?: (value: T) => void;

  constructor() {
    this.value = new Promise<T>(this.onBind.bind(this));
    this.value.catch(() => undefined);
  }

  async getAsync() {
    return await this.value;
  }

  reject(error?: Error) {
    if (!this.rejecter) return;
    this.rejecter(error);
  }

  resolve(value: T) {
    if (!this.resolver) return;
    this.resolver(value);
  }

  private onBind(resolve: typeof this.resolver, reject: typeof this.rejecter) {
    this.resolver = resolve;
    this.rejecter = reject;
  }
}
