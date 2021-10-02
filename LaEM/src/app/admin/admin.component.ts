import { IPost, IPPostContent, PostService } from './../services/post.service';
import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  @ViewChild('postPreview', { static: false }) divPost: ElementRef;
  sideBarVisible: boolean = true;
  menuItems: MenuItem[];

  posts: IPost[] = [];
  selectedPost: IPost;

  // UPLOAD IMG
  isUploading: boolean = false;
  uploadImg: File;
  constructor(private postService: PostService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.menuItems = [
      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
        command: () => {
          this.createPost();
        },
      },
    ];
    this.loadData();
  }

  loadData() {
    this.postService.getPosts().subscribe((values) => {
      this.posts = values;
      // console.log(this.posts);
    });
  }

  createPost() {
    this.postService.addPost().subscribe();
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

  editPost(post: IPost) {
    this.selectedPost = JSON.parse(JSON.stringify(post));
    this.menuItems = [
      {
        label: 'Thêm hình',
        icon: 'pi pi-fw pi-plus',
        command: () => {
          this.addPostContent('img');
        },
      },
      {
        label: 'Thêm tiêu đề',
        icon: 'pi pi-fw pi-plus',
        command: () => {
          this.addPostContent('h2');
        },
      },
      {
        label: 'Thêm nội dung',
        icon: 'pi pi-fw pi-plus',
        command: () => {
          this.addPostContent('p');
        },
      },
    ];
  }

  addPostContent(contentType: string) {
    let newContent: IPPostContent = {
      text: '',
      type: contentType,
    };
    this.selectedPost.contentBody.push(newContent);
  }

  deletePostContent(index: number) {
    this.selectedPost.contentBody.splice(index, 1);
  }
  // START UPLOAD
  imgUploadSelected(event: any) {
    this.uploadImg = event.target.files[0];
    console.log(this.uploadImg);
  }

  uploadImgToStorage() {
    // const firebaseStorageRef = firebase.storage().ref();
    // const task = firebaseStorageRef.child(name).put(fileToUpload);
  }
  // END UPLOAD
}
