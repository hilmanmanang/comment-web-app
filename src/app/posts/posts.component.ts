import { Component, OnInit } from '@angular/core';
import { Post } from '../model/post.model';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
    posts: Post[] = []
    constructor(
        private postService: PostService
    ) {}

    ngOnInit(): void {
        this.getAllPosts()
    }

    getAllPosts(): void {
        this.postService.getAllPosts().subscribe((response: Post[]) => {
            this.posts = response
        }, error => {
            console.error(error)
        })
    }

}
