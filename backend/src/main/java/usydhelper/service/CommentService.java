package usydhelper.service;

import usydhelper.entity.dto.Comment;
import usydhelper.entity.vo.CommentVO;
import usydhelper.utils.result.R;

import java.util.List;

public interface CommentService {

    CommentVO CommentToCommentVO(Comment comment);
    List<CommentVO> getAllComments();
    CommentVO getCommentById(int id);
    List<CommentVO> getCommentByUserId(int userid);
    List<CommentVO> getCommentByRequestId(int requestId);
    List<CommentVO> getCommentByCommentUserId(int commentUserid);
    List<CommentVO> getCommentByKeywords(String keywords);
    void deleteACommentById(CommentVO commentVO);
    void saveAComment(CommentVO commentVO);
    void updateAComment(CommentVO commentVO);

}
