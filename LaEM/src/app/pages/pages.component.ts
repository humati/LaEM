import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { IPost, IPPostContent } from '../services/post.service';
// export interface IPost {
//   title: string;
//   sapo: string;
//   thumb: string;
//   contentBody: Array<IPPostContent>;
// }

// export interface IPPostContent {
//   text: string;
//   type: string;
// }

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  @ViewChild('post', { static: false }) divPost: ElementRef;
  private postId: string = '';
  private postDoc: AngularFirestoreDocument<IPost> =
    {} as AngularFirestoreDocument<IPost>;
  post: IPost;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    let self = this;
    self.route.params.subscribe((params) => {
      self.postId = params.postId;
      console.log(self.postId);
      self.postDoc = self.afs.doc<IPost>(`posts/${self.postId}`);
      // self.postDoc = self.afs.doc<Post>(`post/p7C6AW8IaxT6C1wFP43t`);
      console.log(self.postDoc);
      self.loadData();
    });
  }

  loadData() {
    let self = this;
    self.postDoc.get().subscribe((result) => {
      if (result.data()) {
        self.post = result.data();

        if (self.post.title) {
          self.createHeader();
        }

        if (self.post.sapo) {
          self.createSapo();
        }

        if (self.post.contentBody.length > 0) {
          self.post.contentBody.forEach((content: IPPostContent) => {
            this.createPostContent(content);
          });
        }
      }
    });
  }

  createHeader() {
    console.log('header');
    console.log(this.divPost.nativeElement);

    const h1 = this.renderer.createElement('h1');
    const title = this.renderer.createText(this.post.title);

    this.renderer.appendChild(h1, title);
    this.renderer.appendChild(this.divPost.nativeElement, h1);

    this.renderer.addClass(h1, 'text-center');
  }

  createSapo() {
    console.log('sapo');
    const sapo = this.renderer.createElement('p');
    const sapoText = this.renderer.createText(this.post.sapo);

    this.renderer.appendChild(sapo, sapoText);
    this.renderer.appendChild(this.divPost.nativeElement, sapo);

    this.renderer.addClass(sapo, 'sapo');
  }

  createPostContent(post: IPPostContent) {
    console.log('post content');
    if (post.type == 'img') {
      this.createImg(post.text);
    } else {
      this.createPostText(post);
    }
  }

  createImg(imgSource: string) {
    const imgParentTag = this.renderer.createElement('div');

    const img = this.renderer.createElement('img');
    this.renderer.setAttribute(img, 'src', imgSource);

    const imgComment = this.renderer.createElement('p');
    this.renderer.addClass(imgComment, 'text-center');
    this.renderer.addClass(imgComment, 'sapo');

    this.renderer.appendChild(imgParentTag, img);
    this.renderer.appendChild(imgParentTag, imgComment);

    this.renderer.appendChild(this.divPost.nativeElement, imgParentTag);
  }

  createPostText(post: IPPostContent) {
    const postType = this.renderer.createElement(post.type);
    const postText = this.renderer.createText(post.text);

    this.renderer.appendChild(postType, postText);
    this.renderer.appendChild(this.divPost.nativeElement, postType);
  }
}
