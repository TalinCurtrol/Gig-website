package usydhelper.controller;

import org.springframework.web.bind.annotation.*;
import usydhelper.entity.vo.TranslationVO;
import usydhelper.utils.result.R;
import usydhelper.utils.translate.doTranslate;

@RestController
@CrossOrigin
public class TranslationController {

    @PostMapping("/dotranslate")
    public R translateSentence(@RequestBody TranslationVO translationVO){

        if(!translationVO.getSentence().equals("")){
            return R.ok().data("translated",doTranslate.getTranslation(translationVO.getSentence(),translationVO.getTargetLanguage()));
        }else{
            return R.ok();
        }

    }
}
