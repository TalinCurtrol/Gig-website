package usydhelper.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import usydhelper.service.CommentService;
import org.springframework.web.bind.annotation.*;
import usydhelper.entity.dto.Comment;
import usydhelper.entity.dto.User;
import usydhelper.entity.vo.*;
import usydhelper.service.AdminService;
import usydhelper.service.CommentService;
import usydhelper.service.PostService;
import usydhelper.service.UserService;
import usydhelper.utils.result.R;
import java.util.List;

@RestController
@CrossOrigin
public class CommentController {

    @Autowired
    private CommentService commentService;

//    @GetMapping("/commentlist")
//    public R getComments() {
//        List<CommentVO> commentVOList = commentService.getAllComments();
//        return R.ok().data("comments", commentVOList);
//    }


    @DeleteMapping("/deleteComment/{commentId}")
    public R deleteCommentById(@PathVariable Integer commentId) {
        commentService.deleteACommentById( commentService.getCommentById(commentId));
        return R.ok();
    }

    @PostMapping("/saveComment")
    public R saveComment(@RequestBody CommentVO commentVO) {// no need of ID, ID can be null
       commentService.saveAComment(commentVO);
        return R.ok();
    }

    @PostMapping("/updateComment") // whatever you modified, all information needed, including what was not changed
    public R updateComment(@RequestBody CommentVO commentVO) {// need a comment ID
        commentService.updateAComment(commentVO);
        return R.ok();
    }
}
