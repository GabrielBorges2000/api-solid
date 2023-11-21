export class LateCheckInValidation extends Error {
  constructor() {
    super(
      ' The check-in cal only be validated until 20 minutes of its creation.',
    )
  }
}
