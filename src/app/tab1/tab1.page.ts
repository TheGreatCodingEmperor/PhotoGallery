import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import * as ics from 'ics';
import { SystemAlertWindowPermission } from '@awesome-cordova-plugins/system-alert-window-permission/ngx';
// import { HTTP } from '@awesome-cordova-plugins/http/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {
  localDB: SQLiteObject;
  datas: any = [];
  fileTransfer: FileTransferObject;

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private file: File,
    private transfer: FileTransfer,
    private localNotifications: LocalNotifications,
    private androidPermissions: AndroidPermissions,
    private systemAlertWindowPermission: SystemAlertWindowPermission,
    // private nativeHTTP: HTTP,
    private cdref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.localNotifications.schedule({
      id: 1,
      text: 'Single ILocalNotification',
      sound: null,
      // data: { secret: key }
    });

    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {

          this.localDB = db;
          db.executeSql('CREATE TABLE IF NOT EXISTS danceMoves(name VARCHAR(32))', [])
            .then(() => console.log('Executed SQL'))
            .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
    });
  }

  ngOnDestroy(): void {
    if (this.fileTransfer) {
      this.fileTransfer.abort();
    }
  }

  select() {
    this.localDB.executeSql(`SELECT * FROM "danceMoves"`, []).then(res => {
      alert("query success2")
      alert(JSON.stringify(res))
      console.log(res);
      for (let i = 0; i < res.rows.length; i++) {
        let item = res.rows.item(i);
        console.log(item);
        // do something with it

        this.datas.push(item);
      }
      this.cdref.detectChanges();
    }).catch((err) => {
      alert(JSON.stringify(err))
      alert("query failed")
      console.log(err)
    })
  }

  insert(text: string) {
    alert('insert')
    this.localDB.executeSql(`INSERT INTO "main"."danceMoves"("name") VALUES (?);`, [text]).then(res => {
      console.log(res);
      alert("insert success")
    }).catch(err => {
      console.log(err);
      alert(JSON.stringify(err))
      alert("insert failed")
    })
  }

  download() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.INTERNET).then(res => {
      this.downloadFile();
    }, err => {
      console.log(err);
    });
  }

  downloadFile() {
    ics.createEvent({
      title: 'Dinner',
      description: 'Nightly thing I do',
      busyStatus: 'FREE',
      start: [2018, 1, 15, 6, 30],
      duration: { minutes: 50 }
    }, (error, value) => {
      if (error) {
        console.log(error)
      }

      let text = value;
      this.platform.ready().then(
        () => {
          const url = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text);
          this.fileTransfer = this.transfer.create();
          console.log(url)
          this.fileTransfer.download(url, this.file.dataDirectory + 'my-notify.ics').then((entry) => {
            console.log('download complete: ' + entry.toURL());
          }, (error) => {
            // handle error
            console.log(error)
          });
          // this.nativeHTTP.downloadFile(url, {}, {}, this.file.dataDirectory + 'my-notify.ics').then((entry) => {
          //   console.log('download complete: ' + entry.toURL());
          // }, (error) => {
          //   // handle error
          //   console.log(error)
          // });
        }
      ).catch(err => {
        console.log(err)
      });
    })
  }
}
