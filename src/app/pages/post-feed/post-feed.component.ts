import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from 'src/app/tools/create-post/create-post.component';
import {
  FirebaseTSFirestore,
  Limit,
  OrderBy,
  Where,
} from 'firebasets/firebasetsFirestore/FirebaseTSFirestore';
import { BehaviorSubject, Observable } from 'rxjs';


@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostFeedComponent implements OnInit {
  firestore = new FirebaseTSFirestore();

  posts$ = new BehaviorSubject<PostData[]>([]);

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getPosts();
  }

  onCreatePostClick() {
    this.dialog.open(CreatePostComponent);
  }

  getPosts() {
    const newarray = [];
    this.firestore.getCollection({
      path: ['Posts'],
      where: [new OrderBy('timestamp', 'desc'), new Limit(10)],
      onComplete: (result) => {
        result.docs.forEach((doc) => {
          let post = <PostData>doc.data();
          post.postId = doc.id;
          // debugger
          newarray.push(post);
        });
        this.posts$.next(newarray);
      },
      onFail: (error) => {},
    });
  }
}

export interface PostData {
  comment: string;
  creatorId: string;
  imageUrl?: string;
  postId: string;
}
