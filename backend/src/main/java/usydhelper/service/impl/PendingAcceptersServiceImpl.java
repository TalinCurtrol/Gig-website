package usydhelper.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import usydhelper.dao.PendingAcceptersRepository;
import usydhelper.dao.PostRepository;
import usydhelper.dao.UserRepository;
import usydhelper.entity.dto.PendingAccepters;
import usydhelper.entity.dto.Post;
import usydhelper.entity.dto.User;
import usydhelper.entity.vo.AcceptApplicantVO;
import usydhelper.entity.vo.ApplicantVO;
import usydhelper.service.PendingAcceptersService;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PendingAcceptersServiceImpl implements PendingAcceptersService {

    @Autowired
    private PendingAcceptersRepository repository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostRepository postRepository;

    @Override
    public List<ApplicantVO> getAllApplicants(Integer postId) {
        List<ApplicantVO> result = new ArrayList<>();

        Specification<PendingAccepters> specification = new Specification<>() {
            @Override
            public Predicate toPredicate(Root<PendingAccepters> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                List<Predicate> predicates = new ArrayList<>();
                Predicate p1 = cb.equal(root.get("postId"), postId);
                predicates.add(p1);
                return query.where(predicates.toArray(new Predicate[0])).getRestriction();
            }
        };
        // get all pending accepter of the post
        List<PendingAccepters> allPA = repository.findAll(specification);

        for (PendingAccepters pa : allPA) {
            Integer userId = pa.getUserId();
            Optional<User> userById = userRepository.findById(userId);
            if (userById.isPresent()) {
                ApplicantVO applicantVO = new ApplicantVO();
                applicantVO.setId(userId);
                applicantVO.setName(userById.get().getName());
                result.add(applicantVO);
            }
        }
        return result;
    }

    @Override
    public void acceptApplicant(AcceptApplicantVO vo) {
        Optional<Post> postById = postRepository.findById(vo.getPostId());
        if (postById.isPresent()) {
            Post post = postById.get();
            post.setAccepterId(vo.getUserId());
            post.setStateId(1);
            postRepository.save(post);
        }
    }
}
