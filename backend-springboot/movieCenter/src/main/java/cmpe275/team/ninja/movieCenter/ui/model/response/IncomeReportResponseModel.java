package cmpe275.team.ninja.movieCenter.ui.model.response;

public class IncomeReportResponseModel {
    private String monthName;
    private String key;
    private double value;

    public String getMonthName() {
        return monthName;
    }

    public void setMonthName(String monthName) {
        this.monthName = monthName;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    public void setCustomMonthName(String key){
        String[] s = key.split("/");
        switch (s[0]){
            case "01": setMonthName("January");break;
            case "02": setMonthName("February");break;
            case "03": setMonthName("March");break;
            case "04": setMonthName("April");break;
            case "05": setMonthName("May");break;
            case "06": setMonthName("June");break;
            case "07": setMonthName("July");break;
            case "08": setMonthName("August");break;
            case "09": setMonthName("September");break;
            case "10": setMonthName("October");break;
            case "11": setMonthName("November");break;
            case "12": setMonthName("December");break;
        }
    }
}
