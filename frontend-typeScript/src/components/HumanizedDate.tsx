import moment from "moment";

const HumanizedDate = ({ date }: {date: string}) => {
  return <>{moment(date).fromNow()}</>;
};

export default HumanizedDate;
