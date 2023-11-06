package usydhelper.service.impl;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import usydhelper.dao.PendingConfirmRepository;
import usydhelper.dao.PostRepository;
import usydhelper.entity.dto.PendingConfirm;
import usydhelper.entity.dto.Post;
import usydhelper.entity.vo.ConfirmVo;
import usydhelper.service.ConfirmTaskCompleteService;

import java.util.Optional;

@Service
public class ConfirmTaskCompleteServiceImpl implements ConfirmTaskCompleteService {

    @Autowired
    private PendingConfirmRepository pendingConfirmRepository;
    @Autowired
    private PostRepository postRepository;


    @Override
    public void savePendingConfirm(ConfirmVo vo) {
        PendingConfirm pendingConfirm = new PendingConfirm();
        BeanUtils.copyProperties(vo, pendingConfirm);
        pendingConfirmRepository.save(pendingConfirm);
    }

    @Override
    public void confirmComplete(ConfirmVo vo) {
        Optional<Post> postById = postRepository.findById(vo.getPostId());
        if (postById.isPresent()) {
            Post post = postById.get();
            post.setStateId(2);
            postRepository.save(post);
        }
    }
}
