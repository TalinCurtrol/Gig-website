package usydhelper.service.impl;


import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import usydhelper.dao.CommentRepository;
import usydhelper.entity.dto.Comment;
import usydhelper.entity.dto.Post;
import usydhelper.entity.vo.CommentVO;
import usydhelper.service.CommentService;
import usydhelper.utils.result.R;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;


    @Override
    public CommentVO CommentToCommentVO(Comment comment) {
        CommentVO commentvo=new CommentVO();
        BeanUtils.copyProperties(comment, commentvo);
        return commentvo;
    }

    @Override
    public List<CommentVO> getAllComments() {
        List<Comment> comments=commentRepository.findAll();
        List<CommentVO> commentvos=new ArrayList<>();
        for(Comment comment:comments){
            commentvos.add(CommentToCommentVO(comment));
        }
        return commentvos;
    }

    @Override
    public CommentVO getCommentById(int id) {
        Optional<Comment> c = commentRepository.findById(id);
        if(c.isPresent()){
            return CommentToCommentVO(c.get());
        }
        return null;
    }

    @Override
    public List<CommentVO> getCommentByUserId(int userid) {
        Specification<Comment> commentSpecification = new Specification<Comment>() {
            @Override
            public Predicate toPredicate(Root<Comment> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                List<Predicate> predicates = new ArrayList<>();
                predicates.add(cb.equal(root.get("userId"), userid));
                return query.where(predicates.toArray(new Predicate[0])).getRestriction();
            }
        };
        List<Comment> comments= commentRepository.findAll(commentSpecification);
        List<CommentVO> commentVOS=new ArrayList<>();
        for(Comment comment: comments){
            commentVOS.add(CommentToCommentVO(comment));
        }
        return commentVOS;
    }

    @Override
    public List<CommentVO> getCommentByRequestId(int requestId) {
        Specification<Comment> commentSpecification = new Specification<Comment>() {
            @Override
            public Predicate toPredicate(Root<Comment> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                List<Predicate> predicates = new ArrayList<>();
                predicates.add(cb.equal(root.get("requestId"), requestId));
                return query.where(predicates.toArray(new Predicate[0])).getRestriction();
            }
        };
        List<Comment> comments= commentRepository.findAll(commentSpecification);
        List<CommentVO> commentVOS=new ArrayList<>();
        for(Comment comment: comments){
            commentVOS.add(CommentToCommentVO(comment));
        }
        return commentVOS;
    }

    @Override
    public List<CommentVO> getCommentByCommentUserId(int commentUserid) {
        Specification<Comment> commentSpecification = new Specification<Comment>() {
            @Override
            public Predicate toPredicate(Root<Comment> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                List<Predicate> predicates = new ArrayList<>();
                predicates.add(cb.equal(root.get("commentId"), commentUserid));
                return query.where(predicates.toArray(new Predicate[0])).getRestriction();
            }
        };
        List<Comment> comments= commentRepository.findAll(commentSpecification);
        List<CommentVO> commentVOS=new ArrayList<>();
        for(Comment comment: comments){
            commentVOS.add(CommentToCommentVO(comment));
        }
        return commentVOS;
    }

    @Override
    public List<CommentVO> getCommentByKeywords(String keywords) {
        if(!keywords.equals(null)){
            Specification<Comment> commentSpecification = new Specification<Comment>() {
            @Override
            public Predicate toPredicate(Root<Comment> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                List<Predicate> predicates = new ArrayList<>();

                Predicate p=  cb.like(root.get("content"), "%"+keywords + "%");

                if (keywords.matches("[0-9]+")) {
                    Predicate p3 = cb.equal(root.get("id"), Integer.parseInt(keywords));
                    Predicate p4 = cb.equal(root.get("userId"), Integer.parseInt(keywords));
                    Predicate p5 = cb.equal(root.get("requestId"), Integer.parseInt(keywords));
                    Predicate p6 = cb.equal(root.get("commentId"), Integer.parseInt(keywords));
                    p = cb.or(p, p3);
                    p = cb.or(p, p4);
                    p = cb.or(p, p5);
                    p = cb.or(p, p6);
                }
                predicates.add(p);
                return query.where(predicates.toArray(new Predicate[0])).getRestriction();
            }
        };
            List<Comment> comments= commentRepository.findAll(commentSpecification);
            List<CommentVO> commentVOS=new ArrayList<>();
            for(Comment comment: comments){
                commentVOS.add(CommentToCommentVO(comment));
            }
           // System.out.println(commentVOS.get(0).getContent());
            return commentVOS;
        }else{
            return new ArrayList<>();
        }


    }

    @Override
    public void deleteACommentById(CommentVO commentVO) {
            commentRepository.deleteById(commentVO.getId());
        System.out.println("delete Comment: "+commentVO.getId()+" "+commentVO.getUserId()+" "+commentVO.getRequestId()+" "+commentVO.getCommentUserId() );
    }

    @Override
    public void saveAComment(CommentVO commentVO) {
        Comment comment=new Comment();
        comment.setCommentedTime(new Date());
        comment.setUserId(commentVO.getUserId());
        comment.setContent(commentVO.getContent());
        comment.setCommentId(commentVO.getCommentUserId());
        comment.setRequestId(commentVO.getRequestId());
        commentRepository.save(comment);
        System.out.println("save Comment: "+commentVO.getUserId()+" "+commentVO.getRequestId()+" "+commentVO.getCommentUserId() );
    }

    @Override
    public void updateAComment(CommentVO commentVO) {
        Comment comment=new Comment();
        Comment oldcomment=commentRepository.findById(commentVO.getId()).get();

        comment.setId(commentVO.getId());
        comment.setUserId(oldcomment.getUserId());

        if(String.valueOf(commentVO.getRequestId())==""){
            comment.setRequestId(oldcomment.getRequestId());
        }else{
            comment.setRequestId(commentVO.getRequestId());
        }

        comment.setCommentId(oldcomment.getCommentId());
        comment.setCommentedTime(oldcomment.getCommentedTime());

        if(commentVO.getContent()==""){
            comment.setContent(oldcomment.getContent());
        }else{
            comment.setContent(commentVO.getContent());
        }

        System.out.println("update Comment: "+commentVO.getId()+" "+commentVO.getRequestId()+" "+commentVO.getContent() );
        commentRepository.save(comment);
    }
}
