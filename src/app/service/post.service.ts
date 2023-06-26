import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../model/post.model';
import { Comment } from '../model/comment.model';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    postsApi = 'https://jsonplaceholder.typicode.com/posts';
    commentsApi = 'https://jsonplaceholder.typicode.com/comments'

    constructor(
        private httpClient: HttpClient
    ) { }

    getAllPosts(): Observable<Post[]> {
        return this.httpClient.get<Post[]>(this.postsApi)
    }

    getPostById(id: string): Observable<Post> {
        return this.httpClient.get<Post>(`${this.postsApi}/${id}`)
    }

    getCommentsByPostId(postId: string): Observable<Comment[]> {
        return this.httpClient.get<Comment[]>(this.commentsApi, { params: { postId } })
    }

}
