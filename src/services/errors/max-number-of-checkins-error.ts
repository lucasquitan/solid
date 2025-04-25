export class MaxNumberOfCheckinsError extends Error {
  constructor() {
    super('Max amount of check-ins reached')
  }
}
