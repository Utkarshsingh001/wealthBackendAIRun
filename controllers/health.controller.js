import { secrets } from "../constants/secrets.js";

const healthCheck = () => {
    return {
        timestamp: Date(),
        env: secrets.ENV,
        profile: secrets.PROFILE,
        check: "health-check"
      };
}
export {
  healthCheck
}