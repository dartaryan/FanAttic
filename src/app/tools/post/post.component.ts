import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/FirebaseTSFirestore';
import { PostData } from 'src/app/pages/post-feed/post-feed.component';
import { ReplyComponent } from '../reply/reply.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() postData: PostData;
  firestore = new FirebaseTSFirestore();
  creatorName: string;
  creatorDescription: string;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getCreatorInfo();
  }

  onReplyClick() {
    this.dialog.open(ReplyComponent, { data: this.postData.postId });
  }

  getCreatorInfo() {
    this.firestore.getDocument({
      path: ['Users', this.postData.creatorId],
      onComplete: (result) => {
        let userDocument = result.data();
        this.creatorName = userDocument.publicName;
        this.creatorDescription = userDocument.description;
      },
    });
  }
}
