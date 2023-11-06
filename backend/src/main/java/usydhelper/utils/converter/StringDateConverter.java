package usydhelper.utils.converter;

import usydhelper.utils.exception.HelperException;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;

public class StringDateConverter {

    public static String dateToString(Date date) {
        DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        return dateFormat.format(date);
    }

    public static Date stringToDate(String birthday) {
        try {
            String[] split = birthday.split("/");
            int day = Integer.parseInt(split[0]);
            int month = Integer.parseInt(split[1]);
            int year = Integer.parseInt(split[2]);
            if (day > 0 && day <= 31 &&  month > 0 && month <= 12 && year > 1000 && year < LocalDate.now().getYear()) {
                ;
            } else {
                throw new HelperException("Unknown date format", 30004);
            }
        } catch (Exception e) {
            throw new HelperException("Unknown date format", 30004);
        }

        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        Date date = new Date();
        try {
            date = formatter.parse(birthday);
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(date);
            calendar.add(Calendar.HOUR_OF_DAY, 13);
            date = calendar.getTime();
        } catch (ParseException e) {
            throw new HelperException("Unknown date format", 30004);
        }
        return date;
    }

}
