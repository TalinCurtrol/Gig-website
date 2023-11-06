package usydhelper.entity.vo;


import lombok.Data;

@Data
public class PostVO {
  private int publisherId;
  private int accepterId;
  private int state;
  private String reward;
  private String title;
  private String description;
  private String createTime;
  private String expiredTime;
  private String location;
  private Boolean markerIsVisible;
  
}
