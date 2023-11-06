package usydhelper.service.impl;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import usydhelper.dao.*;
import usydhelper.entity.dto.*;
import usydhelper.entity.vo.*;
import usydhelper.service.PostService;
import usydhelper.utils.result.R;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.*;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PendingAcceptersRepository pendingAcceptersRepository;
    @Autowired
    private PendingConfirmRepository pendingConfirmRepository;

    @Autowired
    private StateValuesRepository stateValuesRepository;

    @Override
    public List<HomePagePost> getAllPosts(Integer userId) {
        Specification<Post> postSpecification = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            Predicate p1 = cb.equal(root.get("stateId"), 0);
            Predicate p2 = cb.notEqual(root.get("publisherId"), userId);
            predicates.add(cb.and(p1, p2));
            return query.where(predicates.toArray(new Predicate[0])).getRestriction();
        };
        // all the posts related to the user
        List<Post> allPosts = postRepository.findAll(postSpecification);
        List<HomePagePost> list = new ArrayList<>();
        for (Post post : allPosts) {
            HomePagePost homePagePost = postToHomePagePost(post, userId);
            list.add(homePagePost);
        }
        return list;
    }

    @Override
    public List<AdminPostVO> getAllAdminPostVOs() {
        List<AdminPostVO> adminPostVOS = new ArrayList<>();
        List<Post> posts = postRepository.findAll();
        for (Post post : posts) {

            AdminPostVO adminPostVO = new AdminPostVO();

            adminPostVO.setId(post.getId());
            adminPostVO.setPublisherId(post.getPublisherId());
            adminPostVO.setTitle(post.getTitle());
            if(String.valueOf(post.getAccepterId())==""){
                    adminPostVO.setAccepterId(null);
            }else{
                adminPostVO.setAccepterId(post.getAccepterId());
            }

            adminPostVO.setDescription(post.getDescription());
            adminPostVO.setState(stateValuesRepository.findById(post.getStateId()).get().getStateValue());
            adminPostVO.setReward(post.getReward());
            adminPostVO.setLocation(post.getLocation());
            adminPostVO.setCreateTime(post.getCreatedTime());
            adminPostVO.setExpiredTime(post.getExpiredTime());

            adminPostVOS.add(adminPostVO);

        }

        return adminPostVOS;
    }

    private HomePagePost postToHomePagePost(Post post, Integer userId) {
        HomePagePost homePagePost = new HomePagePost();
        // copy title, description and createdTime
        BeanUtils.copyProperties(post, homePagePost);

        // find username based on publisher id
        Integer i = post.getPublisherId();
        Optional<User> optionalUser = userRepository.findById(i);
        if (optionalUser.isPresent()) {
            homePagePost.setPublisher(optionalUser.get().getName());
        } else {
            homePagePost.setPublisher("Anonymous");
        }

        // set isApplied
        Integer postId = post.getId();
        Specification<PendingAccepters> specification = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            Predicate p1 = cb.equal(root.get("postId"), postId);
            Predicate p2 = cb.equal(root.get("userId"), userId);
            predicates.add(cb.and(p1, p2));
            return query.where(predicates.toArray(new Predicate[0])).getRestriction();
        };
        // get all pending accepter of the post
        List<PendingAccepters> allPA = pendingAcceptersRepository.findAll(specification);
        homePagePost.setIsApplied(allPA.size() != 0);
        return homePagePost;
    }

    @Override
    public TasksVO getTasksVOByUserId(Integer userId) {
        Specification<Post> postSpecification = new Specification<Post>() {
            @Override
            public Predicate toPredicate(Root<Post> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                List<Predicate> predicates = new ArrayList<>();
                Predicate p1 = cb.equal(root.get("publisherId"), userId);
                Predicate p2 = cb.equal(root.get("accepterId"), userId);
                predicates.add(cb.or(p1, p2));
                return query.where(predicates.toArray(new Predicate[0])).getRestriction();
            }
        };
        // all the posts related to the user
        List<Post> allPosts = postRepository.findAll(postSpecification);
        TasksVO tasksVO = new TasksVO();

        for (Post post : allPosts) {
            if (States.NEW.getKey().equals(post.getStateId())) {
                NewTaskVo newTaskVo = new NewTaskVo();
                BeanUtils.copyProperties(post, newTaskVo);
                if (post.getMarkerIsVisible() != null && post.getMarkerIsVisible() == 1) {
                  newTaskVo.setMarkerIsVisible(true);
                } else {
                  newTaskVo.setMarkerIsVisible(false);
                }
                tasksVO.getNewTasks().add(newTaskVo);
            } else if (States.ON_GOING.getKey().equals(post.getStateId())) {
                OngoingTaskVo ongoingTaskVo = new OngoingTaskVo();

                BeanUtils.copyProperties(post, ongoingTaskVo);

                // set publisher name
                Integer i = post.getPublisherId();
                Optional<User> optionalUser = userRepository.findById(i);
                if (optionalUser.isPresent()) {
                    ongoingTaskVo.setPublisher(optionalUser.get().getName());
                } else {
                    ongoingTaskVo.setPublisher("Anonymous");
                }

                Specification<PendingConfirm> specification = new Specification<>() {
                    @Override
                    public Predicate toPredicate(Root<PendingConfirm> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                        List<Predicate> predicates = new ArrayList<>();
                        Predicate p1 = cb.equal(root.get("postId"), post.getId());
                        predicates.add(p1);
                        return query.where(predicates.toArray(new Predicate[0])).getRestriction();
                    }
                };
                // find all pending confirms of this post
                List<PendingConfirm> pendingConfirmList = pendingConfirmRepository.findAll(specification);

                // own this post
                if (post.getPublisherId().equals(userId)) {
                    ongoingTaskVo.setIsOwner(true);
                    ongoingTaskVo.setDidSentComplete(false);
                    if (pendingConfirmList.size() == 0) {
                        ongoingTaskVo.setDidReceiveComplete(false);
                    } else {
                        ongoingTaskVo.setDidReceiveComplete(true);
                    }
                }
                // accept someone else post
                else {
                    ongoingTaskVo.setIsOwner(false);
                    ongoingTaskVo.setDidReceiveComplete(false);
                    ongoingTaskVo.setDidSentComplete(false);
                    for (PendingConfirm pendingConfirm : pendingConfirmList) {
                        if (pendingConfirm.getUserId().equals(userId)) {
                            ongoingTaskVo.setDidSentComplete(true);
                            break;
                        }
                    }
                }

                tasksVO.getOngoingTasks().add(ongoingTaskVo);
            } else if (States.COMPLETED.getKey().equals(post.getStateId())) {
                CompleteTaskVo completeTaskVo = new CompleteTaskVo();
                BeanUtils.copyProperties(post, completeTaskVo);

                // set publisher name
                Integer i = post.getPublisherId();
                Optional<User> optionalUser = userRepository.findById(i);
                if (optionalUser.isPresent()) {
                    completeTaskVo.setPublisher(optionalUser.get().getName());
                } else {
                    completeTaskVo.setPublisher("Anonymous");
                }

                completeTaskVo.setIsOwner(post.getPublisherId().equals(userId));

                tasksVO.getCompletedTasks().add(completeTaskVo);
            }
        }

        tasksVO.getOngoingTasks().sort((t1, t2) -> {
            if (t1.getIsOwner()) {
                return -1;
            } else {
                return 1;
            }
        });

        tasksVO.getCompletedTasks().sort((t1, t2) -> {
            if (t1.getIsOwner()) {
                return -1;
            } else {
                return 1;
            }
        });

        return tasksVO;
    }

    @Override
    public R saveNewPost(PostVO postVO) {
        //Get all the fields from the JSON response
        int publisherId = postVO.getPublisherId();
        String title = postVO.getTitle();
        String description = postVO.getDescription();
        String reward = postVO.getReward();
        int state = postVO.getState();
        String location = postVO.getLocation();
        Boolean markerIsVisible = postVO.getMarkerIsVisible();
        Integer postMarkerIsVisible = null;
        if (markerIsVisible) {
          postMarkerIsVisible = 1;
        }else {
          postMarkerIsVisible = 0;
        }
  
      //Create a Post object and save the posted data
        Post postInfo = new Post();
        postInfo.setPublisherId(publisherId);
        postInfo.setTitle(title);
        postInfo.setReward(reward);
        postInfo.setDescription(description);
        postInfo.setStateId(state);
        postInfo.setCreatedTime(new Date());
        postInfo.setLocation(location);
        postInfo.setMarkerIsVisible(postMarkerIsVisible);
        postRepository.save(postInfo);

        return R.ok()
                .data("publisherId", publisherId)
                .data("title", title)
                .data("description", description)
                .data("reward", reward)
                .data("state", state)
                .data("location", location)
                .data("markerIsVisible", markerIsVisible);


    }

    @Override
    public void updateAPost(PostDetailVO postDetailVO) {
        Post post=new Post();
        post.setId(postDetailVO.getId());
        Post oldpost= postRepository.findById(postDetailVO.getId()).get();
        post.setAccepterId(oldpost.getAccepterId());
        post.setPublisherId(oldpost.getPublisherId());
        post.setStateId(oldpost.getStateId());
        post.setLocation(oldpost.getLocation());
        if(postDetailVO.getReward()==""){
            post.setReward(oldpost.getReward());
        }else{
            post.setReward(postDetailVO.getReward());
        }

        if(postDetailVO.getTitle()==""){

            post.setTitle(oldpost.getTitle());
        }else{
            post.setTitle(postDetailVO.getTitle());
        }

        if(postDetailVO.getDescription()==""){
            post.setDescription(oldpost.getDescription());
        }else{
            post.setDescription(postDetailVO.getDescription());
        }

        post.setCreatedTime(oldpost.getCreatedTime());
        post.setExpiredTime(oldpost.getExpiredTime());

        postRepository.save(post);

        System.out.println("update post: "+postDetailVO.getId());
    }

    @Override
    public void deletePostById(Integer postId) {
        postRepository.deleteById(postId);
    }

    public R addPendingAccepter(PendingAcceptersVO pendingAcceptersVO) {
        //Get all the fields from the JSON response
        int postId = pendingAcceptersVO.getPostId();
        int userId = pendingAcceptersVO.getUserId();

        //Create a Post object and save the posted data
        PendingAccepters pendingAcceptersInfo = new PendingAccepters();
        pendingAcceptersInfo.setPostId(postId);
        pendingAcceptersInfo.setUserId(userId);
        pendingAcceptersRepository.save(pendingAcceptersInfo);
        return R.ok().data("success", true);
    }

    @Override
    public PostDetailVO getPostDetailById(Integer postId) {
        Optional<Post> p = postRepository.findById(postId);
        PostDetailVO postDetailVO = new PostDetailVO();
        if (p.isPresent()) {
            Post post = p.get();
            BeanUtils.copyProperties(post, postDetailVO);
            Integer accepterId = post.getAccepterId();
            Integer publisherId = post.getPublisherId();
            
            // set accepter name
            if (accepterId != null) {
                Optional<User> acp = userRepository.findById(accepterId);
                if (acp.isPresent()) {
                    postDetailVO.setAccepter(acp.get().getName());
                } else {
                    postDetailVO.setAccepter("None");
                }
            } else {
                postDetailVO.setAccepter("None");
            }
            // set publisher name
            if (publisherId != null) {
                Optional<User> pub = userRepository.findById(publisherId);
                if (pub.isPresent()) {
                    postDetailVO.setPublisher(pub.get().getName());
                } else {
                    postDetailVO.setPublisher("Anonymous");
                }
            }
            // set task state
            Integer stateId = post.getStateId();
            for (States state : States.values()) {
                if (state.getKey().equals(stateId)) {
                    postDetailVO.setState(state.getMessage());
                }
            }
        }
        return postDetailVO;
    }

    @Override
    public List<AdminPostVO> getPostByKeyword(String keyword) {
        if(!keyword.equals(null)){
            Specification<Post> postSpecification = new Specification<Post>() {
                @Override
                public Predicate toPredicate(Root<Post> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                    List<Predicate> predicates = new ArrayList<>();

                    Predicate p1=  cb.like(root.get("description"), "%"+keyword + "%");
                    Predicate p2=  cb.like(root.get("title"), "%"+keyword + "%");
                    Predicate p= cb.or(p1, p2);
                    if (keyword.matches("[0-9]+")) {
                        Predicate p3 = cb.equal(root.get("id"), Integer.parseInt(keyword));
                        Predicate p4 = cb.equal(root.get("publisherId"), Integer.parseInt(keyword));
                        Predicate p5 = cb.equal(root.get("accepterId"), Integer.parseInt(keyword));
                        p = cb.or(p, p3);
                        p = cb.or(p, p4);
                        p = cb.or(p, p5);
                    }
                    predicates.add(p);
                    return query.where(predicates.toArray(new Predicate[0])).getRestriction();
                }
            };
            List<Post> posts= postRepository.findAll(postSpecification);
            List<AdminPostVO> adminPostVOS =new ArrayList<>();
            for(Post post: posts){
                AdminPostVO adminPostVO=new AdminPostVO();
                BeanUtils.copyProperties(post,adminPostVO);
                adminPostVOS.add(adminPostVO);
            }
            // System.out.println(commentVOS.get(0).getContent());
            return adminPostVOS;
        }else{
            return new ArrayList<>();
        }

    }

    @Override
    public void editTask(NewTaskVo task) {
        Optional<Post> optionalPost = postRepository.findById(task.getId());
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            post.setTitle(task.getTitle());
            post.setReward(task.getReward());
            post.setDescription(task.getDescription());
            post.setLocation(task.getLocation());
            Integer markerIsVisible = null;
            if (task.getMarkerIsVisible()) {
              markerIsVisible = 1;
            } else {
              markerIsVisible = 0;
            }
            post.setMarkerIsVisible(markerIsVisible);
            postRepository.save(post);
        }
    }

}
