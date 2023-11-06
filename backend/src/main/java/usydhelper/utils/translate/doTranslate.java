package usydhelper.utils.translate;
import com.google.cloud.translate.Translate;
import com.google.cloud.translate.TranslateOptions;
import com.google.cloud.translate.Detection;
import com.google.cloud.translate.Translate.TranslateOption;
import com.google.cloud.translate.Translation;

public class doTranslate {

    private static String apiKey="AIzaSyAjJc1PLFT7aZmDDp3wi613CqnDHwe0--I";

    //language options

    public static String LANGUAGE_ENGLISH="en";
    public static String LANGUAGE_CHINESE="zh";
    public static String LANGUAGE_FRENCH="fr";
    public static String LANGUAGE_JAPANESE="ja";
    public static String LANGUAGE_ITALIAN="it";
    public static String LANGUAGE_PORTUGUESE="pt";
    public static String LANGUAGE_RUSSIAN="ru";
    public static String LANGUAGE_ARABIC="ar";

    public boolean checkIfEnglish(String sentence){
        Translate translate = TranslateOptions.newBuilder().setApiKey(apiKey).build().getService();
        String detectedLanguage = translate.detect(sentence).getLanguage();
        if(detectedLanguage.equals(LANGUAGE_ENGLISH)){
            return true;
        }else{
            return false;
        }
    }

    public static String getTranslation(String sentence, String targetLanguage){
        if(!sentence.equals("")){
            Translate translate = TranslateOptions.newBuilder().setApiKey(apiKey).build().getService();
            String detectedLanguage = translate.detect(sentence).getLanguage();
            Translation translation = translate.translate(
                    sentence,
                    TranslateOption.sourceLanguage(detectedLanguage),
                    TranslateOption.targetLanguage(targetLanguage));

            return translation.getTranslatedText();
        }else{
            return null;
        }

    }
}
