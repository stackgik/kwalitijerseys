export {};

declare global {
  interface Window {
    PaystackPop: {
      new (): {
        newTransaction: (options: {
          key: string;
          email: string;
          amount: number;
          currency?: string;
          metadata?: Record<string, unknown>;
          reference?: string;
          onSuccess: (response: { reference: string }) => void;
          onCancel: () => void;
        }) => void;
      };
    };
  }
}
