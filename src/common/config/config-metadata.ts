export interface Config {
    memory: {
        min: number,
        max: number
      },
      account: {
        username: string,
        type: "offline" | "mojang" | "microsoft"
      }
  }