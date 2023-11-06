package usydhelper.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;
import usydhelper.controller.PostController;
import usydhelper.dao.PostRepository;
import usydhelper.entity.dto.Post;
import usydhelper.entity.vo.NewTaskVo;
import usydhelper.entity.vo.PendingAcceptersVO;
import usydhelper.entity.vo.PostDetailVO;
import usydhelper.entity.vo.PostVO;
import usydhelper.utils.result.R;

import java.util.Optional;

@SpringBootTest
class PostTest {

    @Autowired
    PostController postController;
    @Autowired
    PostRepository postRepository;

    @Test
    public void testQueryPostsPositive() {
        R r1 = postController.getAvailablePosts(1);
        Assert.isTrue(r1.getSuccess(), "getAvailablePosts failed");
        R r2 = postController.getTasksByUserId(1);
        Assert.isTrue(r2.getSuccess(), "getTasksByUserId failed");
        R r3 = postController.getPostDetail(1);
        Assert.isTrue(r3.getSuccess(), "getPostDetail failed");
    }

    @Test
    public void testQueryPostsNegativeAndEdge() {
        R r1 = postController.getAvailablePosts(-1);
        Assert.isTrue(r1.getSuccess(), "getAvailablePosts failed");
        R r2 = postController.getTasksByUserId(-1);
        Assert.isTrue(r2.getSuccess(), "getTasksByUserId failed");
        R r3 = postController.getPostDetail(-1);
        Assert.isTrue(r3.getSuccess(), "getPostDetail failed");
    }

    @Test
    public void testEditPositive() {
        Optional<Post> optionalPost = postRepository.findById(1);
        if (optionalPost.isPresent()) {
            NewTaskVo vo = new NewTaskVo();
            BeanUtils.copyProperties(optionalPost.get(), vo);
            vo.setMarkerIsVisible(false);
            R r = postController.editTask(vo);
            Assert.isTrue(r.getSuccess(), "editTask positive failed");
        }
    }

    @Test
    public void testEditNegativeAndEdge() {
        NewTaskVo vo = new NewTaskVo();
        vo.setId(-1);
        R r = postController.editTask(vo);
        Assert.isTrue(r.getSuccess(), "editTask negative failed");
    }

    @Test
    public void testCreatePost() {
        PostVO postVO = new PostVO();
        postVO.setTitle("Title Test");
        postVO.setReward("Reward Test");
        postVO.setDescription("Testing");
        postVO.setMarkerIsVisible(true);
        R r = postController.postNewPost(postVO);
        Assert.isTrue(r.getSuccess(), "postNewPost failed");
    }

    @Test
    public void testDeletePost() {
        Post tmp = postRepository.save(new Post());
        R r = postController.deletePostById(tmp.getId());
        Assert.isTrue(r.getSuccess(), "deletePostById failed");
    }

    @Test
    public void testCreateAppending() {
        PendingAcceptersVO vo = new PendingAcceptersVO();
        vo.setPostId(100);
        vo.setUserId(100);
        R r = postController.postApplyPost(vo);
        Assert.isTrue(r.getSuccess(), "postApplyPost failed");
    }

    @Test
    public void testUpdatePost() {
        Optional<Post> optionalPost = postRepository.findById(1);
        if (optionalPost.isPresent()) {
            PostDetailVO vo = new PostDetailVO();
            BeanUtils.copyProperties(optionalPost.get(), vo);
            R r = postController.updateAPost(vo);
            Assert.isTrue(r.getSuccess(), "updateAPost failed");
        }
    }

}