import moment from "moment";

const HumanizedDate = ({ date }) => {
  return <>{moment(date).fromNow()}</>;
};

export default HumanizedDate;
