import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from "@angular/fire/firestore";
import { Observable, ObservableInput } from "rxjs";
import { map, take } from "rxjs/operators";
import { HeartPoints, Log, Task } from "../models/app.context";
import {
  APPDATA_COLLECTION_ID,
  LOG_COLLECTION_ID,
  POINTS_ID,
  TASK_COLLECTION_ID,
} from "../models/constants";

@Injectable({
  providedIn: "root",
})
export class DataService {
  private tasks: Observable<Task[]>;
  private appData: Observable<any>;
  private logs: Observable<Log[]>;

  private tasksCollection: AngularFirestoreCollection<Task>;
  private appDataCollection: AngularFirestoreCollection<any>;
  private logsCollection: AngularFirestoreCollection<Log>;

  constructor(private afs: AngularFirestore) {
    this.tasksCollection = this.afs.collection<Task>(TASK_COLLECTION_ID);
    this.tasks = this.tasksCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    this.appDataCollection = this.afs.collection<any>(APPDATA_COLLECTION_ID);
    this.appData = this.appDataCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    this.logsCollection = this.afs.collection<Log>(LOG_COLLECTION_ID);
    this.logs = this.logsCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getTasks(): Observable<Task[]> {
    return this.tasks;
  }

  getTasksByStatus(status): Observable<Task[]> {
    return this.afs
      .collection<Task>("tasks", (ref) =>
        ref.where("isCompleted", "==", status)
      )
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  getTasksByUsername(username, status): Observable<Task[]> {
    return this.afs
      .collection<Task>("tasks", (ref) =>
        ref
          .where("assignedTo", "==", username)
          .where("isCompleted", "==", status)
      )
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  getTask(id: string): Observable<Task> {
    return this.tasksCollection
      .doc<Task>(id)
      .valueChanges()
      .pipe(
        take(1),
        map((task) => {
          task.id = id;
          return task;
        })
      );
  }

  addTask(task: Task): Promise<DocumentReference> {
    return this.tasksCollection.add({ ...task });
  }

  updateTask(task: Task): Promise<void> {
    return this.tasksCollection.doc(task.id).update(task);
  }

  deleteTask(id: string): Promise<void> {
    return this.tasksCollection.doc(id).delete();
  }

  UpdateHeartPoints(hp) {
    let heartpoints = new HeartPoints();
    heartpoints.value = hp;
    heartpoints.modifyDate = new Date();
    try {
      const appref = this.appDataCollection.doc(POINTS_ID);
      appref.ref.get().then((docSnapshot) => {
        if (docSnapshot.exists) {
          return this.appDataCollection
            .doc(POINTS_ID)
            .update({ ...heartpoints });
        } else {
          return this.appDataCollection.doc(POINTS_ID).set({ ...heartpoints });
        }
      });
      return true;
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }

  UpdateHeartPoints1(hpChange: number) {
    try {
      const appref = this.appDataCollection.doc(POINTS_ID);
      appref.ref.get().then((docSnapshot) => {
        if (docSnapshot.exists) {
          return this.appDataCollection
            .doc<HeartPoints>(POINTS_ID)

            .valueChanges()
            .subscribe((hp: HeartPoints) => {
              hp.value = hp.value + hpChange;
              hp.modifyDate = new Date();
              this.appDataCollection.doc(POINTS_ID).update({ ...hp });
            });
        }
      });
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }

  getHeartPoints() {
    return this.appDataCollection.doc<HeartPoints>(POINTS_ID).valueChanges();
  }

  logMessage(message: string) {
    let log = new Log();
    log.message = message;
    log.date = new Date();
    return this.logsCollection.add({ ...log });
  }

  getLogs(): Observable<Log[]> {
    return this.logs;
  }
}
