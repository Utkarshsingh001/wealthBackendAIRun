import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { firebaseServiceAccount } from '../config/firebase-service-account';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private firebaseApp: admin.app.App;

  onModuleInit() {
    if (!admin.apps.length) {
      this.firebaseApp = admin.initializeApp({
        credential: admin.credential.cert(firebaseServiceAccount as ServiceAccount),
      });
    }
  }

  getAuth(): admin.auth.Auth {
    return admin.auth();
  }

  getFirestore(): admin.firestore.Firestore {
    return admin.firestore();
  }

  getStorage(): admin.storage.Storage {
    return admin.storage();
  }

  getApp(): admin.app.App {
    return this.firebaseApp;
  }
}
