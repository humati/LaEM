import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface IPost {
  active: boolean;
  pid: string;
  title: string;
  sapo: string;
  thumb: string;
  contentBody: Array<IPPostContent>;
}
// export interface IPostData {
//   title: string;
//   sapo: string;
//   thumb: string;
//   contentBody: Array<IPPostContent>;
// }
export interface IPPostContent {
  text: string;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsCollection: AngularFirestoreCollection<IPost>;
  constructor(private readonly afs: AngularFirestore) {
    this.postsCollection = afs.collection<IPost>('posts');
  }

  getPosts() {
    return this.postsCollection.valueChanges({ idField: 'pid' });
  }

  addPost() {
    const pid = this.afs.createId();
    const active: boolean = false;
    const title: string = 'Tiêu Đề';
    const sapo: string = 'Sapo';
    const thumb: string = '';
    const contentBody: Array<IPPostContent> = [];
    const post: IPost = { pid, title, thumb, sapo, contentBody, active };
    return new Observable((addPostObserver) => {
      this.postsCollection.add(post).then((result) => {
        console.log(result);
        addPostObserver.next(true);
        addPostObserver.complete();
      });
    });
  }

  updatePost(post: IPost) {}

  deletePost(postId: string) {}
}
