package usydhelper.entity;

import org.junit.jupiter.api.Test;
import usydhelper.entity.dto.*;

public class DTOTest {

    @Test
    public void test1() {
        Post post1 = new Post();
        Post post2 = new Post();
        boolean equals = post1.equals(post2);
        String s = post1.toString();
        int i = post1.hashCode();
    }

    @Test
    public void test2() {
        Admin admin1 = new Admin();
        Admin admin2 = new Admin();
        boolean equals = admin1.equals(admin2);
        admin1.setAdminName("123");
        admin1.setPassword("qwe");
        admin1.setId(1);
        String s = admin1.toString();
        int i = admin1.hashCode();
    }

    @Test
    public void test3() {
        BlockedUser user1 = new BlockedUser();
        BlockedUser user2 = new BlockedUser();
        boolean equals = user1.equals(user2);
        String s = user1.toString();
        int i = user1.hashCode();
    }

    @Test
    public void test4() {
        Comment comment1 = new Comment();
        Comment comment2 = new Comment();
        boolean equals = comment1.equals(comment2);
        int i = comment2.hashCode();
        String s = comment1.toString();
    }

    @Test
    public void test5() {
        PendingAccepters pa1 = new PendingAccepters();
        PendingAccepters pa2 = new PendingAccepters();
        boolean equals = pa1.equals(pa2);
        String s = pa1.toString();
        int i = pa1.hashCode();
        Integer id = pa1.getId();
        Integer postId = pa1.getPostId();
        Integer userId = pa1.getUserId();
    }

    @Test
    public void test6() {
        PendingConfirm pc1 = new PendingConfirm();
        PendingConfirm pc2 = new PendingConfirm();
        boolean equals = pc1.equals(pc2);
        pc1.setId(1);
        String s = pc1.toString();
        int i = pc1.hashCode();
        Integer postId = pc1.getPostId();
    }
}
