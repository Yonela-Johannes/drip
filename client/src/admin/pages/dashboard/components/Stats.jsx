const Stats = ({ title, data }) => {
  return (
    <div>
      <div className="w-64 min-h-[100px]">
        <div className="justify-between text-xl font-semibold">
          {title}
        </div>
        <div className="px-3 py-0 text-3xl  font-bold text-amazon-primary ">
          {data}
        </div>
      </div>
    </div>
  );
};

export default Stats;
