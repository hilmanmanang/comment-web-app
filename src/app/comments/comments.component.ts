import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../service/post.service';
import { Post } from '../model/post.model';
import { Comment } from '../model/comment.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})

export class CommentsComponent implements OnInit {
    postId: string = '';
    post: Post | undefined;
    loading: boolean = true;
    comments: Comment[] = [];
    commentsFilter: Comment[] = [];
    searchForm: FormGroup;


    constructor(
        private route: ActivatedRoute,
        private postService: PostService
    ) {
        this.searchForm = new FormGroup({
            name: new FormControl(''),
            email: new FormControl(''),
            body: new FormControl(''),
        })
    }

    ngOnInit(): void {
        this.route.params.subscribe((param: any) => {
            this.postId = param.id
            this.getPostById(this.postId)
            this.getCommentsById(this.postId)
        })      
    }

    getPostById(id: string): void {
        this.postService.getPostById(id).subscribe((response: Post) => {
            this.post = response
            this.loading = false;
        }, error => {
            console.error(error)
        })
    }

    getCommentsById(id: string): void {
        this.postService.getCommentsByPostId(id).subscribe((response: Comment[]) => {
            this.comments = response
            this.commentsFilter = response
        }, error => {
            console.error(error)
        })
    }

    searchResult(): void {
        const { value } = this.searchForm
        this.commentsFilter = this.comments.filter((comment: Comment) => {
            const equalBody = this.upper(comment.body).includes(this.upper(value.body));
            const equalName = this.upper(comment.name).includes(this.upper(value.name));
            const equalEmail = this.upper(comment.email).includes(this.upper(value.email));

            return equalBody && equalName && equalEmail
        })
    }

    upper(input: string): string {
        return input.toUpperCase() || '';
    }

    clearSearch(): void {
        this.commentsFilter = this.comments
        this.searchForm = new FormGroup({
            name: new FormControl(''),
            email: new FormControl(''),
            body: new FormControl(''),
        })
    }
}
