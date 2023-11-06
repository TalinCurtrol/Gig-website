package usydhelper.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import usydhelper.controller.CommentController;
import usydhelper.dao.CommentRepository;
import usydhelper.entity.dto.Comment;
import usydhelper.entity.vo.CommentVO;

import java.util.Date;

@SpringBootTest
public class CommentTest {

    @Autowired
    CommentController commentController;
    @Autowired
    CommentRepository repository;

    @Test
    public void testDelete() {
        Comment comment = new Comment();
        comment.setCommentedTime(new Date());
        comment.setContent("123");
        comment.setUserId(1);
        comment.setRequestId(1);
        Comment save = repository.save(comment);
        commentController.deleteCommentById(save.getId());
    }

    @Test
    public void testSaveComment() {
        CommentVO vo = new CommentVO();
        vo.setUserId(1);
        vo.setRequestId(1);
        vo.setContent("123");
        commentController.saveComment(vo);
    }

    @Test
    public void testUpdateComment() {
        Comment comment = new Comment();
        comment.setCommentedTime(new Date());
        comment.setContent("123");
        comment.setUserId(1);
        comment.setRequestId(1);
        Comment save = repository.save(comment);
        CommentVO commentVO = new CommentVO();
        BeanUtils.copyProperties(comment, commentVO);
        commentController.updateComment(commentVO);
    }
}
