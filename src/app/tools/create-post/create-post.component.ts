import { Component, OnInit } from '@angular/core';

import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/FirebaseTSFirestore';
import { FirebaseTSStorage } from 'firebasets/FirebasetsStorage/FirebaseTSStorage';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/FirebaseTSAuth';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  selectedImageFile: File;
  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  storage = new FirebaseTSStorage();

  constructor() {}

  ngOnInit(): void {}

  onPostClicked(commentInput: HTMLTextAreaElement) {
    let comment = commentInput.value;
    let postId = this.firestore.genDocId()
    this.storage.upload({
      uploadName: "upload Image Post",
      path: ["Posts",postId,"image"],
      data: { data: this.selectedImageFile}, onComplete: (downloadUrl) => {
        alert(downloadUrl)
      }
    })
  }

  onPhotoSelected(photoSelector: HTMLInputElement) {
    this.selectedImageFile = photoSelector.files[0];
    if (!this.selectedImageFile) return;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.selectedImageFile);
    fileReader.addEventListener('loadend', (ev) => {
      let readableString = fileReader.result.toString();
      let postPreviewImage = <HTMLImageElement>(
        document.getElementById('post-preview-image')
      );
      postPreviewImage.src = readableString;
    });
  }
}
