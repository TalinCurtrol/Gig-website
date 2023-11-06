package usydhelper.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import usydhelper.entity.dto.Comment;
import usydhelper.entity.dto.User;
import usydhelper.entity.vo.*;
import usydhelper.service.AdminService;
import usydhelper.service.CommentService;
import usydhelper.service.PostService;
import usydhelper.service.UserService;
import usydhelper.utils.result.R;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
public class AdminController {

    @Autowired
    private AdminService adminService;
    @Autowired
    private PostService postService;
    @Autowired
    private CommentService commentService;
    @Autowired
    private UserService userService;
    //login
    @PostMapping("/adminlogin")
    public R login(@RequestBody AdminVO adminVO) {
        return adminService.checkCredentials(adminVO);
    }
    //manage users
    @GetMapping("/userlist")
    public R getAllUsers(){
        List<UserVO> allUsers = userService.getAllUsers();
        return R.ok().data("users", allUsers);}
    @GetMapping("/searchuser/string={s}")
    public R searchUserByString(@PathVariable String s){
        List<UserVO> userVOS=userService.searchUserNameIdNumberEmail(s);
        return R.ok().data("users", userVOS);
    }
    //manage posts
    @GetMapping("/postlist")
    public R getAllposts(){
        List<AdminPostVO> allPosts = postService.getAllAdminPostVOs();
        return R.ok().data("posts", allPosts);
    }

    @GetMapping("/searchpost/string={s}")
    public R getPostByKeyword(@PathVariable String s){
        List<AdminPostVO> adminPostVOS=postService.getPostByKeyword(s);
        return R.ok().data("posts", adminPostVOS);
    }
    //manage comments
    @GetMapping("/commentlist")
    public R getComments(){
        List<CommentVO> commentVOS=commentService.getAllComments();
        return R.ok().data("comments",commentVOS);
    }

    @GetMapping("/commentlist/postid={postId}")
    public R getCommentsByPostId(@PathVariable Integer postId){
        List<CommentVO> commentVOS=commentService.getCommentByRequestId(postId);
        return R.ok().data("comments",commentVOS);
    }
    @GetMapping("/commentlist/userid={userId}")
    public R getCommentsByUserId(@PathVariable Integer userId){
        List<CommentVO> commentVOS_sended=commentService.getCommentByUserId(userId);
        List<CommentVO> commentVOS_replyed=commentService.getCommentByCommentUserId(userId);
        return R.ok().data("comments_sended",commentVOS_sended).data("comments_replyed",commentVOS_replyed);
    }

    @GetMapping("/commentsearch/string={keyword}")
    public R getCommentsByKeyword(@PathVariable String keyword){
        List<CommentVO> commentVOS=commentService.getCommentByKeywords(keyword);
        return R.ok().data("comments",commentVOS);
    }


    //about blocked users
    @GetMapping("/blockedusers")
    public R getAllBlockedUsers(){
        List<BlockedUserVO> blockedUserVOS=adminService.getAllBlocks();
        return R.ok().data("blockedusers",blockedUserVOS);
    }

    @PostMapping("/banauser")
    public R banAUser(@RequestBody BlockedUserVO blockedUserVO){
        //in blockedUserVO, blockState is a pure note
        adminService.banAUser(blockedUserVO.getUserid(),blockedUserVO.getBlockState());
        return R.ok();
    }

    @PostMapping("/suspendauser")
    public R suspendAUser(@RequestBody BlockedUserVO blockedUserVO){
        //in blockedUserVO, blockState is a pure note
        adminService.suspendAUser(blockedUserVO.getUserid(),blockedUserVO.getBlockState());
        return R.ok();
    }

    @PostMapping("/releaseauser")
    public R releaseAUser(@RequestBody Integer userId){

        adminService.releaseAUser(userId);
        return  R.ok();
    }

    @GetMapping("/checkuserblocked/userid={id}")
    public R checkUserBlocked(@PathVariable int id){
        return  R.ok().data("ifblocked",adminService.checkBlocked(id));
    }


}
