package usydhelper.service;

import usydhelper.entity.dto.Post;
import usydhelper.entity.vo.*;
import usydhelper.utils.result.R;

import java.util.List;

public interface PostService {

    List<HomePagePost> getAllPosts(Integer userId);

    List<AdminPostVO> getAllAdminPostVOs();

    TasksVO getTasksVOByUserId(Integer userId);

    R saveNewPost(PostVO postVO);

    void updateAPost(PostDetailVO postDetailVO);

    R addPendingAccepter(PendingAcceptersVO pendingAcceptersVO);

    void deletePostById(Integer postId);

    PostDetailVO getPostDetailById(Integer postId);

    List<AdminPostVO> getPostByKeyword(String keyword);

    void editTask(NewTaskVo task);
}
