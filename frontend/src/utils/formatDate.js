import moment from "moment/moment";

const formatDate = (value, format) => {
  return moment(String(new Date(value))).locale("En").format(format);
}

export default formatDate;