import type * as admin from "firebase-admin";

export interface ConfigurationDTO {
  firebaseApp: admin.app.App;
}
