package usydhelper.service;

import usydhelper.entity.vo.ConfirmVo;

public interface ConfirmTaskCompleteService {
    public void savePendingConfirm(ConfirmVo vo);
    public void confirmComplete(ConfirmVo vo);
}
