export const MeasurementCreate = () => {
  return (
    <div className="sectionbg">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Create a Measurement
        </h3>
      </div>
      <div>
        <form action="" className="grid grid-cols-5 gap-4 px-4.5 py-3">
          <input type="text" className="inputclass" placeholder="Size" />
          <input
            type="text"
            className="inputclass"
            placeholder="Chest ( Round )"
          />
          <input type="text" className="inputclass" placeholder="Length" />
          <input type="text" className="inputclass" placeholder="Sleeve" />
          <button className="buttonclass">Add</button>
        </form>
      </div>
    </div>
  );
};
