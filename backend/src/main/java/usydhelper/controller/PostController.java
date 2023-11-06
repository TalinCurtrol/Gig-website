package usydhelper.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import usydhelper.entity.vo.*;
import usydhelper.service.PostService;
import usydhelper.utils.result.R;

import java.util.List;

@RestController
@CrossOrigin
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping("/posts/{userId}")
    public R getAvailablePosts(@PathVariable Integer userId) {
        List<HomePagePost> allPosts = postService.getAllPosts(userId);
        return R.ok().data("posts", allPosts);
    }

    @GetMapping("/tasks/{userId}")
    public R getTasksByUserId(@PathVariable Integer userId) {
        TasksVO tasks = postService.getTasksVOByUserId(userId);
        return R.ok().data("tasks", tasks);
    }

    @PostMapping("/newPost")
    public R postNewPost(@RequestBody PostVO postVO) {
        return postService.saveNewPost(postVO);
    }

    @PostMapping("/applyPost")
    public R postApplyPost(@RequestBody PendingAcceptersVO pendingAcceptersVO) {
        return postService.addPendingAccepter(pendingAcceptersVO);
    }

    @DeleteMapping("/deletePost/{postId}")
    public R deletePostById(@PathVariable Integer postId) {
        postService.deletePostById(postId);
        return R.ok();
    }

    @GetMapping("/detail/{postId}")
    public R getPostDetail(@PathVariable Integer postId) {
        PostDetailVO postDetailVO = postService.getPostDetailById(postId);
        return R.ok().data("detail", postDetailVO);
    }

    @PostMapping("/updatepost")
    public R updateAPost(@RequestBody PostDetailVO postDetailVO) {
        postService.updateAPost(postDetailVO);
        return R.ok();
    }

    @PostMapping("/editTask")
    public R editTask(@RequestBody NewTaskVo task) {
        postService.editTask(task);
        return R.ok();
    }

}
